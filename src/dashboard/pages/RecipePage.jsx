import { useCallback, useMemo, useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { ChatInterface } from '../components/food/';
import EggAltIcon from '@mui/icons-material/EggAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { recipesMock } from "../../mock/data/mockRecipe";
import { RecipeModal, RecipeCard } from "../components";
import {
  Box, Typography, TextField, MenuItem,
  Select, InputLabel, FormControl, Fab, Button, useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from "react-router-dom";

export const RecipePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isChatOpen, setChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [selectedRecipesIds, setSelectedRecipesIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const toggleRecipeSelection = useCallback((id) => {
    setSelectedRecipesIds(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  }, []);


  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const filteredRecipes = useMemo(() => {
    return recipesMock.filter((recipe) => {
      const hasValidName = recipe?.name && typeof recipe.name === "string";
      const matchesName = hasValidName
        ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
      const matchesPlan = selectedPlan ? recipe.plan === selectedPlan : true;
      return matchesName && matchesPlan;
    });
  }, [searchTerm, selectedPlan]);
  const plans = [...new Set(recipesMock.map(recipe => recipe.plan))];

  const handleClickChat = (e) => {
    const { clientX, clientY } = e;
    const offsetX = 250;
    const offsetY = 100;
    const maxX = window.innerWidth - offsetX - 16;
    const maxY = window.innerHeight - offsetY - 16;
    const x = clientX > maxX ? maxX : clientX;
    const y = clientY > maxY ? maxY : clientY;
    setChatPosition({ x, y });
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };


  const handleDownloadSelectedRecipes = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const selected = filteredRecipes.filter(r => selectedRecipesIds.includes(r.id));

    for (let i = 0; i < selected.length; i++) {
      const recipe = selected[i];
      const name = recipe?.name || 'Receta';
      const plan = recipe?.plan || 'Sin plan';
      const description = recipe?.preparacion || 'Sin descripción';
      const ingredients = recipe?.ingredientes || [];
      const steps = recipe?.instrucciones || [];
      const imageUrl = recipe?.image || '';

      const isImageCorsSafe = (url) =>
        url.startsWith(window.location.origin) || url.startsWith('data:image/');

      const imageHtml = isImageCorsSafe(imageUrl)
        ? `<img src="${imageUrl}" alt="Imagen" width="200" crossorigin="anonymous" />`
        : `<p style="color:gray;"><em>Imagen no disponible por restricciones externas</em></p>`;

      const element = document.createElement('div');
      element.style.padding = "20px";
      element.style.backgroundColor = "#fff";
      element.style.width = "600px";
      element.style.fontFamily = "Arial, sans-serif";
      element.innerHTML = `
      <div style="text-align:center;margin-bottom:16px;">
        ${imageHtml}
      </div>
      <h2 style="color:#1976d2;">${name}</h2>
      <h4>Plan: ${plan}</h4>
      <p><strong>Descripción:</strong> ${description}</p>
      <h4>Ingredientes:</h4>
      <ul>${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <h4>Pasos:</h4>
      ${steps.map((s, idx) => `<p><strong>${idx + 1})</strong> ${s}</p>`).join('')}
    `;

      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.top = '0';
      document.body.appendChild(element);

      try {
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      } catch (error) {
        console.error('Error al generar PDF de receta:', name, error);
      } finally {
        document.body.removeChild(element);
      }
    }

    pdf.save('recetas_seleccionadas.pdf');
    setSelectedRecipesIds([]);
  };


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
          Recetas | Platos
        </Typography>
      </Box>

      {/* Filtros */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          p: 2,
          mt: 4,
          mb: 2,
          height: 40
        }}
      >
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 200 }}
        />
        <FormControl variant="outlined" size="small" sx={{ width: 200, }}>
          <InputLabel>Tipo de plan</InputLabel>
          <Select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            label="Tipo de plan"
            sx={{ height: "100%" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 350,
                },
              },
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            {plans.map((plan) => (
              <MenuItem key={plan} value={plan}>{plan}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedRecipesIds.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownloadSelectedRecipes}
            sx={{
              position: 'fixed',
              bottom: isChatOpen ? 44 : 90,
              backgroundColor: theme.palette.secondary.button,
              color: theme.palette.text.buscar,
              right: isChatOpen ? 88 : 24,
              zIndex: 1300,
              boxShadow: 4,
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            Descargar seleccionadas
          </Button>
        )}
      </Box>


      {filteredRecipes.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" color="textSecondary">
            No se ha encontrado ningún plan con ese nombre o esa categoría.
          </Typography>
        </Box>
      )}

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(auto-fill, minmax(250px, 1fr))'
        }}
        gap={2}
        p={2}
      >
        {filteredRecipes.map((recipe) => (
          <Box
            key={recipe.id}
            sx={{ height: "100%" }}
          >
            <RecipeCard
              recipe={recipe}
              onOpenModal={handleOpenModal}
              isSelected={selectedRecipesIds.includes(recipe.id)}
              onToggleSelect={() => toggleRecipeSelection(recipe.id)}
            />
          </Box>
        ))}
      </Box>

      <RecipeModal
        open={selectedRecipe !== null}
        onClose={handleCloseModal}
        recipe={selectedRecipe || {}}
      />

      <Fab
        aria-label="chat"
        onClick={handleClickChat}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: theme.palette.secondary.button,
          '&:hover': {
            backgroundColor: theme.palette.primary.button,
          },
          color: '#fff',
        }}
      >
        <EggAltIcon />
      </Fab>

      <ChatInterface isOpen={isChatOpen} onClose={handleCloseChat} />
    </DashboardLayout>
  );
};

export default RecipePage;
