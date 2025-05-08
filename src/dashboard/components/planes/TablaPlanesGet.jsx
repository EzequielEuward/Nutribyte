import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Tooltip,
  IconButton
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { obtenerPlanesPorNutricionista } from "../../../store/plans";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const TablaPlanesGet = ({ onViewPlan, onDeletePlan, onEditPlan }) => {
  const dispatch = useDispatch();
  const { planes, isLoading, error } = useSelector((state) => state.plan);
  const { paciente } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(obtenerPlanesPorNutricionista());
  }, [dispatch]);

  const planesDelPaciente = planes?.filter(
    (plan) => plan.idPaciente === paciente?.idPaciente
  );

  const handleEliminarPlan = (idPlan) => {
    if (onDeletePlan) {
      onDeletePlan(idPlan);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabla de planes">
        <TableHead sx={{ bgcolor: 'background.paper' }}>
          <TableRow>
            <TableCell>Tipo de Plan</TableCell>
            <TableCell>Fecha Inicio</TableCell>
            <TableCell>Fecha Fin</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {planesDelPaciente?.map((plan) => {
            const hoy = new Date();
            const fechaFin = new Date(plan.fechaFin);
            const vencido = fechaFin < hoy;

            return (
              <TableRow key={plan.idPlanAlimento}>
                <TableCell>{plan.tipoPlan}</TableCell>
                <TableCell>{new Date(plan.fechaInicio).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(plan.fechaFin).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Tooltip title="Ver Plan" arrow>
                    <IconButton onClick={() => onViewPlan(plan)} color="primary">
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title={vencido ? "Este plan ya finalizó. Debe crear uno nuevo." : "Editar Plan"}
                    arrow
                  >
                    <span>
                      <IconButton
                        color="secondary"
                        onClick={() => onEditPlan(plan)}
                        disabled={vencido}
                        sx={{ opacity: vencido ? 0.4 : 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip title="Eliminar Plan" arrow>
                    <IconButton color="error" onClick={() => handleEliminarPlan(plan.idPlanAlimento)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}

          {planesDelPaciente?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No se encontraron planes para este paciente
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaPlanesGet;
