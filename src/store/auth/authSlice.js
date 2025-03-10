import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "not-authenticated",
        uid: null,
        username: "",
        rol: "",
        persona: {
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            sexoBiologico: "",
        },
        matricula: "",
        especialidad: "",
        token: "",
        errorMessage: null,
    },
    reducers: {
        checkingCredentials: (state) => {
            state.status = "checking";
        },
        login: (state, { payload }) => {
            state.status = "authenticated";
            state.uid = payload.uid;
            state.username = payload.username;
            state.rol = payload.rol;
            state.persona = payload.persona;
            state.matricula = payload.matricula;
            state.especialidad = payload.especialidad;
            state.token = payload.token;
            state.errorMessage = null;
        },
        logout: (state) => {  // ✅ Corregido: ahora siempre limpia el errorMessage
            state.status = "not-authenticated";
            state.uid = null;
            state.username = "";
            state.rol = "";
            state.persona = {
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                sexoBiologico: "",
            };
            state.matricula = "";
            state.especialidad = "";
            state.token = "";
            state.errorMessage = null;  // ✅ Corregido: ahora se limpia correctamente el errorMessage
        },
        setError: (state, { payload }) => {
            state.status = "not-authenticated";
            state.errorMessage = payload;
        },
    },
});

// Exportar acciones
export const { login, logout, checkingCredentials, setError } = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;
    