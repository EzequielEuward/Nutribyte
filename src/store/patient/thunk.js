import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const crearPaciente = createAsyncThunk(
  "pacientes/crear",
  async (datosPaciente, { dispatch, rejectWithValue }) => {
    try {
      console.log("Datos recibidos en el thunk:", datosPaciente);

      if (!datosPaciente.fechaNacimiento) {
        throw new Error("La fecha de nacimiento está vacía o es inválida");
      }

      const fechaNacimiento = new Date(datosPaciente.fechaNacimiento);

      if (isNaN(fechaNacimiento.getTime())) {
        throw new Error("Fecha de nacimiento inválida");
      }

      const paciente = {
        historiaClinica: datosPaciente.historialClinico,
        persona: {
          dni: Number(datosPaciente.dni),
          apellido: datosPaciente.apellido,
          nombre: datosPaciente.nombre,
          fechaNacimiento: fechaNacimiento.toISOString().split('T')[0], // Formato YYYY-MM-DD
          sexoBiologico: datosPaciente.sexo,
          email: datosPaciente.email,
          telefono: datosPaciente.telefono,
        }
      };

      console.log("Paciente a enviar:", JSON.stringify(paciente, null, 2));

      const response = await axios.post("https://localhost:7041/api/Pacientes", paciente, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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