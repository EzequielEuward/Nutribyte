import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/uiSlice';
import { authSlice } from './auth/authSlice';
import { patientSlice } from './patient/patientSlice';
import { turnosSlice } from './calendar/turnosSlice';
import { foodSlice } from './food/foodSlice';
import userReducer from './user/userSlice';
import { planSlice } from './plans/planSlice';
import { cobroSlice } from './cobro/cobroSlice';
import { consultaSlice } from './consultas/consultaSlice';
import { consumoSlice } from './consumo/consumoSlice';
import { cobroParticularSlice } from './cobroParticular';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userReducer,
    auth: authSlice.reducer,
    patients: patientSlice.reducer,
    turnos: turnosSlice.reducer,
    alimentos: foodSlice.reducer,
    plan: planSlice.reducer,
    cobro: cobroSlice.reducer,
    consulta: consultaSlice.reducer,
    consumo: consumoSlice.reducer,
    cobroParticular: cobroParticularSlice.reducer,
  },
});
