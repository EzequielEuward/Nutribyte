import { Card, CardHeader, CardContent, Grid, TextField, Button, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const PatientSearchCard = ({ dni, setDni, onSearch, pacientesList = [] }) => {
  const filteredOptions = pacientesList.filter((p) =>
    p.persona.dni.toString().startsWith(dni.trim())
  );

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mb: 2 ,mt:2}}>
      <CardHeader
        title="Buscar Paciente"
        subheader="Ingrese el DNI del paciente para crear un nuevo plan alimenticio"
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Autocomplete
              freeSolo
              options={filteredOptions}
              getOptionLabel={(option) =>
                `${option.persona.dni} - ${option.persona.nombre} ${option.persona.apellido}`
              }
              inputValue={dni}
              onInputChange={(event, newInputValue) => {
                setDni(newInputValue);
              }}
              onChange={(event, selectedOption) => {
                // Al seleccionar la opción, actualizamos el input con el DNI completo
                if (selectedOption) {
                  setDni(selectedOption.persona.dni.toString());
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="DNI del paciente"
                  placeholder="Ingrese DNI del paciente"
                  fullWidth
                />
              )}
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
