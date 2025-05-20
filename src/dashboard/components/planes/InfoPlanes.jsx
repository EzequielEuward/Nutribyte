import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { AccessAlarm } from "@mui/icons-material";

export const InfoPlanes = ({ plan }) => {
  if (!plan) return null;

  // Adaptamos beneficiosSalud (array de strings) a [{ titulo, descripcion }]
  const beneficios = Array.isArray(plan.beneficiosSalud)
    ? plan.beneficiosSalud.map((b) => ({
        titulo: b,
        descripcion: "", // o podés poner algo genérico si querés
      }))
    : [];

  return (
    <Box sx={{ flex: 1 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontSize: 24, fontWeight: 'bold' }}>
              {plan.titulo || "Sin título"}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {plan.descripcion}
            </Typography>
          }
        />

        <CardContent>
          <Box>
            {beneficios.map((beneficio, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 2 }}>
                <Box sx={{
                  borderRadius: "50%",
                  p: 1,
                  backgroundColor: "#e0f7fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <AccessAlarm sx={{ width: 20, height: 20, color: "#00796b" }} />
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: "500", fontSize: 16, mb: 0.5 }}>
                    {beneficio.titulo}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
                    {beneficio.descripcion}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Más información
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InfoPlanes;
