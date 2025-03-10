
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/uiSlice';
import { authSlice } from './auth/authSlice';
import { patientSlice } from './patient/patientSlice';
import {turnosSlice} from './calendar/turnosSlice';


export const store = configureStore({

  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    patients: patientSlice.reducer,
    turnos: turnosSlice.reducer,
  },

});
