import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorito } from "../../../store/food";

const CARD_WIDTH = 320;
const CARD_HEIGHT = 240;
const GAP = 16;

// Colores por grupo
const getGroupColor = (group) => {
  const colors = {
    Frutas: "#FFEB3B",    // Amarillo
    Verduras: "#4CAF50",  // Verde
    Legumbres: "#FF9800", // Naranja
    Cereales: "#2196F3",  // Azul
    Lácteos: "#9C27B0",   // Púrpura
    Carnes: "#F44336",    // Rojo
  };
  return colors[group] || "#607D8B"; // Gris por defecto
};

export const FoodCards = ({ alimentos }) => {
  const dispatch = useDispatch();
  const favoritosRedux = useSelector((state) => state.alimentos.favoritos);

  const handleFavoriteClick = (food) => {
    dispatch(toggleFavorito(food));
  };

  // Cada celda de la grilla
  const Cell = ({ columnIndex, rowIndex, style, data }) => {
    const index = rowIndex * data.columns + columnIndex;
    if (index >= data.items.length) return null;
    const food = data.items[index];
    const isFav = favoritosRedux.some((f) => f.idAlimento === food.idAlimento);

    return (
      <Box style={{ ...style, padding: GAP / 2 }}>
        <Card
          sx={{
            height: "100%",
            borderLeft: `8px solid ${getGroupColor(food.grupoAlimenticio)}`,
          }}
        >
          <CardHeader
            sx={{ p: 2, pb: 1 }}
            action={
              <IconButton
                onClick={() => handleFavoriteClick(food)}
                color={isFav ? "error" : "default"}
              >
                {isFav ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            }
          />
          <CardContent sx={{ p: 2 }}>
            <Tooltip title={food.nombre} placement="top">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  display: "block",
                }}
              >
                {food.nombre}
              </Typography>
            </Tooltip>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {food.calorias} kcal
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2"><strong>Proteínas:</strong> {food.proteinas} g</Typography>
              <Typography variant="body2"><strong>Carbohidratos:</strong> {food.carbohidratos} g</Typography>
              <Typography variant="body2"><strong>Grasas Totales:</strong> {food.grasasTotales} g</Typography>
              <Typography variant="body2"><strong>Fibra:</strong> {food.fibraDietetica} g</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, height: '80vh', px: 2 }}>
      <AutoSizer>
        {({ height, width }) => {
          const columns = Math.max(1, Math.floor(width / (CARD_WIDTH + GAP)));
          const rows = Math.ceil(alimentos.length / columns);
          return (
            <Grid
              columnCount={columns}
              columnWidth={CARD_WIDTH + GAP}
              height={height}
              rowCount={rows}
              rowHeight={CARD_HEIGHT + GAP}
              width={width}
              itemData={{ items: alimentos, columns }}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </Box>
  );
};

export default FoodCards;
