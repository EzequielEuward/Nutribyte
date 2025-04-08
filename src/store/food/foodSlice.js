import { createSlice } from "@reduxjs/toolkit";
import { listarAlimentos, obtenerAlimentoPorId, crearAlimento } from "./thunk";

const storedFavorites = JSON.parse(localStorage.getItem("favoritos")) || [];

export const foodSlice = createSlice({
  name: "alimentos",
  initialState: {
    alimentos: [],
    alimento: null,
    favoritos: storedFavorites, 
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavorito: (state, action) => {
      const index = state.favoritos.findIndex(
        (food) => food.idAlimento === action.payload.idAlimento
      );

      if (index >= 0) {
        state.favoritos.splice(index, 1);
      } else {
        state.favoritos.push(action.payload);
      }

      localStorage.setItem("favoritos", JSON.stringify(state.favoritos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listarAlimentos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarAlimentos.fulfilled, (state, action) => {
        state.loading = false;
        state.alimentos = action.payload;
      })
      .addCase(listarAlimentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(obtenerAlimentoPorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerAlimentoPorId.fulfilled, (state, action) => {
        state.loading = false;
        state.alimento = action.payload;
      })
      .addCase(obtenerAlimentoPorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(crearAlimento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearAlimento.fulfilled, (state, action) => {
        state.loading = false;
        state.alimentos.push(action.payload);
      })
      .addCase(crearAlimento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exportar la acción
export const { toggleFavorito } = foodSlice.actions;
export default foodSlice.reducer;
