import { createSlice } from '@reduxjs/toolkit';
import { obtenerCobrosPorUsuario, crearCobroParticular, eliminarCobroParticular, editarCobroParticular } from './';

const initialState = {
    cobros: [],
    loading: false,
    error: null,
};

export const cobroParticularSlice = createSlice({
    name: 'cobroParticular',
    initialState,
    reducers: {
        clearCobros: (state) => {
            state.cobros = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(obtenerCobrosPorUsuario.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(obtenerCobrosPorUsuario.fulfilled, (state, action) => {
                state.loading = false;
                state.cobros = action.payload;
            })
            .addCase(obtenerCobrosPorUsuario.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(crearCobroParticular.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(crearCobroParticular.fulfilled, (state, action) => {
                state.loading = false;
                state.cobros.push(action.payload);
            })
            .addCase(crearCobroParticular.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(eliminarCobroParticular.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(eliminarCobroParticular.fulfilled, (state, action) => {
                state.loading = false;
                const idEliminado = action.payload;
                state.cobros = state.cobros.filter(c => c.idCobro !== idEliminado);
            })
            .addCase(eliminarCobroParticular.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editarCobroParticular.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editarCobroParticular.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.cobros.findIndex(c => c.idCobro === action.payload.idCobro);
                if (index !== -1) {
                    state.cobros[index] = action.payload;
                }
            })
            .addCase(editarCobroParticular.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCobros } = cobroParticularSlice.actions;
export default cobroParticularSlice.reducer;
