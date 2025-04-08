import { useState } from "react";
import {
  Card, CardHeader, CardContent, CardActions,
  Button, Grid, TextField, FormControl,
  InputLabel, Select, MenuItem
} from "@mui/material";
import { MealPlanTabs } from "./MealPlanTabs";
import SaveIcon from '@mui/icons-material/Save';

export const PlanCreationForm = ({
  planType,
  setPlanType,
  calorias,
  setCalorias,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  onCancel,
  onGenerate
}) => {
  return (
    <Card>
      <CardHeader
        title="Crear Plan Alimenticio"
        subheader="Complete los detalles del plan alimenticio"
      />
      <CardContent>
        <Grid container spacing={2}>
          {/* Tipo de Plan */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Plan</InputLabel>
              <Select
                value={planType}
                label="Tipo de Plan"
                onChange={(e) => setPlanType(e.target.value)}
              >
                <MenuItem value="Plan Estándar">Plan Estándar</MenuItem>
                <MenuItem value="Plan Keto">Plan Keto</MenuItem>
                <MenuItem value="Plan Vegetariano">Plan Vegetariano</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Calorías Diarias */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Calorías Diarias"
              type="number"
              fullWidth
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
            />
          </Grid>

          {/* Fecha de Inicio */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Inicio"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </Grid>

          {/* Fecha de Finalización */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Finalización"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </Grid>

          
          {planType && (
            <Grid item xs={12}>
              <MealPlanTabs />
            </Grid>
          )}
        </Grid>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onGenerate} startIcon={<SaveIcon />}>
          Generar Plan Alimenticio
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlanCreationForm;
