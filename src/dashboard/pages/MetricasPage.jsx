import { useState, useEffect, useMemo } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Divider,
  Tooltip,
  IconButton,
  useTheme
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { SaveAlt as ExportIcon } from '@mui/icons-material';
import { DashboardLayout } from '../layout/DashboardLayout';
import { DataTable } from '../components';
import { useNavigate } from 'react-router-dom';
import { PatientSearchCard } from '../components/planes';
import { useDispatch, useSelector } from 'react-redux';
import { listarPacientes } from '../../store/patient';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { listarConsumosConHabitos, buscarPacientePorDni } from '../../store/consumo';
import { obtenerUltimoPlanPorPaciente } from '../../store/plans';
import Swal from 'sweetalert2';
import { ConsejosRapidos, PatientInfoCardConsulta } from '../components/consultas';
import ChartLineMacronutrientes from '../components/metricas/ChartLineMacronutrientes';

export const MetricasPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const pacientesList = useSelector(state => state.patients.pacientes || []);
  const [dni, setDni] = useState('');
  const [step, setStep] = useState('busqueda');
  const [paciente, setPaciente] = useState(null);
  const [consumosPaciente, setConsumosPaciente] = useState([]);
  const [data, setData] = useState([
    {
      fecha: "2023-01-01",
      peso: 80,
      proteinas: 120,
      carbohidratos: 250,
      grasas: 70,
      alimentos: "Pollo y arroz",
      observaciones: "Día normal"
    },
    {
      fecha: "2023-02-01",
      peso: 78,
      proteinas: 100,
      carbohidratos: 200,
      grasas: 60,
      alimentos: "Pescado y ensalada",
      observaciones: "Entrenamiento intenso"
    },
  ]);
  const [formData, setFormData] = useState({
    fecha: "", peso: "", proteinas: "", carbohidratos: "", grasas: "", alimentos: "", observaciones: ""
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(listarPacientes());
    dispatch(listarConsumosConHabitos());
  }, [dispatch]);
  const buscarPaciente = () => {
    const dniValido = dni.trim();

    if (!dniValido || !/^\d{7,8}$/.test(dniValido)) {
      Swal.fire({
        icon: 'warning',
        title: 'DNI inválido',
        text: 'Ingrese un DNI válido (7 u 8 dígitos)',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    dispatch(buscarPacientePorDni(dniValido))
      .unwrap()
      .then((pac) => {
        if (!pac || !pac.idPaciente) throw new Error("Paciente sin ID");
        setPaciente(pac);
        dispatch(obtenerUltimoPlanPorPaciente({ idPaciente: pac.idPaciente }));

        // 👉 Agregá esta parte para cargar consumos del paciente
        dispatch(listarConsumosPorPaciente(pac.idPaciente))
          .unwrap()
          .then((consumos) => {
            setConsumosPaciente(consumos);
          })
          .catch((error) => {
            console.error("❌ Error al traer consumos:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error al traer consumos',
              text: error.message || "No se pudieron cargar los consumos",
              confirmButtonText: 'Aceptar'
            });
          });
      })
      .catch((error) => {
        console.error("❌ Error al buscar paciente:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al buscar paciente',
          text: error.message || "Ocurrió un error inesperado",
          confirmButtonText: 'Aceptar'
        });
      });
  };

  const pacientesFiltrados = useMemo(() => {
    if (!dni.trim()) return [];
    return pacientesList.filter((p) =>
      p.persona?.dni?.toString().includes(dni.trim())
    );
  }, [dni, pacientesList]);

  useEffect(() => {
    if (paciente) setStep('creacion');
  }, [paciente]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddData = () => {
    setData([...data, formData]);
    setFormData({
      fecha: "", peso: "", proteinas: "", carbohidratos: "", grasas: "", alimentos: "", observaciones: ""
    });
    setOpen(false);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Fecha,Peso,Proteínas,Carbohidratos,Grasas,Alimentos,Observaciones\n" +
      data
        .map(
          (row) => `${row.fecha},${row.peso},${row.proteinas},${row.carbohidratos},${row.grasas},${row.alimentos},${row.observaciones}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historial_nutricion.csv");
    document.body.appendChild(link);
    link.click();
  };

  const lineChartData = {
    labels: data.map((item) => item.fecha),
    datasets: [
      {
        label: "Peso (kg)",
        data: data.map((item) => item.peso),
        borderColor: "teal",
        backgroundColor: "rgba(0, 128, 128, 0.5)",
        tension: 0.3,
      },
      {
        label: "Proteínas (g)",
        data: data.map((item) => item.proteinas),
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.5)",
        tension: 0.3,
      },
      {
        label: "Carbohidratos (g)",
        data: data.map((item) => item.carbohidratos),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        tension: 0.3,
      },
      {
        label: "Grasas (g)",
        data: data.map((item) => item.grasas),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        tension: 0.3,
      },
    ],
  };

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
      {step === "busqueda" && (
        <>
          <Box sx={{ mt: 2 }}>
            <ConsejosRapidos />
          </Box>
          <Box sx={{ mt: 3 }}>
            <PatientSearchCard
              dni={dni}
              setDni={setDni}
              onSearch={buscarPaciente}
              pacientesList={pacientesFiltrados}
            />
          </Box>
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {step === "creacion" && paciente && (

        <Box sx={{ padding: 2 }}>
          <PatientInfoCardConsulta
            paciente={paciente.persona}
            onEdit={() => setStep("busqueda")}
          />

          <Divider sx={{ my: 4 }} />
          <Typography variant="h4">Historial de Nutrición</Typography>
          <ChartLineMacronutrientes consumos={consumosPaciente} />
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Tipo de Plan: Básico (ejemplo)
          </Typography>


          <Box sx={{ width: "100%", height: "350px", mt: 2 }}>
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Box>

          <DataTable data={data} />

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar Registro</DialogTitle>
            <DialogContent>
              <TextField margin="dense" label="Fecha" type="date" fullWidth value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} InputLabelProps={{ shrink: true }} />
              <TextField margin="dense" label="Peso (kg)" type="number" fullWidth value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} />
              <TextField margin="dense" label="Proteínas (g)" type="number" fullWidth value={formData.proteinas} onChange={(e) => setFormData({ ...formData, proteinas: e.target.value })} />
              <TextField margin="dense" label="Carbohidratos (g)" type="number" fullWidth value={formData.carbohidratos} onChange={(e) => setFormData({ ...formData, carbohidratos: e.target.value })} />
              <TextField margin="dense" label="Grasas (g)" type="number" fullWidth value={formData.grasas} onChange={(e) => setFormData({ ...formData, grasas: e.target.value })} />
              <TextField margin="dense" label="Alimentos" fullWidth value={formData.alimentos} onChange={(e) => setFormData({ ...formData, alimentos: e.target.value })} />
              <TextField margin="dense" label="Observaciones" fullWidth value={formData.observaciones} onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error">Cancelar</Button>
              <Button onClick={handleAddData} color="primary">Agregar</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default MetricasPage;
