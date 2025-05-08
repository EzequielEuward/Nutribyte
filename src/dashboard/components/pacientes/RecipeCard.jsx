import React from "react";
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from "@mui/material";
import html2pdf from "html2pdf.js";

export const RecipeCard = ({ recipe, onOpenModal }) => {

  const handleDownloadPDF = () => {
    const name = recipe?.name || 'Receta';
    const plan = recipe?.plan || 'Sin plan';
    const description = recipe?.preparacion || 'Sin descripción';
    const ingredients = recipe?.ingredientes || [];
    const steps = recipe?.instrucciones || [];
    const imageUrl = recipe?.image || '';

    const element = document.createElement('div');
    element.style.padding = "20px";
    element.style.backgroundColor = "#fdfdfd";
    element.style.fontFamily = "Arial, sans-serif";
    element.style.color = "#333";
    element.style.lineHeight = "1.6";
    element.style.borderRadius = "8px";

    element.innerHTML = `
      <div style="text-align:center;margin-bottom:16px;">
        <img src="${imageUrl}" alt="Imagen de la receta" width="300" style="border-radius:8px;" crossorigin="anonymous"/>
      </div>
    
      <div style="background-color:#e3f2fd;padding:10px 15px;border-radius:5px;">
        <h2 style="margin:0;color:#0d47a1;">${name}</h2>
        <h4 style="margin:5px 0 10px;color:#1976d2;">Plan: ${plan}</h4>
      </div>
    
      <p><strong>Descripción:</strong> ${description}</p>
    
      ${ingredients.length > 0
        ? `<h4 style="color:#2e7d32;">Ingredientes:</h4><ul style="padding-left:20px;">${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>`
        : ''
      }
    
      ${steps.length > 0
        ? `<h4 style="color:#ef6c00;">Pasos:</h4>
             <div>${steps.map((s, i) => `<p><strong>${i + 1})</strong> ${s}</p>`).join('')}</div>`
        : ''
      }
    `;

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `${name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .save();
  };

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {recipe?.name || 'Receta sin nombre'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {recipe?.plan || 'Sin plan'}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        height="192"
        image={recipe?.image || '/placeholder.jpg'}
        alt={recipe?.name || 'imagen'}
        style={{ borderRadius: "4px" }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe?.description || 'Sin descripción disponible.'}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "primary.main", color: "white", "&:hover": { backgroundColor: "primary.dark" } }}
          onClick={() => onOpenModal(recipe)}
        >
          Ver detalles
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={handleDownloadPDF}
        >
          Descargar PDF
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
