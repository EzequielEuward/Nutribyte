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
