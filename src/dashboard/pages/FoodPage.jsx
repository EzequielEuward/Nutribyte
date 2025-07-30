import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FoodTable, FoodCards, FoodFilters } from "../components";
import { DashboardLayout } from "../layout/DashboardLayout";
import { listarAlimentos } from "../../store/food/thunk";
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box, // <- importado para el padding
} from "@mui/material";

export const FoodPage = () => {
  const dispatch = useDispatch();
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
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Alimentos
        </Typography>

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
      </Box>
    </DashboardLayout>
  );
};

export default FoodPage;
