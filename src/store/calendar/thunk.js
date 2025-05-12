//THUNK DE TURNOS
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addHours, addMinutes } from "date-fns";

const API_TURNOS = "https://localhost:7041/api/Turnos";
const API_PACIENTES = "https://localhost:7041/api/Pacientes";

// Thunk para listar turnos (incluye datos de paciente embebidos)
export const listarTurnos = createAsyncThunk(
  "turnos/listarTurnos",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth?.uid) return rejectWithValue("Usuario no autenticado");

      const response = await axios.get(`${API_TURNOS}/Usuario/${auth.uid}`);

      // Optimizar la obtención de pacientes
      const turnosConPacientes = await Promise.all(
        response.data.map(async (turno) => ({
          ...turno,
          paciente: turno.paciente || await obtenerPaciente(turno.idPaciente)
        }))
      );

      return turnosConPacientes;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener los turnos");
    }
  }
);

// Función helper para obtener paciente
const obtenerPaciente = async (idPaciente) => {
  try {
    const response = await axios.get(`${API_PACIENTES}/${idPaciente}`);
    return response.data.persona;
  } catch (error) {
    console.error(`Error obteniendo paciente ${idPaciente}`, error);
    return null;
  }
};

// Thunk para crear un turno
export const crearTurno = createAsyncThunk(
  "turnos/crearTurno",
  async (nuevoTurno, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth?.uid) {
        console.warn("Usuario no autenticado");
        return rejectWithValue("Usuario no autenticado");
      }

      // Validación de campos requeridos
      if (!nuevoTurno.tipoConsulta || !nuevoTurno.fechaInicio || !nuevoTurno.idPaciente) {
        console.warn("Faltan campos obligatorios", nuevoTurno);
        return rejectWithValue("Faltan campos obligatorios");
      }

      const fechaInicio = new Date(nuevoTurno.fechaInicio);
      if (isNaN(fechaInicio)) {
        console.warn("Fecha de inicio inválida:", nuevoTurno.fechaInicio);
        return rejectWithValue("Fecha de inicio inválida");
      }

      const payload = {
        tipoConsulta: nuevoTurno.tipoConsulta,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: addMinutes(fechaInicio, 45).toISOString(),
        motivo: nuevoTurno.motivo?.trim() || "Consulta general",
        asistencia: false,
        idPaciente: Number(nuevoTurno.idPaciente),
        idUsuario: auth.uid,
        estado: "Pendiente de confirmación"
      };

      console.log("📤 Enviando turno:", payload);

      const response = await axios.post(
        `${API_TURNOS}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("✅ Turno creado:", response.data);

      return response.data;

    } catch (error) {
      const errorData = error.response?.data || {};
      console.error("❌ Error al crear turno:", errorData, error.message);
      return rejectWithValue(
        errorData.errors?.Title?.[0] ||
        errorData.title ||
        error.message
      );
    }
  }
);


export const obtenerTurnoPorId = createAsyncThunk(
  "turnos/obtenerTurnoPorId",
  async ({ idTurno, idUsuario }, { rejectWithValue }) => { // Recibir ambos IDs
    try {
      const response = await axios.get(`${API_TURNOS}/${idUsuario}/${idTurno}`); // Endpoint actualizado
      const turno = response.data;

      // Si la API ya incluye los datos del paciente, no necesitas esta petición
      if (!turno.paciente) {
        const pacienteResponse = await axios.get(`${API_PACIENTES}/${turno.idPaciente}`);
        turno.paciente = pacienteResponse.data.persona;
      }

      return turno;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener el turno");
    }
  }
);

//ELIMINAR TURNO
export const eliminarTurno = createAsyncThunk(
  "turnos/eliminarTurno",
  async ({ idTurno }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth?.uid) return rejectWithValue("Usuario no autenticado");

      const turnoExistente = getState().turnos.turnos.find(t => t.idTurno === idTurno);
      if (!turnoExistente) return rejectWithValue("Turno no encontrado");

      // Payload con los campos mínimos para actualizar el estado
      const payload = {
        ...turnoExistente,
        estado: "cancelado",
        motivo: turnoExistente.motivo || "Cancelado por el usuario"
      };


      const response = await axios.put(`${API_TURNOS}/${auth.uid}/${idTurno}`, payload);

      // Si la respuesta no incluye el idTurno o la entidad completa, aseguramos devolverlo
      if (!response.data || !response.data.idTurno) {
        return { ...turnoExistente, estado: "cancelado" };
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al cancelar el turno");
    }
  }
);



export const modificarTurno = createAsyncThunk(
  "turnos/modificarTurno",
  async ({ idTurno, turnoModificado }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth?.uid) return rejectWithValue("Usuario no autenticado");

      const turnoExistente = getState().turnos.turnos.find(t => t.idTurno === idTurno);
      if (!turnoExistente) return rejectWithValue("Turno no encontrado");

      const payload = {
        ...turnoExistente,
        ...turnoModificado,
        idUsuario: auth.uid
      };

      const response = await axios.put(`${API_TURNOS}/${auth.uid}/${idTurno}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al modificar el turno");
    }
  }
);

export const cambiarEstadoTurno = createAsyncThunk(
  "turnos/cambiarEstadoTurno",
  async ({ idTurno, nuevoEstado }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth?.uid) return rejectWithValue("Usuario no autenticado");

      const turnoExistente = getState().turnos.turnos.find(t => t.idTurno === idTurno);
      if (!turnoExistente) return rejectWithValue("Turno no encontrado");

      const response = await axios.put(`${API_TURNOS}/${auth.uid}/${idTurno}`, {
        ...turnoExistente,
        estado: nuevoEstado
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al actualizar el estado");
    }
  }
);