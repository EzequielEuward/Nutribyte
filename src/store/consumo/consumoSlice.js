import { createSlice } from '@reduxjs/toolkit';
import { listarConsumosPorUsuario, buscarPacientePorDni, obtenerConsumoPorId, listarConsumosPorPaciente, listarConsumosConHabitos, listarHabitosPorPaciente, crearConsumo, editarConsumo, crearConsumoHabito, eliminarConsumo } from './thunk';

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
      .addCase(listarConsumosPorPaciente.fulfilled, (state, action) => {
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
      .addCase(crearConsumoHabito.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crearConsumoHabito.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.consumoSeleccionado) {
          state.consumoSeleccionado.consumoHabitos = action.payload;
        }
      })
      .addCase(crearConsumoHabito.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(listarHabitosPorPaciente.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listarHabitosPorPaciente.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habitos = action.payload;
      })
      .addCase(listarHabitosPorPaciente.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(listarConsumosConHabitos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listarConsumosConHabitos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consumos = action.payload;
      })
      .addCase(listarConsumosConHabitos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const consumoSlice = slice;
export const { limpiarConsumoSeleccionado } = slice.actions;
