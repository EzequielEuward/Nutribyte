import React from "react";
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from "@mui/material";

export const RecipeCard = ({ recipe, onOpenModal }) => {
  return (
    <Card style={{ width: "100%" }}>
        
      <CardContent>
        <Typography variant="h5" component="div">
          {recipe.name} 
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {recipe.plan}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="192"
        image={recipe.image}
        alt={recipe.name}   
        style={{ borderRadius: "4px" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center", // Centra horizontalmente
          alignItems: "center",    // Centra verticalmente
        }}
      >
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "primary.main", // Usa el color del tema
            color: "white",                  // Asegura que el texto sea visible
            "&:hover": {
              backgroundColor: "primary.dark", // Color para hover, derivado del tema
            },
          }}
          onClick={() => onOpenModal(recipe)}
        >
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
