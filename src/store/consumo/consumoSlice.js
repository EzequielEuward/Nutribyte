import { createSlice } from '@reduxjs/toolkit';
import { listarConsumosPorUsuario , buscarPacientePorDni, obtenerConsumoPorId, crearConsumo, editarConsumo, eliminarConsumo } from './thunk';

const initialState = {
  consumos: [],
  consumoSeleccionado: null,
  isLoading: false,
  error: null
};

const slice = createSlice({
  name: 'consumo',
  initialState,
  reducers: {
    limpiarConsumoSeleccionado: (state) => {  
      state.consumoSeleccionado = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(listarConsumosPorUsuario.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listarConsumosPorUsuario.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consumos = action.payload;
      })
      .addCase(buscarPacientePorDni.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(buscarPacientePorDni.fulfilled, (state, action) => {
        state.paciente = action.payload;
        state.isLoading = false;
      })
      .addCase(buscarPacientePorDni.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al buscar paciente por DNI";
      })
      .addCase(obtenerConsumoPorId.fulfilled, (state, action) => {
        state.consumoSeleccionado = action.payload;
      })
      .addCase(crearConsumo.fulfilled, (state, action) => {
        state.consumos.push(action.payload);
      })
      .addCase(editarConsumo.fulfilled, (state, action) => {
        const index = state.consumos.findIndex(c => c.idConsumo === action.payload.idConsumo);
        if (index >= 0) state.consumos[index] = action.payload;
      })
      .addCase(eliminarConsumo.fulfilled, (state, action) => {
        state.consumos = state.consumos.filter(c => c.idConsumo !== action.payload);
      });
  }
});

export const consumoSlice = slice;
export const { limpiarConsumoSeleccionado } = slice.actions;
