import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  useTheme,
} from "@mui/material";
import html2pdf from "html2pdf.js";

const RecipeCardComponent = ({ recipe, onOpenModal, onToggleSelect, isSelected }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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
        ? `<h4 style="color:#ef6c00;">Pasos:</h4><div>${steps.map((s, i) => `<p><strong>${i + 1})</strong> ${s}</p>`).join('')}</div>`
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
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        margin: "auto",
        boxShadow: 10,
        border: `2px solid ${isDarkMode ? "#555" : "#ccc"}`,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {recipe?.name || 'Receta sin nombre'}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {recipe?.plan || 'Sin plan'}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        height="192"
        image={recipe?.image || '/placeholder.jpg'}
        alt={recipe?.name || 'imagen'}
        sx={{
          objectFit: "cover",
          width: "100%",
          maxHeight: { xs: 160, sm: 192 },
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden"
          }}
        >
          {recipe?.description || 'Sin descripción disponible.'}
        </Typography>
      </CardContent>

      <Box sx={{ px: 2, pb: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={onToggleSelect}
              color="primary"
              size="small"
            />
          }
          label={<Typography variant="caption">Seleccionar</Typography>}
          sx={{
            alignSelf: "flex-start",
            m: 0
          }}
        />
      </Box>

      <CardActions
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          mt: "auto",
          px: 2,
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            width: { xs: "100%", sm: "auto" },
            flexGrow: 1,
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={() => onOpenModal(recipe)}
          >
            Ver detalles
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleDownloadPDF}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Descargar PDF
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export const RecipeCard = React.memo(RecipeCardComponent);
export default RecipeCard;
