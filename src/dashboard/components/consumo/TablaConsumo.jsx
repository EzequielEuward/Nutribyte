import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export const TablaConsumo = ({ consumos = [] }) => {
    const pacientes = useSelector((state) => state.patients.pacientes);

    return (
        <Box>
            {consumos.length === 0 ? (
                <Typography variant="body1">No se registraron consumos aún.</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Paciente</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>Alimentos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {consumos.map((consumo) => {
                                const paciente = pacientes.find((p) => p.idPaciente === consumo.idPaciente);
                                return (
                                    <TableRow key={consumo.idConsumo}>
                                        <TableCell>{format(new Date(consumo.fecha), "dd/MM/yyyy")}</TableCell>
                                        <TableCell>
                                            {paciente
                                                ? `${paciente.persona.nombre} ${paciente.persona.apellido}`
                                                : "Paciente no disponible"}
                                        </TableCell>
                                        <TableCell>
                                            {paciente
                                                ? `${paciente.persona.dni} `
                                                : "Paciente no disponible"}
                                        </TableCell>
                                        <TableCell>
                                            {consumo.consumoAlimentos?.map((a, idx) => (
                                                <div key={idx}>
                                                    {a.alimento?.nombre || "Alimento desconocido"} - {a.cantidad}g
                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default TablaConsumo;
