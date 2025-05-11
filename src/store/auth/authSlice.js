import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    uid: null,
    requires2FA: false,
    username: "",
    rol: "",
    planUsuario: "",
    twoFactorEnabled: false,
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
      state.planUsuario = payload.planUsuario;
      state.rol = payload.rol;
      state.persona = payload.persona;
      state.matricula = payload.matricula;
      state.especialidad = payload.especialidad;
      state.token = payload.token;
      state.requires2FA = payload.requires2FA || false;
      state.twoFactorEnabled = payload.twoFactorEnabled || false;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.username = "";
      state.rol = "";
      state.token = "";
      state.planUsuario = "";
      state.matricula = "";
      state.especialidad = "";
      state.requires2FA = false;
      state.twoFactorEnabled = false;
      state.persona = {
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        sexoBiologico: "",
      };
      state.errorMessage = null;
    },
    setError: (state, { payload }) => {
      state.status = "not-authenticated";
      state.errorMessage = payload;
    },
    setRequires2FA: (state, { payload }) => {
      state.requires2FA = payload;
    },
  },
});

// Exportar acciones
export const { login, logout, checkingCredentials, setError, setRequires2FA } = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;
