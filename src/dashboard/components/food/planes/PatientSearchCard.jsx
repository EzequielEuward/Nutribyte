import { Card, CardHeader, CardContent, Grid, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const PatientSearchCard = ({ dni, setDni, onSearch }) => {
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mb: 2 }}>
      <CardHeader
        title="Buscar Paciente"
        subheader="Ingrese el DNI del paciente para crear un nuevo plan alimenticio"
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              label="DNI del paciente"
              placeholder="Ingrese DNI del paciente"
              fullWidth
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={onSearch}
              startIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PatientSearchCard;
