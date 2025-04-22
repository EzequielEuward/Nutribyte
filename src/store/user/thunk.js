import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_USUARIO = "https://localhost:7041/api/Usuarios";

// Thunk para obtener todos los usuarios
export const ListarUsuarios = createAsyncThunk(
  'user/ListarUsuarios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_USUARIO);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para obtener un usuario por id
export const ListarUsuariosPorId = createAsyncThunk(
  'user/ListarUsuariosPorId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_USUARIO}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para crear un usuario
export const CrearUsuario = createAsyncThunk(
  'user/CrearUsuario',
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Datos enviados al backend:", userData);

      const payload = {
        ...userData,
        estadoUsuario: userData.estadoUsuario || 'Activo',
      };

      const response = await axios.post(API_USUARIO, payload);

      console.log("Respuesta exitosa del backend:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error en la respuesta del servidor:", {
          status: error.response.status,
          data: error.response.data
        });
        return rejectWithValue({
          message: error.response.data.message || 'Error creando usuario',
          status: error.response.status
        });
      } else if (error.request) {
        console.error("Error de conexión:", error.request);
        return rejectWithValue({
          message: 'No se recibió respuesta del servidor'
        });
      } else {
        console.error("Error en configuración de la solicitud:", error.message);
        return rejectWithValue({
          message: `Error de configuración: ${error.message}`
        });
      }
    }
  }
);

export const ModificarUsuario = createAsyncThunk(
  'user/ModificarUsuario',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      console.log('Enviando datos de modificación:', userData);

      const response = await axios.put(`${API_USUARIO}/${userId}`, {
        ...userData,
        estadoUsuario: userData.estadoUsuario || 'Activo'
      });

      console.log('Respuesta exitosa:', response.data);
      return response.data;

    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta:', error.response.data);
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message || 'Error modificando usuario'
        });
      } else if (error.request) {
        console.error('Error de conexión:', error.request);
        return rejectWithValue({ message: 'Error de conexión con el servidor' });
      } else {
        console.error('Error general:', error.message);
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const ToggleUserStatus = createAsyncThunk(
  'user/ToggleUserStatus',
  async (user, { rejectWithValue }) => {
    try {
      // Construir el payload completo de usuario, igual que en ModificarUsuario,
      // pero sin incluir el objeto 'persona'. Se deja solo el idPersona.
      const updatedUserData = {
        idUsuario: user.idUsuario,  // Debe coincidir con el ID en la URL
        rol: user.rol,
        username: user.username,
        userPassword: user.userPassword,
        matricula_Profesional: user.matricula_Profesional,
        especialidad: user.especialidad,
        planUsuario: user.planUsuario,
        fotoUsuario: user.fotoUsuario,
        activo: !user.activo,
        idPersona: user.persona ? user.persona.idPersona : user.idPersona,
        persona: user.persona
      };

      const response = await axios.put(`${API_USUARIO}/${user.idUsuario}`, updatedUserData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta:', error.response.data);
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message || 'Error cambiando estado del usuario'
        });
      } else if (error.request) {
        console.error('Error de conexión:', error.request);
        return rejectWithValue({ message: 'Error de conexión con el servidor' });
      } else {
        console.error('Error general:', error.message);
        return rejectWithValue({ message: error.message });
      }
    }
  }
);



export const EliminarUsuario = createAsyncThunk(
  'user/EliminarUsuario',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_USUARIO}/${userId}`);
      return { idUsuario: userId };
    } catch (error) {
      if (error.response) {
        console.error("Error en la respuesta:", error.response.data);
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message || 'Error eliminando usuario'
        });
      } else if (error.request) {
        console.error("Error de conexión:", error.request);
        return rejectWithValue({ message: 'Error de conexión con el servidor' });
      } else {
        console.error("Error general:", error.message);
        return rejectWithValue({ message: error.message });
      }
    }
  }
);