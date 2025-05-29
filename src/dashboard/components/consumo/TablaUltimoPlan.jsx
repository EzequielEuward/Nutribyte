import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Tooltip, IconButton, Typography, Alert, CircularProgress, Dialog, DialogTitle,
  DialogContent, useMediaQuery, useTheme, Box, Divider
} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { useState } from "react";

export const TablaUltimoPlan = ({ onEditPlan, onDeletePlan }) => {
  const { ultimoPlan, isLoading, error } = useSelector((state) => state.plan);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  if (isLoading) return <CircularProgress />;
  if (error) {
    const mensaje =
      typeof error === "string"
        ? error
        : error?.title || "Ocurrió un error inesperado al obtener el plan";
    return <Alert severity="error">{mensaje}</Alert>;
  }
  if (!ultimoPlan) return <Typography>No hay plan alimenticio registrado aún</Typography>;

  const vencido = new Date(ultimoPlan.fechaFin) < new Date();

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.paper' }}>
            <TableRow>
              <TableCell>Tipo de Plan</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={ultimoPlan.idPlanAlimento}>
              <TableCell>{ultimoPlan.tipoPlan}</TableCell>
              <TableCell>{new Date(ultimoPlan.fechaInicio).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(ultimoPlan.fechaFin).toLocaleDateString()}</TableCell>
              <TableCell>
                <Tooltip title="Ver Plan" arrow>
                  <IconButton onClick={() => setOpen(true)} sx={{ color: theme.palette.secondary.main }}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={vencido ? "Este plan ya finalizó. Debe crear uno nuevo." : "Editar Plan"} arrow>
                  <IconButton
                    onClick={() => onEditPlan?.(ultimoPlan)}
                    disabled
                    sx={{ color: "orange", opacity: vencido ? 0.4 : 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar Plan" arrow>
                  <IconButton color="error" onClick={() => onDeletePlan?.(ultimoPlan.idPlanAlimento)} disabled>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md" fullScreen={isMobile}>
        <DialogTitle>Resumen del Plan Alimenticio</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography><strong>Paciente:</strong> {ultimoPlan.paciente?.persona?.nombre} {ultimoPlan.paciente?.persona?.apellido}</Typography>
            <Typography><strong>DNI:</strong> {ultimoPlan.paciente?.persona?.dni}</Typography>
            <Typography><strong>Sexo:</strong> {ultimoPlan.paciente?.persona?.sexoBiologico?.toUpperCase()}</Typography>
            <Typography><strong>Tipo de Plan:</strong> {ultimoPlan.tipoPlan}</Typography>
            <Typography><strong>Inicio:</strong> {new Date(ultimoPlan.fechaInicio).toLocaleDateString()}</Typography>
            <Typography><strong>Fin:</strong> {new Date(ultimoPlan.fechaFin).toLocaleDateString()}</Typography>
            <Typography><strong>Observaciones:</strong> {ultimoPlan.observaciones || 'Sin observaciones'}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>Alimentos del Plan</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell>Gramos</TableCell>
                <TableCell>Calorías</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ultimoPlan.alimentos.map((alimento) => (
                <TableRow key={alimento.idAlimento}>
                  <TableCell>{alimento.nombre}</TableCell>
                  <TableCell>{alimento.grupoAlimenticio}</TableCell>
                  <TableCell>{alimento.gramos} g</TableCell>
                  <TableCell>{alimento.calorias} kcal</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TablaUltimoPlan;
