import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, CardHeader, Typography, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { toggleFavorito } from "../../../store/food";

// Función para asignar colores a los grupos
const getGroupColor = (group) => {
  const colors = {
    Frutas: "#FFEB3B", // Amarillo
    Verduras: "#4CAF50", // Verde
    Legumbres: "#FF9800", // Naranja
    Cereales: "#2196F3", // Azul
    Lácteos: "#9C27B0", // Púrpura
    Carnes: "#F44336", // Rojo
  };
  return colors[group] || "#607D8B"; // Color gris por defecto
};

export const FoodCards = ({ alimentos }) => {
  const dispatch = useDispatch();
  const favoritosRedux = useSelector((state) => state.alimentos.favoritos);

  const handleFavoriteClick = (food) => {
    dispatch(toggleFavorito(food));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Tarjetas de alimentos */}
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {alimentos.map((food) => (
          <Card
            key={food.idAlimento}
            sx={{
              overflow: "hidden",
              height: "100%",
              borderLeft: `8px solid ${getGroupColor(food.grupoAlimenticio)}`,
            }}
          >
            <CardHeader
              sx={{ p: 2, pb: 1 }}
              action={
                <IconButton
                  onClick={() => handleFavoriteClick(food)}
                  aria-label="favorite"
                  color={
                    favoritosRedux.some(
                      (fav) => fav.idAlimento === food.idAlimento
                    )
                      ? "error"
                      : "default"
                  }
                >
                  {favoritosRedux.some(
                    (fav) => fav.idAlimento === food.idAlimento
                  ) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              }
            />
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                {food.nombre}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.875rem", color: "text.secondary" }}
              >
                {food.calorias} kcal
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Proteínas:</strong> {food.proteinas} g
                </Typography>
                <Typography variant="body2">
                  <strong>Carbohidratos:</strong> {food.carbohidratos} g
                </Typography>
                <Typography variant="body2">
                  <strong>Grasas Totales:</strong> {food.grasasTotales} g
                </Typography>
                <Typography variant="body2">
                  <strong>Fibra:</strong> {food.fibraDietetica} g
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FoodCards;
