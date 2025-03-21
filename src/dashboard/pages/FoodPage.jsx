import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FoodTable, FoodCards } from "../components";
import { DashboardLayout } from "../layout/DashboardLayout";
import { listarAlimentos } from "../../store/food/thunk";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

export const FoodPage = () => {
  const dispatch = useDispatch();
  const { alimentos, loading, error } = useSelector((state) => state.alimentos);
  // Estado para alternar entre vista de tabla y vista de tarjetas
  const [view, setView] = useState("table");

  useEffect(() => {
    dispatch(listarAlimentos());
  }, [dispatch]);

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Alimentos
      </Typography>

      {/* Toggle para elegir vista */}
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
      {alimentos.length > 0 ? (
        view === "table" ? (
          <FoodTable alimentos={alimentos} />
        ) : (
          <FoodCards alimentos={alimentos} />
        )
      ) : (
        <p>No hay alimentos disponibles.</p>
      )}
    </DashboardLayout>
  );
};

export default FoodPage;
