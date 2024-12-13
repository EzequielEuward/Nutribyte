import { TextField, Button,Card,CardHeader,CardContent,Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const BuscarPacienteDiagnostico = ({ dni, setDni, buscarPaciente }) => {
  return (
    <Card>
      <CardHeader title="Buscar Paciente" />
      <CardContent sx={{ minHeight: 200 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              placeholder="DNI del paciente"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Button variant="contained" onClick={buscarPaciente}>
              Buscar
            </Button>
          </Box>
          <Link href="/pacientes" passHref>
            <Button fullWidth variant="outlined">
              Agregar Nuevo Paciente
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BuscarPacienteDiagnostico;
