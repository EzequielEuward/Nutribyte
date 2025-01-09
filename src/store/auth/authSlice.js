import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'checking', 'authenticated', 'not-authenticated'
        username: null,
        rol: null,
        nombre: null,
        apellido: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.username = payload.username;  
            state.rol = payload.rol;           
            state.nombre = payload.nombre;     
            state.apellido = payload.apellido;  
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.username = null;
            state.rol = null;
            state.nombre = null;
            state.apellido = null;
            state.errorMessage = payload?.errorMessage || null;
        },
        CheckingCredentials: (state) => {
            state.status = 'checking'; 
        },
        finishCheckingCredentials: (state) => {
            state.status = 'not-authenticated'; 
        },
    },
});

// Exportar acciones
export const { login, logout, CheckingCredentials, finishCheckingCredentials } = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;
