import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_CONSULTA = "https://localhost:7041/api/Consulta";
const API_PACIENTES = "https://localhost:7041/api/Pacientes";
const API_ANAMNESIS = "https://localhost:7041/api/Anamnesis";


export const listarConsulta = createAsyncThunk(
  "consulta/listarConsulta",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) {
        return rejectWithValue("No se encontró el usuario autenticado");
      }
      const response = await axios.get(
        `${API_CONSULTA}/Usuario/${userId}`
      );
      if (!response.data) {
        throw new Error("No hay consultas para este usuario");
      }
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Error desconocido al obtener consultas";
      return rejectWithValue(message);
    }
  }
);

export const listarPacientesPorNutricionista = createAsyncThunk(
  "pacientes/listarPorNutricionista",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth?.uid) return rejectWithValue("Usuario no autenticado");

      const response = await axios.get(`${API_PACIENTES}/${auth.uid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const buscarPacientePorDni = createAsyncThunk(
  "consulta/buscarPacientePorDni",
  async (dni, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth?.uid) return rejectWithValue("Usuario no autenticado");

      const response = await axios.get(`${API_PACIENTES}/${auth.uid}/dni/${dni}`);

      if (!response.data) {
        throw new Error("Paciente no encontrado");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const crearConsulta = createAsyncThunk(
  "consulta/crearConsulta",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error("Usuario no autenticado");

      const payloadFinal = {
        ...payload,
        idUsuario: userId,
      };

      const resp = await axios.post(`${API_CONSULTA}`, payloadFinal);
      return resp.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//Modificar
export const modificarConsulta = createAsyncThunk(
  "consulta/modificarConsulta",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;

      if (!userId) {
        return rejectWithValue("Usuario no autenticado");
      }

      if (!payload.idConsulta) {
        throw new Error("Se requiere el ID de la consulta para modificarla");
      }

      const response = await axios.put(
        `${API_CONSULTA}/${payload.idConsulta}`,
        payload
      );

      return response.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const modificarAnamnesis = createAsyncThunk(
  "anamnesis/modificarAnamnesis",
  async ({ idAnamnesis, datosActualizados }, { rejectWithValue }) => {
    try {
      const payload = {
        idAnamnesis,
        fecha: new Date(datosActualizados.fecha).toISOString(),
        talla: datosActualizados.talla,
        pesoActual: datosActualizados.pesoActual,
        pesoHabitual: datosActualizados.pesoHabitual,
        circunferenciaBrazoRelajado: datosActualizados.circunferenciaBrazoRelajado,
        circunferenciaBrazo: datosActualizados.circunferenciaBrazo,
        circunferenciaAntebrazo: datosActualizados.circunferenciaAntebrazo,
        circunferenciaCintura: datosActualizados.circunferenciaCintura,
        circunferenciaCinturaMaxima: datosActualizados.circunferenciaCinturaMaxima,
        circunferenciaPantorrilla: datosActualizados.circunferenciaPantorrilla,
        pliegueBiceps: datosActualizados.pliegueBiceps,
        pliegueTriceps: datosActualizados.pliegueTriceps,
        pliegueSubescapular: datosActualizados.pliegueSubescapular,
        pliegueSupraespinal: datosActualizados.pliegueSupraespinal,
        pliegueAbdominal: datosActualizados.pliegueAbdominal,
        pliegueMuslo: datosActualizados.pliegueMuslo,
        plieguePantorrilla: datosActualizados.plieguePantorrilla
      };
      console.log("[PAYLOAD enviado al PUT Anamnesis]:", payload);
      const response = await axios.put(`${API_ANAMNESIS}/${idAnamnesis}`, payload);

      return response.data;
    } catch (error) {
      console.error("[ERROR PUT Anamnesis]:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


//obtener por id anamnesis
export const obtenerPorIdAnamnesis = createAsyncThunk(
  "anamnesis/obtenerPorIdAnamnesis",
  async (idAnamnesis, { rejectWithValue }) => {
    console.log("[7] Thunk obtenerPorIdAnamnesis - ID recibido:", idAnamnesis);
    try {

      const response = await axios.get(`${API_ANAMNESIS}/${idAnamnesis}`);
      console.log("[8] Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//ELIMINAR
export const eliminarConsulta = createAsyncThunk(
  "consulta/eliminarConsulta",
  async (idConsulta, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error("Usuario no autenticado");

      await axios.delete(`${API_CONSULTA}/${userId}/${idConsulta}`);
      return idConsulta;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const listarAnamnesisPorPaciente = createAsyncThunk(
  "anamnesis/listarPorPaciente",
  async (idPaciente, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;

      if (!userId) {
        throw new Error("Usuario no autenticado");
      }

      const { data } = await axios.get(`${API_ANAMNESIS}/${userId}/${idPaciente}`);

      return data; // YA ES ARRAY ✅
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk para obtener datos calculados de una anamnesis por consulta
export const obtenerAnamnesisCalculadaPorConsulta = createAsyncThunk(
  'consulta/obtenerAnamnesisCalculadaPorConsulta',
  async (idConsulta, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;

      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const url = `https://localhost:7041/api/Anamnesis/Calculado/${userId}/${idConsulta}`;
      const { data } = await axios.get(url);

      return data;
    } catch (err) {
      console.error('❌ [THUNK] Error al obtener anamnesis calculada:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const eliminarAnamnesis = createAsyncThunk(
  "anamnesis/eliminarAnamnesis",
  async (idAnamnesis, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_ANAMNESIS}/${idAnamnesis}`);
      return idAnamnesis;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);