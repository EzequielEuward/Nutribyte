import { Typography, Box } from '@mui/material';

export const InformacionPersonalDiagnostico = ({ paciente }) => {
  return (
    <Box mt={2}>
      <Typography><strong>Nombre:</strong> {paciente.nombre}</Typography>
      <Typography><strong>DNI:</strong> {paciente.dni}</Typography>
      <Typography><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</Typography>
      <Typography><strong>Teléfono:</strong> {paciente.telefono}</Typography>
      <Typography><strong>Email:</strong> {paciente.email}</Typography>
    </Box>
  );
};

export default InformacionPersonalDiagnostico;
