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
  IconButton
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { obtenerPlanesPorNutricionista } from "../../../store/plans";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const TablaPlanesGet = ({ onViewPlan }) => {  // Recibimos prop para ver plan
  const dispatch = useDispatch();
  const { planes, isLoading, error } = useSelector((state) => state.plan);
  const { paciente } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(obtenerPlanesPorNutricionista());
  }, [dispatch]);

  const planesDelPaciente = planes?.filter(
    (plan) => plan.idPaciente === paciente?.idPaciente
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabla de planes">
        <TableHead sx={{ bgcolor: 'background.paper' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tipo de Plan</TableCell>
            <TableCell>Fecha Inicio</TableCell>
            <TableCell>Fecha Fin</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {planesDelPaciente?.map((plan) => (
            <TableRow key={plan.idPlan} hover>
              <TableCell>{plan.idPlan}</TableCell>
              <TableCell>{plan.tipoPlan}</TableCell>
              <TableCell>
                {new Date(plan.fechaInicio).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(plan.fechaFin).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton 
                  onClick={() => onViewPlan(plan)}
                  color="primary"
                >
                  <RemoveRedEyeIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          
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