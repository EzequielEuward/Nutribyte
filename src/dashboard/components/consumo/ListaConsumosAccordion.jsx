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
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const ListaConsumosAccordion = ({ consumos = [], onEdit, onDelete, onAdd }) => {
  if (!Array.isArray(consumos) || consumos.length === 0) {
    return <Typography>No hay consumos registrados.</Typography>;
  }

  return (
    <Box>
      {consumos.map((consumo) => {
        const totalCalorias = (consumo.consumoAlimentos || []).reduce(
          (acc, ca) =>
            acc + ((ca?.cantidad || 0) * (ca?.alimento?.calorias || 0)) / 100,
          0
        );

        return (
          <Accordion key={consumo.idConsumo}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>
                Consumo del {consumo.fecha} — Total: {totalCalorias.toFixed(0)} kcal
              </Typography>
            </AccordionSummary>
            <AccordionDetails>

              {/* Tabla de alimentos */}
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Alimento</TableCell>
                    <TableCell>Cantidad (g)</TableCell>
                    <TableCell>Calorías</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(consumo.consumoAlimentos || []).map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.alimento?.nombre || "No disponible"}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell>
                        {(
                          (item.cantidad * item.alimento?.calorias) /
                          100
                        ).toFixed(0)}{" "}
                        kcal
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Divider si hay datos de hábitos */}
              {consumo.consumoHabitos && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Hábitos nutricionales
                  </Typography>
                  <Box sx={{ pl: 1 }}>
                    <Typography variant="body2">Semana: {consumo.consumoHabitos.semana}</Typography>
                    <Typography variant="body2">Comidas Diarias: {consumo.consumoHabitos.comidasDiarias}</Typography>
                    <Typography variant="body2">Colaciones Semanales: {consumo.consumoHabitos.colacionesSemanales}</Typography>
                    <Typography variant="body2">Bebidas Azucaradas: {consumo.consumoHabitos.bebidasAzucaradas}</Typography>
                    <Typography variant="body2">Lácteos: {consumo.consumoHabitos.lacteos}</Typography>
                    <Typography variant="body2">Semillas: {consumo.consumoHabitos.semillas}</Typography>
                    <Typography variant="body2">Observaciones: {consumo.consumoHabitos.observaciones}</Typography>
                  </Box>
                </>
              )}

              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
              >
                <Tooltip title="Agregar alimento" arrow>
                  <IconButton onClick={() => onAdd?.(consumo)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Editar consumo" arrow>
                  <IconButton onClick={() => onEdit?.(consumo)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Eliminar consumo" arrow>
                  <IconButton color="error" onClick={() => onDelete?.(consumo.idConsumo)}>
                    <DeleteIcon />
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
