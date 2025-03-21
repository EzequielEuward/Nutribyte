import { createSlice } from "@reduxjs/toolkit";
import {
  listarTurnos,
  crearTurno,
  obtenerTurnoPorId,
  eliminarTurno,
  modificarTurno,
  cambiarEstadoTurno,
} from "./";

const initialState = {
  turnos: [],
  loading: false,
  error: null,
  turnoCreado: null,
  turnoSeleccionado: null,
  turnoModificado: null,
};

export const turnosSlice = createSlice({
  name: "turnos",
  initialState,
  reducers: {
    resetTurnoCreado: (state) => {
      state.turnoCreado = null;
    },
    resetTurnoSeleccionado: (state) => {
      state.turnoSeleccionado = null;
    },
    resetTurnoModificado: (state) => {
      state.turnoModificado = null;
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
        // Se crea un nuevo array para forzar la actualización
        state.turnos = [...action.payload];
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
        // Si no existe ya, lo agregamos y creamos un nuevo array
        if (!state.turnos.some((t) => t.idTurno === nuevoTurno.idTurno)) {
          state.turnos = [...state.turnos, nuevoTurno];
        }
        state.turnoCreado = nuevoTurno;
      })
      .addCase(crearTurno.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al crear el turno";
      })

      // Obtener turno por ID
      .addCase(obtenerTurnoPorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerTurnoPorId.fulfilled, (state, action) => {
        state.loading = false;
        state.turnoSeleccionado = action.payload;
      })
      .addCase(obtenerTurnoPorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al obtener el turno";
      })

      // Eliminar turno (cambiando el estado a "cancelado")
      .addCase(eliminarTurno.pending, (state) => {
        state.loading = true;
      })
      .addCase(eliminarTurno.fulfilled, (state, action) => {
        state.loading = false;
        const turnoActualizado = action.payload;
        state.turnos = state.turnos.map((turno) =>
          turno.idTurno === turnoActualizado.idTurno
            ? { ...turno, estado: "cancelado" }
            : turno
        );
      })
      .addCase(eliminarTurno.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al cancelar el turno";
      })

      // Modificar turno
      .addCase(modificarTurno.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modificarTurno.fulfilled, (state, action) => {
        state.loading = false;
        const turnoModificado = action.payload;
        state.turnos = state.turnos.map((turno) =>
          turno.idTurno === turnoModificado.idTurno ? { ...turnoModificado } : turno
        );
        state.turnoModificado = turnoModificado;
      })
      .addCase(modificarTurno.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al modificar el turno";
      })

      // Cambiar estado del turno
      .addCase(cambiarEstadoTurno.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cambiarEstadoTurno.fulfilled, (state, action) => {
        state.loading = false;
        const turnoActualizado = action.payload;
        state.turnos = state.turnos.map((turno) =>
          turno.idTurno === turnoActualizado.idTurno ? { ...turnoActualizado } : turno
        );
      })
      .addCase(cambiarEstadoTurno.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al cambiar el estado del turno";
      });
  },
});

export const { resetTurnoCreado, resetTurnoSeleccionado, resetTurnoModificado } = turnosSlice.actions;
export default turnosSlice.reducer;
