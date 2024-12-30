import { StatsCards, PendingAppointments, RecentAppointments, QuickAccess } from "../components/dashboard";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Box } from "@mui/material";

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* Contenedor general con padding usando Box de MUI */}
      <Box p={2}>
        <StatsCards />
        {/* Contenedor para las tablas en columnas */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <PendingAppointments />
          <RecentAppointments />
        </Box>
        <QuickAccess />
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
