import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_USUARIO = "https://localhost:7041/api/Usuarios";

// Thunk para obtener todos los usuarios
export const ListarUsuarios = createAsyncThunk(
    'user/ListarUsuarios',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_USUARIO);
            return response.data; // Se espera un array de usuarios
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

export const CrearUsuario = createAsyncThunk(
    'user/CrearUsuario',
    async (userData, { rejectWithValue }) => {
        try {
            console.log("Datos enviados al backend:", JSON.stringify(userData));

            const response = await fetch(API_USUARIO, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en la respuesta del backend:", errorData);
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            console.log("Respuesta exitosa del backend:", data);
            return data;
        } catch (error) {
            console.error("Error en el thunk CrearUsuario:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const ModificarUsuario = createAsyncThunk(
    'user/ModificarUsuario',
    async ({ userId, userData }, { rejectWithValue }) => {
      try {
        console.log('Modificando usuario con ID:', userId);  // Agregado para depuración
        console.log('Datos a actualizar:', userData);        // Agregado para depuración
  
        const response = await fetch(`${API_USUARIO}/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error al modificar el usuario:', errorData);  // Agregado para depuración
          return rejectWithValue(errorData);
        }
  
        const updatedUser = await response.json();
        console.log('Usuario modificado con éxito:', updatedUser);  // Agregado para depuración
        return updatedUser;
      } catch (error) {
        console.error('Error al enviar la solicitud de modificación:', error);  // Agregado para depuración
        return rejectWithValue(error.message);
      }
    }
  );
  