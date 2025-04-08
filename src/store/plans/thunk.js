//THUNK DE PLANES ALIMENTICIOS

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_PLANES = "https://localhost:7041/api/PlanesAlimenticios";
const API_PACIENTE_BY_DNI = "https://localhost:7041/api/Pacientes/dni";
const API_ALIMENTOS = "https://localhost:7041/api/Alimentos";

export const crearPlanAlimenticio = createAsyncThunk(
  "planes/crearPlanAlimenticio",
  async (planData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_PLANES, planData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el plan alimenticio:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const buscarPacientePorDni = createAsyncThunk(
  "planes/buscarPacientePorDni",
  async (dni, { rejectWithValue }) => {
    try {
      console.log("🔍 Buscando paciente con DNI:", dni);
      const response = await axios.get(`${API_PACIENTE_BY_DNI}/${dni}`);
      console.log("✅ Respuesta del backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al buscar paciente por DNI:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
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