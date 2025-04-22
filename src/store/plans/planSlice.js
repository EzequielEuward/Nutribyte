import { createSlice } from "@reduxjs/toolkit";
import { crearPlanAlimenticio, buscarPacientePorDni, obtenerAlimentos, obtenerPlanesPorNutricionista } from "./thunk"; 

const initialState = {
  paciente: null,
  plan: null,
  planes: [], // Nuevo estado para almacenar todos los planes
  alimentos: [],
  isLoading: false,
  isLoadingPlanes: false, // Estado de carga específico para planes
  isLoadingAlimentos: false,
  error: null,
  errorPlanes: null, // Error específico para planes
  errorAlimentos: null,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    agregarAlimento: (state, action) => {
      if (!state.plan) {
        state.plan = { alimentos: [] };
      }
      state.plan.alimentos.push(action.payload);
    },
    limpiarPlan: (state) => {
      state.plan = null;
      state.paciente = null;
      state.error = null;
      state.isLoading = false;
    },
    limpiarErroresAlimentos: (state) => {
      state.errorAlimentos = null;
    }
  },
  extraReducers: (builder) => {
    builder
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
      
      .addCase(crearPlanAlimenticio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crearPlanAlimenticio.fulfilled, (state, action) => {
        state.plan = action.payload;
        state.isLoading = false;
        // Actualizamos la lista de planes con el nuevo creado
        state.planes = [...state.planes, action.payload];
      })
      .addCase(crearPlanAlimenticio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al crear el plan alimenticio";
      })
      
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
      })
      
      // Nuevos casos para obtener planes del nutricionista
      .addCase(obtenerPlanesPorNutricionista.pending, (state) => {
        state.isLoadingPlanes = true;
        state.errorPlanes = null;
      })
      .addCase(obtenerPlanesPorNutricionista.fulfilled, (state, action) => {
        state.isLoadingPlanes = false;
        state.planes = action.payload; // Almacenamos todos los planes
      })
      .addCase(obtenerPlanesPorNutricionista.rejected, (state, action) => {
        state.isLoadingPlanes = false;
        state.errorPlanes = action.payload || "Error al obtener planes";
      });
  },
});

export const { agregarComida, limpiarPlan, limpiarErroresAlimentos } = planSlice.actions;
export default planSlice.reducer;