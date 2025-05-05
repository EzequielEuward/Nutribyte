import { createSlice } from "@reduxjs/toolkit";
import { buscarPacientePorDni, listarConsulta, crearConsulta, modificarConsulta, eliminarConsulta, obtenerPorIdAnamnesis, obtenerAnamnesisCalculadaPorConsulta, listarPacientesPorNutricionista, modificarAnamnesis, listarAnamnesisPorPaciente } from "./thunk";

const initialState = {
  consultas: [],
  paciente: null,
  isLoading: false,
  anamnesisList: [],
  currentAnamnesis: null,
  anamnesisCalculada: null,
  error: null,
};

export const consultaSlice = createSlice({
  name: "consulta",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarPacientePorDni.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(buscarPacientePorDni.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paciente = action.payload;
      })
      .addCase(buscarPacientePorDni.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(listarConsulta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listarConsulta.fulfilled, (state, action) => {
        state.consultas = action.payload;
        state.isLoading = false;

      })
      .addCase(listarConsulta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(crearConsulta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crearConsulta.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(crearConsulta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(modificarConsulta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(modificarConsulta.fulfilled, (state, action) => {
        state.isLoading = false;

        if (state.consultas && action.payload && action.payload.idConsulta) {
          const index = state.consultas.findIndex(
            c => c.idConsulta === action.payload.idConsulta
          );
          if (index !== -1) {
            state.consultas[index] = action.payload;
          }
        } else {
          console.warn("modificarConsulta.fulfilled: action.payload.idConsulta no existe o action.payload es inválido", action.payload);
        }
      })
      .addCase(modificarConsulta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(eliminarConsulta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(eliminarConsulta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consultas = state.consultas.filter(
          consulta => consulta.idConsulta !== action.payload
        );
      })
      .addCase(eliminarConsulta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //ANAMNESIS
      .addCase(obtenerPorIdAnamnesis.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(obtenerPorIdAnamnesis.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("[4] Reducer - currentAnamnesis actualizado:", action.payload);
        state.currentAnamnesis = action.payload;
      })
      .addCase(obtenerPorIdAnamnesis.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(modificarAnamnesis.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(modificarAnamnesis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentAnamnesis = action.payload;
      })
      .addCase(modificarAnamnesis.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(listarAnamnesisPorPaciente.fulfilled, (state, action) => {
        state.isLoading = false;
        state.anamnesisList = action.payload; // ✅ ACA
      })
      .addCase(listarPacientesPorNutricionista.fulfilled, (state, action) => {
        state.lista = action.payload;
        state.isLoading = false;
      })
      .addCase(listarPacientesPorNutricionista.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listarPacientesPorNutricionista.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(obtenerAnamnesisCalculadaPorConsulta.fulfilled, (state, action) => {
        state.anamnesisCalculada = action.payload; // ⬅️ GUARDAR ACÁ
      })
      .addCase(obtenerAnamnesisCalculadaPorConsulta.pending, (state) => {
        state.anamnesisCalculada = null; 
      })
      .addCase(obtenerAnamnesisCalculadaPorConsulta.rejected, (state, action) => {
        state.anamnesisCalculada = null;
        state.error = action.payload;
      });
  },
});

export default consultaSlice.reducer;