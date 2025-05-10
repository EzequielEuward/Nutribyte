import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Container,
    Paper,
    Button,
} from "@mui/material";
import { startVerificarCuenta } from "../../store/auth/";

export const VerificarCuentaPage = () => {
    const [searchParams] = useSearchParams();
    const [estado, setEstado] = useState("loading");
    const [mensaje, setMensaje] = useState("");
    const token = searchParams.get("token");

    useEffect(() => {
        const verificar = async () => {
            const { isSuccess, message } = await startVerificarCuenta(token)();
            setEstado(isSuccess ? "success" : "error");
            setMensaje(message);
        };

        if (token) verificar();
        else {
            setEstado("error");
            setMensaje("Token inválido o ausente.");
        }
    }, [token]);

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Verificación de cuenta
                </Typography>

                {estado === "loading" && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {estado !== "loading" && (
                    <Alert severity={estado === "success" ? "success" : "error"} sx={{ mt: 2 }}>
                        {mensaje}
                    </Alert>
                )}

                {estado === "success" && (
                    <Box mt={4} textAlign="center">
                        <Button variant="contained" href="/auth/login">
                            Ir al login
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default VerificarCuentaPage;