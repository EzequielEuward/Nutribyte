import { createSlice } from "@reduxjs/toolkit";
import { buscarPacientePorDni, listarConsulta, crearConsulta, modificarConsulta, eliminarConsulta, obtenerPorIdAnamnesis, modificarAnamnesis } from "./thunk";

const initialState = {
  consultas: [],
  paciente: null,
  isLoading: false,
  anamnesisList:[],
  currentAnamnesis: null,
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
        state.isLoading = false;
        state.consultas = action.payload;
        state.anamnesis = action.payload
          .filter(c => c.idAnamnesis)
          .map(c => c.anamnesis);
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
        if (state.consultas) {
          const index = state.consultas.findIndex(
            c => c.idConsulta === action.payload.idConsulta
          );
          if (index !== -1) {
            state.consultas[index] = action.payload;
          }
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
      });
  },
});

export default consultaSlice.reducer;