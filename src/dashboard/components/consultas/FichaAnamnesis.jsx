import  { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Tabs,
    Tab,
    Button,
    Box,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormGroup,
    FormControlLabel,
    Switch,
    Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import MedicionesCardAnamnesis from './MedicionesCardAnamnesis';
import IndicadoresCorporales from './IndicadoresCorporales';
import ComparativaPeso from './ComparativaPeso';
import GraficosCircunferencias from './GraficosCircunferencias';
import GraficosPliegues from './GraficosPliegues';



export const FichaAnamnesis = ({ open, onClose, onEdit, currentAnamnesis, handleMenuOpen }) => {



    const [tabValue, setTabValue] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [formData, setFormData] = useState({
        enfermedadesPrevias: '',
        cirugias: '',
        traumatismos: '',
        alergias: '',
        medicacionActual: '',
        antecedentesFamiliares: '',
        tabaquismo: false,
        alcohol: false,
        drogas: false,
        actividadFisica: false,
        dietaEspecial: '',
        motivoConsulta: '',
        inicioSintomas: '',
        evolucion: '',
        tratamientosPrevios: '',
    });

    const handleTabChange = (_, newValue) => setTabValue(newValue);



    const handleSwitchChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleEditClick = () => {
        onEdit && onEdit();

    };


    const handleSnackbarClose = () => setSnackbarOpen(false);
    return (
        <>
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    title="Anamnesis"
                    subheader="Historial médico del paciente"
                    action={
                        <Button 
                            variant="outlined" 
                            onClick={() => handleMenuOpen('editanamnesis', currentAnamnesis)} // ✅
                        >
                            <EditIcon />
                        </Button>
                    }
                />

                <CardContent>
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
                        {tabValue === 1 && <GraficosCircunferencias />}
                        {tabValue === 2 && <GraficosPliegues />}
                        {tabValue === 3 && <IndicadoresCorporales data={formData} />}
                    </Box>
                </CardContent>
            </Card>

            {/* Dialog para edición de anamnesis */}
            {/* <ModalEditAnamnesis
                open={open}
                onClose={onClose}
                currentAnamnesis={currentAnamnesis}
            /> */}

            {/* Snackbar de confirmación */}
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
