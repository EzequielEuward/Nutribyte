import { createSlice } from "@reduxjs/toolkit";
import { crearPaciente, listarPacientes, obtenerPacientePorId, desactivarPaciente, actualizarPaciente } from './';

const initialState = {
  pacientes: [],
  pacienteSeleccionado: null, 
  isLoading: false,
  error: null,
};

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    limpiarPacienteSeleccionado: (state) => {
      state.pacienteSeleccionado = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(crearPaciente.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crearPaciente.fulfilled, (state, action) => {
        state.pacientes.push(action.payload);
        state.isLoading = false;
      })
      .addCase(crearPaciente.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(listarPacientes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listarPacientes.fulfilled, (state, action) => {
        state.pacientes = action.payload;
        state.isLoading = false;
      })

      .addCase(listarPacientes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(obtenerPacientePorId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(obtenerPacientePorId.fulfilled, (state, action) => {
        state.pacienteSeleccionado = action.payload;
        state.isLoading = false;
      })
      .addCase(obtenerPacientePorId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error desconocido";
      })
      .addCase(desactivarPaciente.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(desactivarPaciente.fulfilled, (state, action) => {
        state.pacientes = state.pacientes.map(paciente =>
          paciente.idPaciente === action.payload.idPaciente ? { ...paciente, activo: false } : paciente
        );
        state.isLoading = false;
      })
      .addCase(desactivarPaciente.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al desactivar el paciente";
      })
      .addCase(actualizarPaciente.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(actualizarPaciente.fulfilled, (state, action) => {
        state.pacientes = state.pacientes.map(paciente =>
          paciente.idPaciente === action.payload.idPaciente ? action.payload : paciente
        );
        state.isLoading = false;
      })
      
      
      .addCase(actualizarPaciente.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { limpiarPacienteSeleccionado } = patientSlice.actions;
export default patientSlice.reducer;
