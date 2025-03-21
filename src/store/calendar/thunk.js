import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addHours, addMinutes } from "date-fns";

const API_TURNOS = "https://localhost:7041/api/Turnos";
const API_PACIENTES = "https://localhost:7041/api/Pacientes";

// Thunk para listar turnos (incluye datos de paciente embebidos)
export const listarTurnos = createAsyncThunk(
  "turnos/listarTurnos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_TURNOS);
      const turnos = response.data;

      const turnosConPacientes = await Promise.all(
        turnos.map(async (turno) => {
          try {
            const pacienteResponse = await axios.get(`${API_PACIENTES}/${turno.idPaciente}`);
            return {
              ...turno,
              paciente: pacienteResponse.data.persona, // Solo la info de la persona
            };
          } catch (error) {
            console.error(`Error al obtener el paciente ${turno.idPaciente}`, error);
            return {
              ...turno,
              paciente: null, // En caso de error, que igual lo devuelva sin paciente
            };
          }
        })
      );

      return turnosConPacientes;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener los turnos");
    }
  }
);

// Thunk para crear un turno
export const crearTurno = createAsyncThunk(
  "turnos/crearTurno",
  async (nuevoTurno, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      if (!auth || !auth.uid) {
        console.error("Error: El usuario no está autenticado.");
        return rejectWithValue("Error: Usuario no autenticado.");
      }

      const fechaInicio = new Date(nuevoTurno.fechaInicio);
      if (isNaN(fechaInicio)) {
        return rejectWithValue("Fecha de inicio inválida");
      }

      // Aquí se suman 45 minutos a la fecha de inicio
      const fechaFin = addMinutes(fechaInicio, 45);

      const turnoConFechas = {
        ...nuevoTurno,
        fechaFin: fechaFin.toISOString(),
        idUsuario: auth.uid,
        estado: "Pendiente de confirmación",
      };

      const responseTurno = await axios.post(API_TURNOS, turnoConFechas);
      const turnoCreado = responseTurno.data;

      const responsePaciente = await axios.get(`${API_PACIENTES}/${turnoCreado.idPaciente}`);
      const paciente = responsePaciente.data.persona;

      return {
        ...turnoCreado,
        paciente,
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
      console.error("Error al crear el turno:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


export const obtenerTurnoPorId = createAsyncThunk(
  "turnos/obtenerTurnoPorId",
  async (idTurno, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_TURNOS}/${idTurno}`);
      const turno = response.data;

      const pacienteResponse = await axios.get(`${API_PACIENTES}/${turno.idPaciente}`);
      const paciente = pacienteResponse.data.persona;

      return { ...turno, paciente };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener el turno");
    }
  }
);

export const eliminarTurno = createAsyncThunk(
  "turnos/eliminarTurno",
  async ({ idTurno, idUsuario }, { rejectWithValue, getState }) => {
    try {
      const turnoExistente = getState().turnos.turnos.find(t => t.idTurno === idTurno);

      if (!turnoExistente) {
        return rejectWithValue("Turno no encontrado");
      }

      const response = await axios.put(`${API_TURNOS}/${idTurno}`, {
        idTurno,
        estado: "cancelado",
        tipoConsulta: turnoExistente.tipoConsulta,
        fechaInicio: turnoExistente.fechaInicio,
        fechaFin: turnoExistente.fechaFin,
        idPaciente: turnoExistente.idPaciente,
        idUsuario,
      });

      console.log(response.data);  // Esto es lo que deberías imprimir para ver la respuesta de la API
      return response.data;
    } catch (error) {
      console.error("Error en la eliminación del turno:", error);
      return rejectWithValue(error.response?.data || "Error al cancelar el turno");
    }
  }
);

export const modificarTurno = createAsyncThunk(
  "turnos/modificarTurno",
  async ({ idTurno, idUsuario, turnoModificado }, { rejectWithValue, getState }) => {
    try {
      // Buscar el turno existente en el estado
      const turnoExistente = getState().turnos.turnos.find((t) => t.idTurno === idTurno);

      if (!turnoExistente) {
        return rejectWithValue("Turno no encontrado");
      }

      // Hacer la solicitud a la API para modificar el turno
      const response = await axios.put(`${API_TURNOS}/${idTurno}`, {
        idTurno,
        tipoConsulta: turnoModificado.tipoConsulta || turnoExistente.tipoConsulta,
        fechaInicio: turnoModificado.fechaInicio || turnoExistente.fechaInicio,
        fechaFin: turnoModificado.fechaFin || turnoExistente.fechaFin,
        idPaciente: turnoModificado.idPaciente || turnoExistente.idPaciente,
        idUsuario,
        estado: turnoModificado.estado || turnoExistente.estado,
      });

      console.log(response.data);  // Para depuración

      // Retornar el turno actualizado desde la respuesta de la API
      return response.data;
    } catch (error) {
      console.error("Error al modificar el turno:", error);
      return rejectWithValue(error.response?.data || "Error al modificar el turno");
    }
  }
);


export const cambiarEstadoTurno = createAsyncThunk(
  "turnos/cambiarEstadoTurno",
  async ({ idTurno, nuevoEstado, idUsuario }, { rejectWithValue, getState }) => {
    try {
      const turnoExistente = getState().turnos.turnos.find((t) => t.idTurno === idTurno);
      if (!turnoExistente) {
        return rejectWithValue("Turno no encontrado");
      }
      const response = await axios.put(`${API_TURNOS}/${idTurno}`, {
        idTurno,
        tipoConsulta: turnoExistente.tipoConsulta,
        fechaInicio: turnoExistente.fechaInicio,
        fechaFin: turnoExistente.fechaFin,
        idPaciente: turnoExistente.idPaciente,
        idUsuario,
        estado: nuevoEstado, 
      });
      return response.data;
    } catch (error) {
      console.error("Error al cambiar el estado del turno:", error);
      return rejectWithValue(error.response?.data || "Error al actualizar el estado del turno");
    }
  }
);