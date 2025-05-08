import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_CONSUMO = "https://localhost:7041/api/Consumo";
const API_PACIENTES ="https://localhost:7041/api/Pacientes";


//Buscar paciente por dni pero de consumo
export const buscarPacientePorDni = createAsyncThunk(
  "planes/buscarPacientePorDni",
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


// GET todos los consumos del usuario
export const listarConsumosPorUsuario = createAsyncThunk(
  "consumo/listarConsumos",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error("Usuario no autenticado");

      const { data } = await axios.get(`${API_CONSUMO}/Usuario/${userId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// GET por paciente
export const listarConsumosPorPaciente = createAsyncThunk(
  'consumo/listarPorPaciente',
  async (idPaciente, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error('Usuario no autenticado');

      const { data } = await axios.get(`${API_CONSUMO}/Paciente/${userId}/${idPaciente}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET por ID de consumo
export const obtenerConsumoPorId = createAsyncThunk(
  'consumo/obtenerPorId',
  async (idConsumo, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error('Usuario no autenticado');

      const { data } = await axios.get(`${API_CONSUMO}/${userId}/${idConsumo}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST - Crear consumo
export const crearConsumo = createAsyncThunk(
  'consumo/crear',
  async (consumo, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error('Usuario no autenticado');

      const { data } = await axios.post(`${API_CONSUMO}/${userId}`, consumo);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PUT - Editar consumo
export const editarConsumo = createAsyncThunk(
  'consumo/editar',
  async ({ idConsumo, consumo }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error('Usuario no autenticado');

      const { data } = await axios.put(`${API_CONSUMO}/${userId}/${idConsumo}`, consumo);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE - Eliminar consumo
export const eliminarConsumo = createAsyncThunk(
  'consumo/eliminar',
  async (idConsumo, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth?.uid;
      if (!userId) throw new Error('Usuario no autenticado');

      await axios.delete(`${API_CONSUMO}/${userId}/${idConsumo}`);
      return idConsumo;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
