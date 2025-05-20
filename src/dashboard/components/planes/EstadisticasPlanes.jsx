import { Box, Typography, Card, CardContent, Divider, LinearProgress } from "@mui/material";
import { FitnessCenter, Restaurant, EnergySavingsLeaf, LocalFireDepartment } from "@mui/icons-material";

export const EstadisticasPlanes = ({ plan }) => {
  if (!plan) return null;

  const getValor = (clave) => {
    const entrada = plan.estadisticasPlan?.find((e) => e.toLowerCase().includes(clave));
    if (!entrada) return "-";
    const match = entrada.match(/(\d+)/);
    return match ? parseInt(match[1]) : "-";
  };

  const kcal = getValor("kcal");
  const prote = getValor("prote");
  const carbo = getValor("carbo");
  const grasa = getValor("grasa");

  return (
    <Card sx={{ mt: 4, p: 2, height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
          Estadísticas del Plan
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Generador de bloque */}
        {[
          { icon: <LocalFireDepartment color="error" />, label: "Kcal Diarias", value: kcal, color: "#ff7043" },
          { icon: <FitnessCenter />, label: "Proteínas", value: prote, color: "#f39c12" },
          { icon: <Restaurant color="success" />, label: "Carbohidratos", value: carbo, color: "#27ae60" },
          { icon: <EnergySavingsLeaf color="warning" />, label: "Grasas", value: grasa, color: "#e67e22" },
        ].map(({ icon, label, value, color }, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Box display="flex" alignItems="center" gap={1}>
                {icon}
                <Typography variant="subtitle1">{label}:</Typography>
              </Box>
              <Typography variant="h6">{value}{label === "Kcal Diarias" ? '' : 'g'}</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min((value / (label === "Kcal Diarias" ? 4000 : 400)) * 100, 100)}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
                "& .MuiLinearProgress-bar": {
                  backgroundColor: color,
                }
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default EstadisticasPlanes;
