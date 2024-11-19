import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage, PatientPage, FoodPage } from '../pages/'; 


export const DashboardRouter = () => {
  return (
    <Routes>
      {/* Ruta principal del Dashboard */}
      <Route path="/" element={<DashboardPage />} />

      {/* Subrutas dentro del dashboard */}
      
       <Route path="paciente" element={<PatientPage />} />
       <Route path="alimentos" element={<FoodPage />} />

      {/* <Route path="settings" element={<SettingsPage />} />  */}

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default DashboardRouter;
