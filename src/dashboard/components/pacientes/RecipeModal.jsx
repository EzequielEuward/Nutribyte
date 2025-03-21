import React, { useEffect, useRef } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Typography } from "@mui/material";

export const RecipeModal = ({ open, onClose, recipe }) => {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{recipe?.name || "Receta sin nombre"}</DialogTitle>

      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Typography variant="h6">Preparación:</Typography>
          {recipe.preparacion || "Información no disponible."}

          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Tipo de Plan:
          </Typography>
          {recipe.tipoplan || "Información no disponible."}

          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Macronutrientes:
          </Typography>
          {recipe.macronutrientes ? (
            <>
              Calorías: {recipe.macronutrientes.calorias || "No disponible"} kcal
              <br />
              Proteínas: {recipe.macronutrientes.proteinas || "No disponible"} g
              <br />
              Carbohidratos: {recipe.macronutrientes.carbohidratos || "No disponible"} g
              <br />
              Grasas: {recipe.macronutrientes.grasas || "No disponible"} g
            </>
          ) : (
            <Typography variant="body1">Macronutrientes no disponibles.</Typography>
          )}

          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Ingredientes:
          </Typography>
          {recipe.ingredientes && recipe.ingredientes.length > 0 ? (
            <ul>
              {recipe.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No hay ingredientes disponibles.</Typography>
          )}

          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Instrucciones:
          </Typography>
          {recipe.instrucciones && recipe.instrucciones.length > 0 ? (
            <ol>
              {recipe.instrucciones.map((instruccion, index) => (
                <li key={index}>{instruccion}</li>
              ))}
            </ol>
          ) : (
            <Typography variant="body1">No hay instrucciones disponibles.</Typography>
          )}
        </DialogContentText>
        <img
          src={recipe.image || "https://via.placeholder.com/350x192"}
          alt={recipe.name}
          style={{ width: "100%", borderRadius: "4px", marginTop: "16px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeModal;
