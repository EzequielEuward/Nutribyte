import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage, PatientPage, FoodPage, ProfilePage,CalendarPage,DiagnosticoPage, PlanesPage } from '../pages/'; 




export const DashboardRouter = () => {
  return (
    <Routes>
      {/* Ruta principal del Dashboard */}
      <Route path="/" element={<DashboardPage />} />

      {/* Subrutas dentro del dashboard */}
      
       <Route path="paciente" element={<PatientPage />} />
       <Route path="alimentos" element={<FoodPage />} />
       <Route path="perfil" element={<ProfilePage />} />
       <Route path ="turnos" element={<CalendarPage/>} />
       <Route path ="diagnostico" element={<DiagnosticoPage/>} />
       <Route path ="planes" element={<PlanesPage/>} />

      {/* <Route path="settings" element={<SettingsPage />} />  */}

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default DashboardRouter;
