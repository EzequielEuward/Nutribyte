//THUNK DE PACIENTE

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_PACIENTE = "https://sintacc-api-deploy.azurewebsites.net/api/Pacientes";

export const crearPaciente = createAsyncThunk(
  "pacientes/crear",
  async (datosPaciente, { getState, dispatch, rejectWithValue }) => {
    try {


      if (!datosPaciente.fechaNacimiento) {
        throw new Error("La fecha de nacimiento está vacía o es inválida");
      }

      const fechaNacimiento = new Date(datosPaciente.fechaNacimiento);

      if (isNaN(fechaNacimiento.getTime())) {
        throw new Error("Fecha de nacimiento inválida");
      }

      const { auth } = getState();
      const userId = auth.uid;
      if (!userId) {
        throw new Error("No se encontró el usuario autenticado");
      }

      const paciente = {
        historiaClinica: datosPaciente.historialClinico,
        idUsuario: userId,
        estadoPaciente: datosPaciente.estadoPaciente,
        persona: {
          dni: Number(datosPaciente.dni),
          apellido: datosPaciente.apellido,
          nombre: datosPaciente.nombre,
          fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
          sexoBiologico: datosPaciente.sexo,
          email: datosPaciente.email,
          telefono: datosPaciente.telefono,
        },
      };


      // URL corregida: se usa /api/Paciente/{userId}
      const response = await axios.post(
        `${API_PACIENTE}/${userId}`,
        paciente,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error al crear paciente:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//LISTAR PACIENTE TODOS
export const listarPacientes = createAsyncThunk(
  "pacientes/listar",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.uid;

      if (!userId) {
        throw new Error("No se encontró el usuario logueado.");
      }

      // Se arma la URL con el id del usuario
      const response = await axios.get(`${API_PACIENTE}/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error al listar pacientes:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const actualizarPaciente = createAsyncThunk(
  "pacientes/actualizar",
  async (datosPaciente, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.uid;
      if (!userId) throw new Error("Usuario no autenticado");

      const payload = {
        idPaciente: datosPaciente.idPaciente,
        historiaClinica: datosPaciente.historiaClinica,
        estadoPaciente: datosPaciente.estadoPaciente,
        idUsuario: userId,
        activo: datosPaciente.activo ?? true,
        idPersona: datosPaciente.persona.idPersona,
        persona: {
          idPersona: datosPaciente.persona.idPersona,
          dni: Number(datosPaciente.persona.dni),
          apellido: datosPaciente.persona.apellido,
          nombre: datosPaciente.persona.nombre,
          fechaNacimiento: datosPaciente.persona.fechaNacimiento,
          sexoBiologico: datosPaciente.persona.sexoBiologico,
          email: datosPaciente.persona.email,
          telefono: datosPaciente.persona.telefono,
        }
      };

      const response = await axios.put(
        `${API_PACIENTE}/${userId}/${datosPaciente.idPaciente}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Si la respuesta está vacía, retornamos el payload actualizado
      if (!response.data || Object.keys(response.data).length === 0) {
        return payload;
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//LISTAR PACIENTE POR "ID"
export const obtenerPacientePorId = createAsyncThunk(
  "pacientes/obtenerPorId",
  async (idPaciente, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.uid;

      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const response = await axios.get(`${API_PACIENTE}/${userId}/${idPaciente}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener paciente:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// ELIMINAR (CAMBIAR ESTADO DE ACTIVO A FALSO)
export const desactivarPaciente = createAsyncThunk(
  "patients/desactivarPaciente",
  async ({ idPaciente }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.uid;
      if (!userId) {
        throw new Error("No se encontró el usuario autenticado.");
      }

      const url = `${API_PACIENTE}/${userId}/${idPaciente}`;

      const response = await axios.delete(url, {
        data: { activo: false },
      });

      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Error al desactivar el paciente");
      }

      return response.data;
    } catch (error) {
      console.error(
        "Error al desactivar paciente:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Error al desactivar el paciente"
      );
    }
  }
);
