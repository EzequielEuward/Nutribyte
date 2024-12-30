import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { SaveAlt as ExportIcon } from '@mui/icons-material';
import { DashboardLayout } from '../layout/DashboardLayout';
import { DataTable } from '../components/';
import { useNavigate } from 'react-router-dom';

export const HistorialPeso = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    peso: "",
    proteinas: "",
    carbohidratos: "",
    grasas: "",
    alimentos: "",
    observaciones: "",
  });

  const [data, setData] = useState([
    { fecha: "2023-01-01", peso: 80, proteinas: 120, carbohidratos: 250, grasas: 70, alimentos: "Pollo y arroz", observaciones: "Día normal" },
    { fecha: "2023-02-01", peso: 78, proteinas: 100, carbohidratos: 200, grasas: 60, alimentos: "Pescado y ensalada", observaciones: "Entrenamiento intenso" },
  ]);

  const [dni, setDni] = useState('');
  const [plan, setPlan] = useState('');

  const handleSearchPatient = () => {
    if (dni === '12345678') {
      setPlan('Plan Básico');
    } else if (dni === '87654321') {
      setPlan('Plan Avanzado');
    } else {
      setPlan('Paciente no encontrado');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddData = () => {
    setData([...data, formData]);
    setFormData({
      fecha: "", peso: "", proteinas: "", carbohidratos: "", grasas: "", alimentos: "", observaciones: "",
    });
    setOpen(false);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Fecha,Peso,Proteínas,Carbohidratos,Grasas,Alimentos,Observaciones\n" +
      data
        .map((row) => `${row.fecha},${row.peso},${row.proteinas},${row.carbohidratos},${row.grasas},${row.alimentos},${row.observaciones}`)
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
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">Historial de Nutrición</Typography>

        {/* Búsqueda de paciente */}
        <Box sx={{ marginBottom: 2, maxWidth: 200, mt: 2 }}>
          <TextField
            label="DNI del Paciente"
            type="number"
            fullWidth
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearchPatient}>
            Buscar Paciente
          </Button>
        </Box>

        {/* Mostrar el tipo de plan */}
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {plan && `Tipo de Plan: ${plan}`}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Nuevo
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open("/formulario-historial-peso", "_blank")}
            startIcon={<formIcon />}
          >
            Formulario
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleExport}
            sx={{ padding: 0 }}
          >
            <ExportIcon />
          </Button>
        </Box>


        {/* Gráfico */}
        <Box sx={{ width: "100%", height: "350px" }}>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>

        {/* Tabla */}
        <DataTable data={data} />

        {/* Formulario en Dialog */}
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
    </DashboardLayout>
  );
};
