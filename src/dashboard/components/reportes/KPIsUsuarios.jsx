import { Grid, Card, CardContent, Typography } from "@mui/material";

// Opcional: traducir keys a nombres amigables
const labelMap = {
    totalUsuarios: "Total de Usuarios",
    usuariosActivos: "Usuarios Activos",
    usuariosInactivos: "Usuarios Inactivos",
    usuariosCon2FA: "Usuarios con Doble Factor",
    usuariosSexo: "Usuarios con Sexo Cargado",
    cantidadMasculino: "Usuarios Masculinos",
    cantidadFemenino: "Usuarios Femeninos",
};

export const KPIsUsuarios = ({ data }) => {
    return (
        <Grid container spacing={2}>
            {Object.entries(data).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                {labelMap[key] || key}
                            </Typography>
                            <Typography variant="h5">{value}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
