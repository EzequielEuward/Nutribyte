import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


export const GraciasPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state?.plan || "Plan desconocido";
  const email = state?.email || "Email no disponible";
  const monto = state?.monto?.toLocaleString("es-AR", { style: "currency", currency: "ARS" }) || "N/A";

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="success.main">
        ¡Gracias por tu compra!
      </Typography>
      <Typography variant="h6">Tu suscripción fue procesada exitosamente.</Typography>
      <Typography variant="body1">
        <strong>Plan:</strong> {plan}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {email}
      </Typography>
      <Typography variant="body1">
        <strong>Monto:</strong> {monto}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default GraciasPage;

