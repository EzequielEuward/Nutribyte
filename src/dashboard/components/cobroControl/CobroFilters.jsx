import React from 'react';
import { Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const CobroFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  estadoFilter, 
  setEstadoFilter, 
  metodoFilter, 
  setMetodoFilter 
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estadoFilter}
            label="Estado"
            onChange={(e) => setEstadoFilter(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="aprobado">Aprobado</MenuItem>
            <MenuItem value="fallido">Fallido</MenuItem>
            <MenuItem value="reembolsado">Reembolsado</MenuItem>
            {/* Puedes agregar más estados si lo requieres */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Método de pago</InputLabel>
          <Select
            value={metodoFilter}
            label="Método de pago"
            onChange={(e) => setMetodoFilter(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="efectivo">Efectivo</MenuItem>
            <MenuItem value="tarjeta">Tarjeta</MenuItem>
            <MenuItem value="transferencia">Transferencia</MenuItem>
            {/* Agrega más métodos de pago según sea necesario */}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CobroFilters;
