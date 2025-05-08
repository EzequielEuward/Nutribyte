import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Box,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  
  const consumos = [
    {
      idConsumo: 1,
      fecha: "2025-05-07",
      consumoAlimentos: [
        {
          idAlimento: 1,
          cantidad: 100,
          alimento: {
            idAlimento: 1,
            nombre: "Arroz blanco",
            calorias: 130,
          },
        },
        {
          idAlimento: 2,
          cantidad: 50,
          alimento: {
            idAlimento: 2,
            nombre: "Pollo",
            calorias: 165,
          },
        },
      ],
    },
  ];
  
  export const TablaConsumosPaciente = ({ onEdit, onDelete }) => {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Consumos Registrados
        </Typography>
  
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Calorías totales</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consumos.map((consumo) => {
              const totalCalorias = consumo.consumoAlimentos.reduce(
                (acc, ca) =>
                  acc + ((ca?.cantidad || 0) * (ca?.alimento?.calorias || 0)) / 100,
                0
              );
  
              return (
                <TableRow key={consumo.idConsumo}>
                  <TableCell>{consumo.fecha}</TableCell>
                  <TableCell>{totalCalorias.toFixed(0)} kcal</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit?.(consumo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete?.(consumo.idConsumo)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    );
  };
  
  export default TablaConsumosPaciente;
  