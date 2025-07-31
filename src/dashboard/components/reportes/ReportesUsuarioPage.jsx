import { useState } from "react";
import {
  Tabs, Tab, Box, Typography, Card, CardContent, CardHeader,
  Tooltip,
  IconButton,
  useTheme
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";
import { TurnosResumenChart, DistribucionTurnosMensualChart, ComparacionTurnosMesChart, PacientesPorSexoChart } from "../../components/reportes";
import { useSelector } from "react-redux";
import { differenceInMonths } from "date-fns";
import { PatientsSummary } from "../dashboard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const ReportesUsuarioPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const turnos = useSelector((state) => state.turnos.turnos || []);
  const pacientes = useSelector((state) => state.patients.pacientes);

  const pacientesActivos = pacientes.filter((paciente) => paciente.activo === true);
  const totalPacientesActivos = pacientesActivos.length;

  const obtenerResumenTurnos = (turnos) => {
    const hoy = new Date();

    const resumen = {
      disponible: [0, 0, 0],
      ocupado: [0, 0, 0],
      cerrado: [0, 0, 0],
      cancelado: [0, 0, 0],
    };

    turnos.forEach((turno) => {
      const fecha = new Date(turno.fechaInicio);
      const meses = differenceInMonths(hoy, fecha);
      const estado = turno.estado?.toLowerCase().replace(/\s/g, "");


      const indices = [
        meses <= 1 ? 0 : null,
        meses <= 6 ? 1 : null,
        meses <= 12 ? 2 : null,
      ];

      indices.forEach((index, i) => {
        if (index !== null) {
          if (estado.includes("disponible")) resumen.disponible[i]++;
          else if (estado.includes("ocupado")) resumen.ocupado[i]++;
          else if (estado.includes("cerrado")) resumen.cerrado[i]++;
          else if (estado.includes("cancelado")) resumen.cancelado[i]++;
        }
      });
    });

    return resumen;
  };


  const turnosData = obtenerResumenTurnos(turnos);

  return (
    <DashboardLayout>
      <Tooltip title="Volver">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: theme.palette.secondary.button,
            color: theme.palette.text.tertiary,
            "&:hover": {
              backgroundColor: theme.palette.primary.button,
              color: theme.palette.text.tertiary,
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Reportes</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Visualiza estadísticas del seguimiento nutricional
        </Typography>

        <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 2 }}>
          <Tab label="Turnos" />
          <Tab label="Pacientes" />
        </Tabs>

        {tabIndex === 0 && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <DistribucionTurnosMensualChart />
            </Box>
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <ComparacionTurnosMesChart />
            </Box>
            <Box sx={{ width: "100%" }}>
              <TurnosResumenChart data={turnosData} />
            </Box>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <Card>
                <CardHeader title="Pacientes" subheader="Últimos 3 meses" />
                <PatientsSummary pacientes={pacientesActivos} />
              </Card>
            </Box>
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <PacientesPorSexoChart />
            </Box>
          </Box>
        )}

      </Box>
    </DashboardLayout>
  );
};

export default ReportesUsuarioPage;