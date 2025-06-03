import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Box,
  Grid,
  Divider,
  Paper,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from 'react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useSelector } from "react-redux";

export const ListaConsumosAccordion = ({ consumos = [], onEdit, onDelete, onAdd }) => {
  const theme = useTheme();
  const [copiado, setCopiado] = useState(false);
  const { uid: idUser } = useSelector((state) => state.auth);

  if (!Array.isArray(consumos) || consumos.length === 0) {
    return (
      <Typography variant="body1" align="center" color="text.secondary">
        No hay consumos registrados.
      </Typography>
    );
  }

  return (
    <Box>
      {consumos.map((consumo) => {
        const totalCalorias = (consumo.consumoAlimentos || []).reduce(
          (acc, ca) => acc + ((ca?.cantidad || 0) * (ca?.alimento?.calorias || 0)) / 100,
          0
        );

        return (
          <Accordion key={consumo.idConsumo} sx={{ mb: 1, bgcolor: theme.palette.background.paper }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocalDiningIcon sx={{ color: theme.palette.text.primary }} />
                <Typography fontWeight={600} color={theme.palette.text.primary}>
                  Consumo del {consumo.fecha} — Total: {totalCalorias.toFixed(0)} kcal
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {/* Tabla de alimentos */}
              <Table size="small" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Alimento</strong></TableCell>
                    <TableCell><strong>Cantidad (g)</strong></TableCell>
                    <TableCell><strong>Calorías</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(consumo.consumoAlimentos || []).map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.alimento?.nombre || "No disponible"}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell>
                        {((item.cantidad * item.alimento?.calorias) / 100).toFixed(0)} kcal
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Datos de hábitos */}
              {consumo.consumoHabitos && (
                <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: theme.palette.background.paper2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <FactCheckIcon sx={{ color: theme.palette.text.primary }} />
                    <Typography variant="subtitle1" fontWeight={600} color={theme.palette.text.primary}>
                      Hábitos nutricionales
                    </Typography>
                  </Box>
                  <Table size="small">
                    <TableBody>
                      {[
                        { label: 'Semana', value: consumo.consumoHabitos.semana },
                        { label: 'Comidas Diarias', value: consumo.consumoHabitos.comidasDiarias },
                        { label: 'Colaciones Diarias', value: consumo.consumoHabitos.colacionesDiarias },
                        { label: 'Bebidas', value: consumo.consumoHabitos.bebidas },
                        { label: 'Lácteos', value: consumo.consumoHabitos.lacteos },
                        { label: 'Cereales', value: consumo.consumoHabitos.cereales },
                        { label: 'Proteínas', value: consumo.consumoHabitos.proteinas },
                        { label: 'Semillas', value: consumo.consumoHabitos.semillas },
                        { label: 'Frutas', value: consumo.consumoHabitos.frutas },
                        { label: 'Aceites y Grasas', value: consumo.consumoHabitos.aceitesGrasas },
                        { label: 'Condimentos', value: consumo.consumoHabitos.condimentos },
                        { label: 'Dulces', value: consumo.consumoHabitos.dulces },
                        { label: 'Extras', value: consumo.consumoHabitos.extras },
                        { label: 'Observaciones', value: consumo.consumoHabitos.observaciones },
                      ].map(({ label, value }, index) => (
                        <TableRow key={index}>
                          <TableCell><strong>{label}</strong></TableCell>
                          <TableCell>{value || '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )}

              {/* Acciones */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 1 }}>
                <Tooltip title="Agregar alimento" arrow>
                  <IconButton onClick={() => onAdd?.(consumo)} color="primary">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar consumo" arrow>
                  <IconButton onClick={() => onEdit?.(consumo)} color="warning">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar consumo" arrow>
                  <IconButton color="error" onClick={() => onDelete?.(consumo.idConsumo)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    consumo.consumoHabitos
                      ? "Editar hábitos nutricionales"
                      : "Completar hábitos nutricionales"
                  }
                  arrow
                >
                  <IconButton
                    sx={{
                      bgcolor: theme.palette.custom.secondary,
                      color: theme.palette.text.primary,
                      '&:hover': { bgcolor: theme.palette.custom.primary },
                      px: 2,
                      borderRadius: 2,
                    }}
                    onClick={() => {
                      const url = `http://nutribyte.netlify.app/habitos-y-consumos?idUser=${idUser}&idPaciente=${consumo.idPaciente}&idConsumo=${consumo.idConsumo}`;
                      navigator.clipboard.writeText(url);
                      window.open(url, "_blank");
                    }}
                  >
                    <AddIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {consumo.consumoHabitos ? "Editar hábitos" : "Cargar hábitos"}
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default ListaConsumosAccordion;