import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const crearPaciente = createAsyncThunk(
  "pacientes/crear",
  async (datosPaciente, { dispatch, rejectWithValue }) => {
    try {
      const paciente = {
        historiaClinica: datosPaciente.historialClinico, // Cambié a minúscula para que coincida con la API
        persona: { // Cambié a minúscula
          dni: Number(datosPaciente.dni),
          apellido: datosPaciente.apellido,
          nombre: datosPaciente.nombre,
          fechaNacimiento: datosPaciente.fechaNacimiento || "2025-02-20", // Intenta usar la fecha que ingrese el usuario
          sexoBiologico: datosPaciente.sexo,
          email: datosPaciente.email,
          telefono: datosPaciente.telefono,
        }
      };

      console.log("Enviando datos:", paciente);

      const response = await axios.post("https://localhost:7041/api/Pacientes", paciente, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta de la API:", response);
      return response.data;

    } catch (error) {
      console.error("Error al crear paciente:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//LISTAR PACIENTE TODOS
export const listarPacientes = createAsyncThunk(
  "pacientes/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://localhost:7041/api/Pacientes");
      console.log(response.data)

      return response.data; // Retornamos la lista de pacientes que devuelve la API
    } catch (error) {
      console.error("Error al listar pacientes:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//LISTAR PACIENTE POR "ID"
export const obtenerPacientePorId = createAsyncThunk(
  "pacientes/obtenerPorId",
  async (idPaciente, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://localhost:7041/api/Pacientes/${idPaciente}`);
      return response.data; // Devuelve los datos del paciente específico
    } catch (error) {
      console.error("Error al obtener paciente:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ELIMINAR (PERO CAMBIA EL ESTADO DE ACTIVO A INACTIVO)
export const desactivarPaciente = createAsyncThunk(
  "patients/desactivarPaciente",
  async (idPaciente, { rejectWithValue }) => {
    try {
      // Cambia a PUT o DELETE según lo que el servidor espere
      const response = await axios.delete(`https://localhost:7041/api/Pacientes/${idPaciente}`, {
        activo: false, // Envía el campo que se debe actualizar
      });

      if (response.status !== 200) {
        throw new Error("Error al desactivar el paciente");
      }

      // Retorna el paciente actualizado
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al desactivar el paciente");
    }
  }
);