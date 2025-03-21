import { createSlice } from "@reduxjs/toolkit";
import { listarAlimentos, obtenerAlimentoPorId, crearAlimento } from "./thunk";

export const foodSlice = createSlice({
  name: "alimentos",
  initialState: {
    alimentos: [],
    alimento: null,
    favoritos: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Agrega el alimento a favoritos si no existe
    agregarAFavoritos: (state, action) => {
      const existe = state.favoritos.find(
        (food) => food.idAlimento === action.payload.idAlimento
      );
      if (!existe) {
        state.favoritos.push(action.payload);
      }
    },
    // Quita el alimento de favoritos
    quitarFavorito: (state, action) => {
      state.favoritos = state.favoritos.filter(
        (food) => food.idAlimento !== action.payload
      );
    },
    // Alterna el estado de favorito: si existe, lo quita; si no, lo agrega
    toggleFavorito: (state, action) => {
      const index = state.favoritos.findIndex(
        (food) => food.idAlimento === action.payload.idAlimento
      );
      if (index >= 0) {
        state.favoritos.splice(index, 1);
      } else {
        state.favoritos.push(action.payload);
      }
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

// Exporta las acciones para usarlas en tus componentes
export const { agregarAFavoritos, quitarFavorito, toggleFavorito } = foodSlice.actions;
export default foodSlice.reducer;
