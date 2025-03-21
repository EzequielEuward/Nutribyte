import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, CardHeader, Typography, IconButton, Badge } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { toggleFavorito } from "../../../store/food";

// Función para determinar el color del badge según el grupo alimenticio
function getBadgeVariant(grupo) {
  if (grupo.includes("Frutas")) return "default";
  if (grupo.includes("Verduras")) return "success";
  if (grupo.includes("Legumbres")) return "warning";
  return "secondary";
}

export const FoodCards = ({ alimentos }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.alimentos.favoritos);

  const handleFavoriteClick = (food) => {
    dispatch(toggleFavorito(food));
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: 4,
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {alimentos.map((food) => (
        <Card key={food.idAlimento} sx={{ overflow: "hidden", height: "100%" }}>
          <CardHeader
            sx={{ p: 2, pb: 1 }}
            action={
              <IconButton
                onClick={() => handleFavoriteClick(food)}
                aria-label="favorite"
                color={
                  favorites.some(
                    (fav) => fav.idAlimento === food.idAlimento
                  )
                    ? "error"
                    : "default"
                }
              >
                {favorites.some((fav) => fav.idAlimento === food.idAlimento) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            }
          />
          <CardContent sx={{ p: 2 }}>
            <Badge
              variant={getBadgeVariant(food.grupoAlimenticio)}
              sx={{
                mb: 1,
                fontSize: "0.8rem",
                display: "inline-block",
                p: 1,
              }}
            >
              {food.grupoAlimenticio.split(",")[0]}
            </Badge>
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
  );
};

export default FoodCards;
