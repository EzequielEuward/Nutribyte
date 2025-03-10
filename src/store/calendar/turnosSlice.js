import { createSlice } from "@reduxjs/toolkit";
import { listarTurnos, crearTurno } from "./";

const initialState = {
  turnos: [],
  loading: false,
  error: null,
  turnoCreado: null, // Estado para el último turno creado (por si querés mostrar un mensaje o algo similar)
};

export const turnosSlice = createSlice({
  name: "turnos",
  initialState,
  reducers: {
    resetTurnoCreado: (state) => {
      state.turnoCreado = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Listar turnos
      .addCase(listarTurnos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarTurnos.fulfilled, (state, action) => {
        state.loading = false;
        state.turnos = action.payload;
      })
      .addCase(listarTurnos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al obtener los turnos";
      })

      // Crear turno
      .addCase(crearTurno.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearTurno.fulfilled, (state, action) => {
        state.loading = false;

        const nuevoTurno = action.payload;

        // Si ya existe, no lo agrega
        if (!state.turnos.some((t) => t.idTurno === nuevoTurno.idTurno)) {
          state.turnos.push(nuevoTurno);
        }

        state.turnoCreado = nuevoTurno;
      })
      .addCase(crearTurno.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al crear el turno";
      });
  },
});

export const { resetTurnoCreado } = turnosSlice.actions;

export default turnosSlice.reducer;
