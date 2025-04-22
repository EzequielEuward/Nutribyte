import { createSlice } from '@reduxjs/toolkit';
import { ListarUsuarios, ListarUsuariosPorId, CrearUsuario, ModificarUsuario, EliminarUsuario,ToggleUserStatus } from './thunk';

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
        state.users = state.users.map((user) =>
          user.idUsuario === action.payload.idUsuario ? action.payload : user
        );
      })
      .addCase(ModificarUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(EliminarUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EliminarUsuario.fulfilled, (state, action) => {
        state.loading = false;
        // Eliminamos el usuario del array. Puedes usar action.payload.idUsuario
        state.users = state.users.filter(
          (user) => user.idUsuario !== action.payload.idUsuario
        );
      })
      .addCase(EliminarUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(ToggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ToggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.idUsuario === action.payload.idUsuario ? { ...user, activo: action.payload.activo } : user)
      })
      .addCase(ToggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default userSlice.reducer;
