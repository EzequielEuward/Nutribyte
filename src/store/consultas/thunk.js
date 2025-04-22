import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_CONSULTA = "https://localhost:7041/api/Consulta";
const API_PACIENTES = "https://localhost:7041/api/Pacientes";
const API_ANAMNESIS = "https://localhost:7041/api/Pacientes";


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
        console.log("⚡ API Consultas:", response.data);
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
            console.log("Respuesta API:", response.data);
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
      
      const response = await axios.post(API_CONSULTA, {
        ...payload,
        idUsuario: userId,
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);