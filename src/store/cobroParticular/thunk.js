import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const API_COBROPARTICULAR = 'https://sintacc-api-deploy.azurewebsites.net/api/CobroPaciente';
export const API_PACIENTES = 'https://sintacc-api-deploy.azurewebsites.net/api/Pacientes';

export const obtenerCobrosPorUsuario = createAsyncThunk(
  'cobroParticular/obtenerCobrosPorUsuario',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const idUsuario = auth?.uid;

      if (!idUsuario) {
        return rejectWithValue('Usuario no autenticado');
      }

      const response = await axios.get(`${API_COBROPARTICULAR}/usuario/${idUsuario}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const crearCobroParticular = createAsyncThunk(
  'cobroParticular/crearCobroParticular',
  async (nuevoCobro, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_COBROPARTICULAR}`,
        nuevoCobro,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error al crear cobro:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const obtenerPacientesPorUsuario = createAsyncThunk(
  'patients/obtenerPacientesPorUsuario',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const idUsuario = auth?.uid;
      if (!idUsuario) return rejectWithValue('Usuario no autenticado');

      const response = await axios.get(`${API_PACIENTES}/${idUsuario}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const eliminarCobroParticular = createAsyncThunk(
  'cobroParticular/eliminarCobroParticular',
  async (idCobro, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_COBROPARTICULAR}/${idCobro}`);
      return idCobro;
    } catch (error) {
      console.error("❌ Error al eliminar cobro:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);