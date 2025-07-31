import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FoodTable, FoodCards, FoodFilters } from "../components";
import { DashboardLayout } from "../layout/DashboardLayout";
import { listarAlimentos } from "../../store/food/thunk";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
  Tooltip,
  IconButton,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const FoodPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { alimentos, loading, error } = useSelector((state) => state.alimentos);

  const [view, setView] = useState("table");
  const [filters, setFilters] = useState({
    nombre: "",
    grupo: "",
    calorias: [0, 500],
    proteinas: [0, 50],
  });

  useEffect(() => {
    dispatch(listarAlimentos());
  }, [dispatch]);

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const gruposAlimenticios = useMemo(() => {
    const gruposSet = new Set(
      alimentos.map((a) => a.grupoAlimenticio).filter(Boolean)
    );
    return Array.from(gruposSet);
  }, [alimentos]);

  const filteredAlimentos = useMemo(() => {
    return alimentos.filter((food) => {
      const matchesNombre = food.nombre
        ?.toLowerCase()
        .includes(filters.nombre.toLowerCase());
      const matchesGrupo =
        filters.grupo === "" || food.grupoAlimenticio === filters.grupo;
      const matchesCalorias =
        food.calorias >= filters.calorias[0] &&
        food.calorias <= filters.calorias[1];
      const matchesProteinas =
        food.proteinas >= filters.proteinas[0] &&
        food.proteinas <= filters.proteinas[1];
      return (
        matchesNombre && matchesGrupo && matchesCalorias && matchesProteinas
      );
    });
  }, [alimentos, filters]);

  return (
    <DashboardLayout>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Centrar el título
          mb: 3,
          position: "relative",
        }}
      >
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              left: 0,
              backgroundColor: theme.palette.secondary.button,
              color: theme.palette.text.tertiary,
              "&:hover": {
                backgroundColor: theme.palette.primary.button,
                color: theme.palette.text.tertiary,
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>

        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Alimentos para Asesoria Nutricional
        </Typography>
      </Box>

      <FoodFilters
        onFilterChange={handleFilterChange}
        gruposDisponibles={gruposAlimenticios}
      />

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="table">Tabla</ToggleButton>
        <ToggleButton value="cards">Tarjetas</ToggleButton>
      </ToggleButtonGroup>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {filteredAlimentos.length > 0 ? (
        view === "table" ? (
          <FoodTable alimentos={filteredAlimentos} />
        ) : (
          <FoodCards alimentos={filteredAlimentos} />
        )
      ) : (
        <p>No hay alimentos disponibles.</p>
      )}

    </DashboardLayout >
  );
};

export default FoodPage;
