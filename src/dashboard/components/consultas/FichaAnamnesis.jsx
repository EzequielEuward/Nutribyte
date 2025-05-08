import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Tabs,
  Tab,
  Button,
  Box,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import MedicionesCardAnamnesis from './MedicionesCardAnamnesis';
import IndicadoresCorporales from './IndicadoresCorporales';
import ComparativaPeso from './ComparativaPeso';
import GraficosCircunferencias from './GraficosCircunferencias';
import GraficosPliegues from './GraficosPliegues';
import { obtenerAnamnesisCalculadaPorConsulta } from '../../../store/consultas';

export const FichaAnamnesis = ({
  open,
  onClose,
  onEdit,
  currentAnamnesis,
  handleMenuOpen,
  anamnesisList,
  setActiveTab
}) => {

  const dispatch = useDispatch();
  const { anamnesisCalculada, consultas } = useSelector(state => state.consulta);
  
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedAnamnesisId, setSelectedAnamnesisId] = useState('');

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  useEffect(() => {
    if (selectedAnamnesisId && consultas.length > 0) {
      const consultaVinculada = consultas.find(c => c.idAnamnesis === selectedAnamnesisId);
      if (consultaVinculada?.idConsulta) {
       
        dispatch(obtenerAnamnesisCalculadaPorConsulta(consultaVinculada.idConsulta));
      } else {
      }
    }
  }, [selectedAnamnesisId, consultas, dispatch]);

  useEffect(() => {

    if (anamnesisCalculada?.idAnamnesis) {
      setFormData(anamnesisCalculada);
    }
  }, [anamnesisCalculada]);

  useEffect(() => {
    if (currentAnamnesis?.idAnamnesis) {
      setSelectedAnamnesisId(currentAnamnesis.idAnamnesis);
    }
  }, [currentAnamnesis]);

  const handleEditAnamnesis = async () => {
    if (currentAnamnesis || (anamnesisList && anamnesisList.length > 0)) {
      setActiveTab('anamnesis');
      await new Promise(resolve => setTimeout(resolve, 50));
      const anamnesisAEditar = currentAnamnesis || [...anamnesisList].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
      handleMenuOpen('edit', anamnesisAEditar);
    } else {
      alert('No hay anamnesis para editar.');
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title="Anamnesis"
          subheader="Seguimiento médico del paciente"
          action={
            <Button
              onClick={handleEditAnamnesis}
              variant="contained"
              color="primary"
            >
              Editar Anamnesis
            </Button>
          }
        />

        <CardContent>
          {anamnesisList && anamnesisList.length > 0 && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="select-anamnesis-label">Seleccionar Anamnesis</InputLabel>
              <Select
                labelId="select-anamnesis-label"
                value={selectedAnamnesisId}
                label="Seleccionar Anamnesis"
                onChange={(e) => setSelectedAnamnesisId(e.target.value)}
              >
                {anamnesisList.map((a) => (
                  <MenuItem key={a.idAnamnesis} value={a.idAnamnesis}>
                    {a.fecha ? new Date(a.fecha).toLocaleDateString() : `ID ${a.idAnamnesis}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Resumen" onClick={e => e.currentTarget.blur()} />
            <Tab label="Circunferencias" onClick={e => e.currentTarget.blur()} />
            <Tab label="Pliegues" onClick={e => e.currentTarget.blur()} />
            <Tab label="Indicadores" onClick={e => e.currentTarget.blur()} />
          </Tabs>

          <Box sx={{ minHeight: 650, overflow: 'auto' }}>
            {tabValue === 0 && (
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <MedicionesCardAnamnesis data={formData} />
                  <ComparativaPeso data={formData} />
                </Box>
                <IndicadoresCorporales data={formData} />
              </Box>
            )}
            {tabValue === 1 && <GraficosCircunferencias data={formData} />}
            {tabValue === 2 && <GraficosPliegues data={formData} />}
            {tabValue === 3 && <IndicadoresCorporales data={formData} />}
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Anamnesis actualizada correctamente
        </Alert>
      </Snackbar>
    </>
  );
};

export default FichaAnamnesis;
