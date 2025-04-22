//THUNK DE PLANES ALIMENTICIOS

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_PLAN = "https://localhost:7041/api/PlanAlimenticios";
const API_PACIENTES ="https://localhost:7041/api/Pacientes";
const API_ALIMENTOS = "https://localhost:7041/api/Alimentos";

export const crearPlanAlimenticio = createAsyncThunk(
  "planes/crearPlanAlimenticio",
  async (planData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const idUsuario = auth?.uid;

      if (!idUsuario || !planData.idPaciente) {
        return rejectWithValue("Datos incompletos");
      }

      const payload = {
        ...planData,
        idUsuario: idUsuario,
        idPaciente: planData.idPaciente, 
        alimentos: planData.alimentos.map(alimento => ({
          alimentoId: alimento.alimentoId,
          gramos: alimento.gramos
        }))
      };

      const response = await axios.post(API_PLAN, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const obtenerPlanesPorNutricionista = createAsyncThunk(
  "planes/obtenerPlanesPorNutricionista",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const idUsuario = auth?.uid;
      
      if (!idUsuario) {
        return rejectWithValue("Usuario no autenticado");
      }

      const response = await axios.get(`${API_PLAN}/${idUsuario}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



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





export const obtenerAlimentos = createAsyncThunk(
  "plan/getAlimentos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ALIMENTOS);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);