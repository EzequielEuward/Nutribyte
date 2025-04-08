import { createSlice } from "@reduxjs/toolkit";
import { crearPlanAlimenticio, buscarPacientePorDni, obtenerAlimentos } from "./thunk"; 

const initialState = {
  paciente: null,
  plan: null,
  alimentos: [], // Nuevo estado para almacenar alimentos
  isLoading: false,
  isLoadingAlimentos: false, // Estado de carga específico para alimentos
  error: null,
  errorAlimentos: null, // Error específico para alimentos
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    agregarComida: (state, action) => {
      if (!state.plan) {
        state.plan = { comidas: [] };
      }
      state.plan.comidas.push(action.payload);
    },
    limpiarPlan: (state) => {
      state.plan = null;
      state.paciente = null;
      state.error = null;
      state.isLoading = false;
    },
    // Reducer para limpiar errores de alimentos si lo necesitas
    limpiarErroresAlimentos: (state) => {
      state.errorAlimentos = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Casos existentes para paciente y planes
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
      
      // Caso para crear plan
      .addCase(crearPlanAlimenticio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crearPlanAlimenticio.fulfilled, (state, action) => {
        state.plan = action.payload;
        state.isLoading = false;
      })
      .addCase(crearPlanAlimenticio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al crear el plan alimenticio";
      })
      
      // Nuevos casos para el manejo de alimentos
      .addCase(obtenerAlimentos.pending, (state) => {
        state.isLoadingAlimentos = true;
        state.errorAlimentos = null;
      })
      .addCase(obtenerAlimentos.fulfilled, (state, action) => {
        state.isLoadingAlimentos = false;
        state.alimentos = action.payload;
      })
      .addCase(obtenerAlimentos.rejected, (state, action) => {
        state.isLoadingAlimentos = false;
        state.errorAlimentos = action.payload || "Error al obtener alimentos";
      });
  },
});

export const { agregarComida, limpiarPlan, limpiarErroresAlimentos } = planSlice.actions;
export default planSlice.reducer;