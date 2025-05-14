import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";

const RecuperarPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      const response = await axios.post("https://sintacc-api-deploy.azurewebsites.net/api/Usuarios/recuperar-contraseña", {
        email,
      });
      setMensaje(response.data);
    } catch (err) {
      const msg =
        err.response?.data || "No se pudo procesar la solicitud.";
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recuperar contraseña
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar enlace de recuperación
          </Button>
        </Box>

        {mensaje && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {mensaje}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default RecuperarPasswordPage;