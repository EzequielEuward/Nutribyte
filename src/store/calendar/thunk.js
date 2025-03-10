import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addHours } from "date-fns";

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

      // Verificar si uid está definido antes de continuar
      if (!auth || !auth.uid) {
        console.error("Error: El usuario no está autenticado.");
        return rejectWithValue("Error: Usuario no autenticado.");
      }

      const fechaInicio = new Date(nuevoTurno.fechaInicio);
      if (isNaN(fechaInicio)) {
        return rejectWithValue("Fecha de inicio inválida");
      }

      const fechaFin = addHours(fechaInicio, 1);

      const turnoConFechas = {
        ...nuevoTurno,
        fechaFin: fechaFin.toISOString(),
        idUsuario: auth.uid, // Se asegura que uid esté presente
        estado: "Pendiente de confirmación",
      };

      const responseTurno = await axios.post(API_TURNOS, turnoConFechas);
      const turnoCreado = responseTurno.data;

      // Traer el paciente correspondiente al idPaciente
      const responsePaciente = await axios.get(`${API_PACIENTES}/${turnoCreado.idPaciente}`);
      const paciente = responsePaciente.data.persona;

      return {
        ...turnoCreado,
        paciente, // Embebemos directamente el paciente dentro del turno creado
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
      console.error("Error al crear el turno:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
