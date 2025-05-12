import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ALIMENTOS = "https://sintacc-api-deploy.azurewebsites.net/api/Alimentos/soloAlimentos";

export const listarAlimentos = createAsyncThunk(
  "alimentos/listarAlimentos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ALIMENTOS);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener los alimentos");
    }
  }
);

export const obtenerAlimentoPorId = createAsyncThunk ("alimentos/obtenerAlimentoPorId",
    console.log("hola mundp")
)

export const crearAlimento = createAsyncThunk ("alimentos/obtenerId",
    console.log("hola mundp")
)
