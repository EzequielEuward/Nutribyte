import { createSlice } from '@reduxjs/toolkit';
import { listarCobros, crearCobro, actualizarCobro, eliminarCobro, listarCobrosPorUsuario } from './';

const initialState = {
  cobros: [],
  cobrosUsuario: [],
  loading: false,
  error: null,
};

export const cobroSlice = createSlice({
  name: 'cobro',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(listarCobros.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarCobros.fulfilled, (state, action) => {
        state.loading = false;
        state.cobros = action.payload;
      })
      .addCase(listarCobros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener los cobros';
      })
      .addCase(crearCobro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearCobro.fulfilled, (state, action) => {
        state.loading = false;
        state.cobros.push(action.payload);
      })
      .addCase(crearCobro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(actualizarCobro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarCobro.fulfilled, (state, action) => {
        state.loading = false;
        state.cobros = state.cobros.map(cobro =>
          cobro.idCobro === action.payload.idCobro ? action.payload : cobro
        );
      })
      .addCase(actualizarCobro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(eliminarCobro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eliminarCobro.fulfilled, (state, action) => {
        state.loading = false;
        state.cobros = state.cobros.filter(
          (cobro) => cobro.cobroId !== action.payload.cobroId
        );
      })
      .addCase(listarCobrosPorUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarCobrosPorUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.cobrosUsuario = action.payload;
      })
      .addCase(listarCobrosPorUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener cobros del usuario';
      })
      .addCase(eliminarCobro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cobroSlice.reducer;
