import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const SelectPlanes = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: { xs: "flex-start", md: "flex-start" },
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
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Seleccionar plan</InputLabel>
          <Select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
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
