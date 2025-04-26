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

      const { anamnesis, ...consultaData } = payload;
      let idAnamnesis = null;

      if (anamnesis) {
        const numericFields = [
          'talla',
          'pesoActual',
          'pesoHabitual',
          'circunferenciaBrazoRelajado',
          'circunferenciaBrazo',
          'circunferenciaAntebrazo',
          'circunferenciaCintura',
          'circunferenciaCinturaMaxima',
          'circunferenciaPantorrilla',
          'pliegueBiceps',
          'pliegueTriceps',
          'pliegueSubescapular',
          'pliegueSupraespinal',
          'pliegueAbdominal',
          'pliegueMuslo',
          'plieguePantorrilla'
        ];

        const hasInvalidValues = numericFields.some(field => {
          const value = anamnesis[field];
          return isNaN(value) || value < 0 || value > 1000;
        });

        if (hasInvalidValues) {
          throw new Error('Valores antropométricos inválidos');
        }

        const respA = await axios.post(API_ANAMNESIS, {
          ...anamnesis,
          idPaciente: consultaData.idPaciente,
          idUsuario: userId,
        });
        idAnamnesis = respA.data.idAnamnesis;
      }

      const consultaPayload = {
        ...consultaData,
        idUsuario: userId,
        idAnamnesis,
      };

      // 5) POST de consulta
      const respC = await axios.post(API_CONSULTA, consultaPayload);
      return respC.data;

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

//MODIFICAR ANAMNESIS
export const modificarAnamnesis = createAsyncThunk(
  "anamnesis/modificarAnamnesis",
  async ({ idAnamnesis, datosActualizados }, { rejectWithValue, getState }) => {
    console.log("[Thunk modificarAnamnesis] start", { idAnamnesis, datosActualizados });
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      console.log("[Thunk modificarAnamnesis] auth.uid =", auth?.uid);
      if (!userId) throw new Error("Usuario no autenticado");

      const payload = {
        ...datosActualizados,
        idUsuario: userId,
        // Asegurar todos los campos requeridos por el backend
        fecha: new Date(datosActualizados.fecha).toISOString(),
        idPaciente: datosActualizados.idPaciente // Si es necesario
      };

      console.log("[Thunk modificarAnamnesis] payload final =", payload);

      const response = await axios.put(`${API_ANAMNESIS}/${idAnamnesis}`);
      
      console.log("[Thunk modificarAnamnesis] response.data =", response.data);
      return { idAnamnesis, updatedData: response.data };
    } catch (error) {
      console.error("[Thunk modificarAnamnesis] error =", error);
      return rejectWithValue(error.response?.data || error.message);
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

      await axios.delete(`${API_CONSULTA}/${idConsulta}/${userId}`);
      return idConsulta;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


