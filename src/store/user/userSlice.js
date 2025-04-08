import { createSlice } from '@reduxjs/toolkit';
import { ListarUsuarios, ListarUsuariosPorId, CrearUsuario, ModificarUsuario } from './thunk';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Obtener todos los usuarios
      .addCase(ListarUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ListarUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(ListarUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(ListarUsuariosPorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ListarUsuariosPorId.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(ListarUsuariosPorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Crear un nuevo usuario
      .addCase(CrearUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CrearUsuario.fulfilled, (state, action) => {
        state.loading = false;
        // Si deseas agregar el usuario creado al listado:
        state.users.push(action.payload);
      })
      .addCase(CrearUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Modificar un usuario existente
      .addCase(ModificarUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ModificarUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.idUsuario === action.payload.idUsuario);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      
      .addCase(ModificarUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default userSlice.reducer;
