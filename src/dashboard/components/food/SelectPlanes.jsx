import { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export const SelectPlanes = ({ setPlanActual }) => {
  const [planSeleccionado, setPlanSeleccionado] = useState(10);

  const handleChangePlan = (e) => {
    const planValue = e.target.value;
    setPlanSeleccionado(planValue);
    setPlanActual(planValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: { xs: "flex-start", md: "flex-end" }, 
        padding: 2,
        gap: 2, 
      }}
    >
      <Box
        sx={{
          minWidth: { xs: "100%", sm: "250px" }, 
          maxWidth: "300px",
        }}
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel>Seleccionar plan</InputLabel>
          <Select
            value={planSeleccionado}
            onChange={handleChangePlan}
            label="Seleccionar plan"
          >
            <MenuItem value={10}>Hiper Calórico</MenuItem>
            <MenuItem value={20}>Alto Calórico</MenuItem>
            <MenuItem value={30}>Hiper Proteico</MenuItem>
            <MenuItem value={40}>Vegetariano</MenuItem>
            <MenuItem value={50}>Vegano</MenuItem>
            <MenuItem value={60}>Sin T.A.C.C</MenuItem>
            <MenuItem value={70}>Normo Calórico</MenuItem>
            <MenuItem value={80}>Cardio Protector</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectPlanes;
