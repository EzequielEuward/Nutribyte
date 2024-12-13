import { TextField, Button, Box, Grid, Typography } from '@mui/material';

export const NuevoDiagnostico = ({ nuevoDiagnostico, handleNuevoDiagnosticoChange, handleGuardarDiagnostico }) => {
    return (
        <Box mt={2} component="form" onSubmit={handleGuardarDiagnostico} overflow="auto">
            {/* Título o Encabezado */}
            <Typography variant="h6" gutterBottom>
                Nuevo Diagnóstico
            </Typography>
            
            {/* Grid para organizar los campos */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="DNI"
                        fullWidth
                        name="dni"
                        value={nuevoDiagnostico.dni}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Motivo de Visita"
                        fullWidth
                        name="motivoVisita"
                        value={nuevoDiagnostico.motivoVisita}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Fecha"
                        fullWidth
                        name="fecha"
                        type="date"
                        value={nuevoDiagnostico.fecha}
                        onChange={handleNuevoDiagnosticoChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Talla (cm)"
                        fullWidth
                        name="talla"
                        value={nuevoDiagnostico.talla}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Peso Actual (kg)"
                        fullWidth
                        name="pesoActual"
                        value={nuevoDiagnostico.pesoActual}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Peso Habitual (kg)"
                        fullWidth
                        name="pesoHabitual"
                        value={nuevoDiagnostico.pesoHabitual}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Circunferencia Brazo (cm)"
                        fullWidth
                        name="circunferenciaBrazo"
                        value={nuevoDiagnostico.circunferenciaBrazo}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Circunferencia Cintura (cm)"
                        fullWidth
                        name="circunferenciaCintura"
                        value={nuevoDiagnostico.circunferenciaCintura}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Circunferencia Pantorrilla (cm)"
                        fullWidth
                        name="circunferenciaPantorrilla"
                        value={nuevoDiagnostico.circunferenciaPantorrilla}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Pliegue Bicipital (mm)"
                        fullWidth
                        name="pliegueBicipital"
                        value={nuevoDiagnostico.pliegueBicipital}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Pliegue Tricipital (mm)"
                        fullWidth
                        name="pliegueTricipital"
                        value={nuevoDiagnostico.pliegueTricipital}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Pliegue Subescapular (mm)"
                        fullWidth
                        name="pliegueSubescapular"
                        value={nuevoDiagnostico.pliegueSubescapular}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Pliegue Suprailiaco (mm)"
                        fullWidth
                        name="pliegueSuprailiaco"
                        value={nuevoDiagnostico.pliegueSuprailiaco}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Observaciones"
                        fullWidth
                        multiline
                        rows={4}
                        name="observaciones"
                        value={nuevoDiagnostico.observaciones}
                        onChange={handleNuevoDiagnosticoChange}
                    />
                </Grid>
            </Grid>
            
            {/* Botón para guardar */}
            <Box mt={2}>
                <Button type="submit" variant="contained" fullWidth>
                    Guardar Diagnóstico
                </Button>
            </Box>
        </Box>
    );
};

export default NuevoDiagnostico;
