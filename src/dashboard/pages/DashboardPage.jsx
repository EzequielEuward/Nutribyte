import { StatsCards, PendingAppointments, RecentAppointments, QuickAccess, PatientsSummary, YearlyConsultationsChart } from "../components/dashboard";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Box } from "@mui/material";

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Box p={2}>
        {/* StatsCard en la parte superior */}
        <StatsCards />

        {/* PendingAppointments y RecentAppointments */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2} mt={2}>
          <PendingAppointments />
          <RecentAppointments />
        </Box>

        {/* Accesos rápidos */}
        <QuickAccess />

        {/* PatientsSummary y YearlyConsultationsChart en la parte inferior */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mt={2}
        >
          <Box sx={{ flex: 1 }}>
            <PatientsSummary />
          </Box>
          <Box sx={{ flex: 1 }}>
            <YearlyConsultationsChart />
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
