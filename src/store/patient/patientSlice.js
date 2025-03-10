import { createSlice } from "@reduxjs/toolkit";
import { crearPaciente, listarPacientes, obtenerPacientePorId, desactivarPaciente } from './';

const initialState = {
  pacientes: [],
  pacienteSeleccionado: null, // Agregamos este estado
  isLoading: false,
  error: null,
};

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    limpiarPacienteSeleccionado: (state) => {
      state.pacienteSeleccionado = null; // Permite limpiar el estado cuando se cierre el drawer
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(crearPaciente.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crearPaciente.fulfilled, (state, action) => {
        state.pacientes.push(action.payload); // Agregar nuevo paciente a la lista
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
        state.pacientes = action.payload; // Asignar la lista de pacientes
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
        state.pacienteSeleccionado = action.payload; // Asignar el paciente seleccionado
        state.isLoading = false;
      })
      .addCase(obtenerPacientePorId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error desconocido";
      })
      // Añadimos el case para desactivar el paciente
      .addCase(desactivarPaciente.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(desactivarPaciente.fulfilled, (state, action) => {
        // Si desactivamos correctamente, actualizamos el estado de los pacientes
        state.pacientes = state.pacientes.map(paciente =>
          paciente.idPaciente === action.payload.idPaciente ? { ...paciente, activo: false } : paciente
        );
        state.isLoading = false;
      })
      .addCase(desactivarPaciente.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al desactivar el paciente";
      });
  },
});

export const { limpiarPacienteSeleccionado } = patientSlice.actions;
export default patientSlice.reducer;
