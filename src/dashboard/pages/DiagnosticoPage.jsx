import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CalendarToday as CalendarIcon, Description as FileText } from "@mui/icons-material";
import { DashboardLayout } from "../layout/DashboardLayout";

export const DiagnosticoPage = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [newDiagnosis, setNewDiagnosis] = useState({
    patientName: "",
    date: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    severity: "Leve",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiagnosis((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event) => {
    setNewDiagnosis((prev) => ({ ...prev, severity: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const diagnosis = {
      id: diagnoses.length + 1,
      ...newDiagnosis,
    };
    setDiagnoses((prev) => [...prev, diagnosis]);
    setNewDiagnosis({
      patientName: "",
      date: "",
      symptoms: "",
      diagnosis: "",
      treatment: "",
      severity: "Leve",
    });
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 1 }}>
        <Typography variant="h4" gutterBottom>
          Diagnóstico de pacientes
        </Typography>

        <Card sx={{ mt: 2 }}>
          <CardHeader title="Estadísticas de Diagnósticos" />
          <CardContent>
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr 1fr" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "#e3f2fd",
                  borderRadius: 1,
                }}
              >
                <CalendarIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2" color="#1976d2">
                    Diagnósticos este mes
                  </Typography>
                  <Typography variant="h6">{diagnoses.length}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "#fff9c4",
                  borderRadius: 1,
                }}
              >
                <FileText sx={{ fontSize: 30, color: "#fbc02d", mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2" color="#fbc02d">
                    Casos moderados
                  </Typography>
                  <Typography variant="h6">
                    {diagnoses.filter((d) => d.severity === "Moderado").length}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "#ffebee",
                  borderRadius: 1,
                }}
              >
                <FileText sx={{ fontSize: 30, color: "#d32f2f", mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2" color="#d32f2f">
                    Casos graves
                  </Typography>
                  <Typography variant="h6">
                    {diagnoses.filter((d) => d.severity === "Grave").length}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr", mt: 4 }}>
          <Card>
            <CardHeader title="Nuevo Diagnóstico" />
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Nombre del Paciente"
                    name="patientName"
                    value={newDiagnosis.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Fecha"
                    type="date"
                    name="date"
                    value={newDiagnosis.date}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Síntomas"
                    name="symptoms"
                    value={newDiagnosis.symptoms}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    required
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Diagnóstico"
                    name="diagnosis"
                    value={newDiagnosis.diagnosis}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    required
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Tratamiento"
                    name="treatment"
                    value={newDiagnosis.treatment}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    required
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Severidad</InputLabel>
                    <Select
                      value={newDiagnosis.severity}
                      onChange={handleSelectChange}
                      required
                    >
                      <MenuItem value="Leve">Leve</MenuItem>
                      <MenuItem value="Moderado">Moderado</MenuItem>
                      <MenuItem value="Grave">Grave</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button variant="contained" color="primary" type="submit">
                  Guardar Diagnóstico
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Diagnósticos Recientes" />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Diagnóstico</TableCell>
                    <TableCell>Severidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {diagnoses.map((diagnosis) => (
                    <TableRow key={diagnosis.id}>
                      <TableCell>{diagnosis.patientName}</TableCell>
                      <TableCell>{diagnosis.date}</TableCell>
                      <TableCell>{diagnosis.diagnosis}</TableCell>
                      <TableCell>{diagnosis.severity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default DiagnosticoPage;
