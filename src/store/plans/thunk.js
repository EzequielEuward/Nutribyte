//THUNK DE PLANES ALIMENTICIOS

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_PLAN = "https://sintacc-api-deploy.azurewebsites.net/api/PlanAlimenticios";
const API_PACIENTES ="https://sintacc-api-deploy.azurewebsites.net/api/Pacientes";
const API_ALIMENTOS = "https://sintacc-api-deploy.azurewebsites.net/api/Alimentos";

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


export const editarPlanAlimenticio = createAsyncThunk(
  "planes/editarPlanAlimenticio",
  async ({ idPlan, planData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const idUsuario = auth?.uid;

      if (!idUsuario || !idPlan || !planData) {
        return rejectWithValue("Datos incompletos para la edición");
      }

      const payload = {
        idPlanAlimento: idPlan,
        tipoPlan: planData.tipoPlan,
        fechaInicio: planData.fechaInicio,
        fechaFin: planData.fechaFin,
        observaciones: planData.observaciones,
        idPaciente: planData.idPaciente,
        idUsuario: idUsuario,
        alimentos: planData.alimentos.map(a => ({
          alimentoId: a.idAlimento || a.alimentoId,
          gramos: a.gramos
        }))
      };
      const response = await axios.put(`${API_PLAN}/${idUsuario}/${idPlan}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const eliminarPlanAlimenticio = createAsyncThunk(
  "planes/eliminarPlanAlimenticio",
  async (idPlan, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_PLAN}/${idPlan}`);
      return idPlan; // Asegurate de devolver el ID simple
    } catch (error) {
      const mensaje =
        typeof error.response?.data === 'string'
          ? error.response.data
          : error.response?.data?.title || "Error al eliminar el plan";
      return rejectWithValue(mensaje);
    }
  }
);

export const obtenerUltimoPlanPorPaciente = createAsyncThunk(
  "planes/obtenerUltimoPlanPorPaciente",
  async ({ idPaciente }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const idUsuario = auth?.uid;

      if (!idUsuario) return rejectWithValue("Usuario no autenticado");

      const response = await axios.get(`${API_PLAN}/${idUsuario}`);
      const todosLosPlanes = response.data;

      // Filtramos por paciente
      const planesPaciente = todosLosPlanes.filter(p => p.idPaciente === idPaciente);

      if (planesPaciente.length === 0) return null;

      const ultimoPlan = planesPaciente.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio))[0];

      return ultimoPlan;

    } catch (error) {
      return rejectWithValue(
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.title || error.message
      );
    }
  }
);