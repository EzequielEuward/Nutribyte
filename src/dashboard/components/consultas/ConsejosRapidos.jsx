import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";


export const ConsejosRapidos = () => {
    return (
        <>
            <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                    <CardHeader
                        title="💡 Consejos Rápidos"
                        titleTypographyProps={{ variant: 'h6' }}
                    />
                    <CardContent>
                        <ul style={{ paddingLeft: 20 }}>
                            <li><Typography>Usa el buscador por DNI para acceder rápido al historial</Typography></li>
                            <li><Typography>Verifica siempre los datos antropométricos</Typography></li>
                            <li><Typography>Revisa el historial antes de nueva consulta</Typography></li>
                        </ul>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default ConsejosRapidos;
