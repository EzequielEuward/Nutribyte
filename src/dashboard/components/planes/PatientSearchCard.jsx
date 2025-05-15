import { useMemo } from "react";
import { Card, CardHeader, CardContent, Grid, TextField, Button, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

export const PatientSearchCard = ({ dni, setDni, onSearch, pacientesList = [] }) => {
  const theme = useTheme();

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
              options={pacientesList}
              filterOptions={(options) =>
                options.filter((p) =>
                  p.persona.dni.toString().startsWith(dni.trim())
                )
              }
              getOptionLabel={(option) =>
                typeof option === "object"
                  ? `${option.persona.dni} - ${option.persona.nombre} ${option.persona.apellido}`
                  : option
              }
              inputValue={dni}
              onInputChange={(event, newInputValue) => {
                const soloNumeros = newInputValue.replace(/\D/g, '');
                if (soloNumeros.length <= 8) {
                  setDni(soloNumeros);
                }
              }}
              value={null}
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
                  inputProps={{
                    ...params.inputProps,
                    inputMode: "numeric",
                    maxLength: 8,
                    minLength: 7,
                  }}
                  helperText="Solo números. Entre 7 y 8 dígitos."
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.text.secondary,
                    },
                    '& .MuiOutlinedInput-root': {
                      color: theme.palette.text.primary,
                      '& fieldset': {
                        borderColor: theme.palette.custom.primary,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.secondary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.custom.primary,
                      },
                    },
                    '& .MuiSvgIcon-root': {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              sx={{ color: "theme.palette.text.primary" }}
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
