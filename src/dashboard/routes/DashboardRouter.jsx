import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  DashboardPage, PatientPage, FoodPage, ProfilePage,
  CalendarPage, ConsultaPage, PlanesPage, RecipePage,
  ConfigPage, HistorialPeso, ConsumoPage, VersionPage,
  ControlDeSistemaPage, PlanSummaryPage, SeguridadMedidas,
  DetallePlan, ReportesPage, CalculadoraAntropometricaPage,
  PagosAndSuscripcionesPage, CobrosParticularesPage
} from '../pages/';

export const DashboardRouter = () => {
  const { rol, planUsuario } = useSelector(state => state.auth);

  return (
    <Routes>
      {/* 🏠 Página principal */}
      <Route path="/" element={<DashboardPage />} />

      {/* 👤 Perfil y configuración */}
      <Route path="perfil" element={<ProfilePage />} />
      <Route path="configuracion" element={<ConfigPage />} />
      <Route path="medidas-de-seguridad" element={<SeguridadMedidas />} />
      <Route path="informacion-planes" element={<DetallePlan planUsuario={planUsuario} />} />

      {/* 👨‍⚕️ Módulo Paciente */}
      <Route path="paciente" element={<PatientPage />} />
      <Route path="consultas" element={<ConsultaPage />} />

      {/* 🍽️ Módulo Alimentos y Planes */}
      <Route path="alimentos" element={<FoodPage />} />
      <Route path="recetas" element={<RecipePage />} />
      <Route path="planes" element={<PlanesPage />} />
      <Route path="planes/resumen-plan" element={<PlanSummaryPage />} />

      {/* 📊 Módulo Progreso */}
      <Route path="progreso/historial-peso" element={<HistorialPeso />} />
      <Route path="progreso/calorias-consumidas" element={<ConsumoPage />} />

      {/* 📅 Turnos */}
      <Route path="turnos" element={<CalendarPage />} />

      {/* 📈 Reportes */}
      <Route path="reportes" element={<ReportesPage />} />

      {/* 💳 Pagos */}
      <Route path="pagos-y-suscripciones" element={<PagosAndSuscripcionesPage />} />
      <Route path="pagos-particulares" element={<CobrosParticularesPage />} />

      {/* 🧮 Funcionalidades especiales (Plan Elite) */}
      {planUsuario === "Elite" && (
        <Route path="calculadora-antropometrica" element={<CalculadoraAntropometricaPage />} />
      )}

      {/* 🔐 Administración (solo Admin) */}
      {rol === "Administrador" && (
        <>
          <Route path="versiones" element={<VersionPage />} />
          <Route path="control-de-usuario" element={<ControlDeSistemaPage />} />
        </>
      )}

      {/* 🔁 Fallback */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default DashboardRouter;
