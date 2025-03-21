import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Acceder a los datos de estado
import {
  DashboardPage, PatientPage, FoodPage, ProfilePage,
  CalendarPage, DiagnosticoPage, PlanesPage, RecipePage,
  ConfigPage, HistorialPeso, CaloriasConsumidasPage, VersionPage,
  ControlDeUsuario,
} from '../pages/';

export const DashboardRouter = () => {
  const { rol } = useSelector(state => state.auth);  // Accediendo al rol desde el slice auth

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="perfil" element={<ProfilePage />} />
      <Route path="configuracion" element={<ConfigPage />} />
      <Route path="paciente" element={<PatientPage />} />
      <Route path="diagnostico" element={<DiagnosticoPage />} />
      <Route path="alimentos" element={<FoodPage />} />
      <Route path="recetas" element={<RecipePage />} />
      <Route path="planes" element={<PlanesPage />} />
      <Route path="progreso/historial-peso" element={<HistorialPeso />} />
      <Route path="progreso/calorias-consumidas" element={<CaloriasConsumidasPage />} />
      <Route path="turnos" element={<CalendarPage />} />

      {/* Solo los administradores pueden ver estas rutas */}
      {rol === "Administrador" && (
        <>
          <Route path="versiones" element={<VersionPage />} />
          <Route path="control-de-usuario" element={<ControlDeUsuario />} />
        </>
      )}

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default DashboardRouter;
