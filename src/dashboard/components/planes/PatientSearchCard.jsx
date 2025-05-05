import { useMemo } from "react";
import { Card, CardHeader, CardContent, Grid, TextField, Button, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const PatientSearchCard = ({ dni, setDni, onSearch, pacientesList = [] }) => {

  const filteredOptions = useMemo(() => {
    if (!dni.trim()) return [];
    return pacientesList.filter((p) =>
      p.persona.dni.toString().startsWith(dni.trim())
    );
  }, [dni, pacientesList]);

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mb: 2, mt: 2 }}>
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
                typeof option === "object"
                  ? `${option.persona.dni} - ${option.persona.nombre} ${option.persona.apellido}`
                  : option
              }
              inputValue={dni}
              onInputChange={(event, newInputValue) => {
                setDni(newInputValue);
              }}
              value={null} // ← esta línea es la clave para que no te reemplace el input con la opción completa
              onChange={(event, selectedOption) => {
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
