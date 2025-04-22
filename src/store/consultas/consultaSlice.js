import { createSlice } from "@reduxjs/toolkit";
import { buscarPacientePorDni, listarConsulta, crearConsulta } from "./thunk";

const initialState = {
  paciente: null,
  isLoading: false,
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
        console.log("✅ consultaSlice fulfilled, payload:", action.payload);
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
      });
  },
});

export default consultaSlice.reducer;