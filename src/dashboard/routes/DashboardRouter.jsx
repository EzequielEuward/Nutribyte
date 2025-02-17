import { Routes, Route, Navigate } from 'react-router-dom';
import {
  DashboardPage, PatientPage, FoodPage, ProfilePage,
  CalendarPage, DiagnosticoPage, PlanesPage, RecipePage,
  ConfigPage, HistorialPeso, CaloriasConsumidasPage
} from '../pages/';

export const DashboardRouter = () => {
  return (
    <Routes>
      {/* Ruta principal del Dashboard */}
      <Route path="/" element={<DashboardPage />} />
      {/* Subrutas dentro del dashboard */}

      {/* Esto esta en Navbar */}
      <Route path="perfil" element={<ProfilePage />} />
      <Route path="configuracion" element={<ConfigPage />} />

      {/* Paciente */}
      <Route path="paciente" element={<PatientPage />} />
      <Route path="diagnostico" element={<DiagnosticoPage />} />

      {/* Alimentos */}
      <Route path="alimentos" element={<FoodPage />} />
      <Route path="recetas" element={<RecipePage />} />
      <Route path="planes" element={<PlanesPage />} />

      {/* Progreso */}
      <Route path="progreso/historial-peso" element={<HistorialPeso />} />
      <Route path="progreso/calorias-consumidas" element={<CaloriasConsumidasPage />} />

      <Route path="turnos" element={<CalendarPage />} />

      {/* <Route path="settings" element={<SettingsPage />} />  */}

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default DashboardRouter;
