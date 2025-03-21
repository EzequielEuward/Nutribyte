import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { ChatInterface } from '../components/food/';
import EggAltIcon from '@mui/icons-material/EggAlt';
import { recipesMock } from "../../mock/data/mockRecipe";
import { RecipeModal, RecipeCard } from "../components";
import { Box, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Fab, } from "@mui/material";

export const RecipePage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isChatOpen, setChatOpen] = useState(false); 
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 }); 

  // Estado para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const filteredRecipes = recipesMock.filter((recipe) => {
    const hasValidName = recipe?.name && typeof recipe.name === "string";
    const matchesName = hasValidName
      ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const matchesPlan = selectedPlan ? recipe.plan === selectedPlan : true;

    return matchesName && matchesPlan;
  });

  const plans = [...new Set(recipesMock.map(recipe => recipe.plan))];

  // Función para abrir el chat con coordenadas
  const handleClickChat = (e) => {
    const { clientX, clientY } = e;
    const offsetX = 250; // Ancho del chatbot
    const offsetY = 100; // Alto del chatbot
    const maxX = window.innerWidth - offsetX - 16; // Margen del botón flotante
    const maxY = window.innerHeight - offsetY - 16;

    const x = clientX > maxX ? maxX : clientX;
    const y = clientY > maxY ? maxY : clientY;

    setChatPosition({ x, y });
    setChatOpen(true);
  };

  // Función para cerrar el chat
  const handleCloseChat = () => {
    setChatOpen(false);
  };

  return (
    <DashboardLayout>
      <Box sx={{ textAlign: "left", ml: 3, mt: 2 }}>
        <Typography variant="h4">Recetas | Platos</Typography>
      </Box>

      {/* Filtros */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 2 }}>
        {/* Filtro por nombre */}
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 200 }}
        />
        {/* Filtro por plan */}
        <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
          <InputLabel>Tipo de plan</InputLabel>
          <Select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            label="Tipo de plan"
          >
            <MenuItem value="">Todos</MenuItem>
            {plans.map((plan) => (
              <MenuItem key={plan} value={plan}>{plan}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Mensaje si no hay recetas que coincidan */}
      {filteredRecipes.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" color="textSecondary">
            No se ha encontrado ningún plan con ese nombre o esa categoría.
          </Typography>
        </Box>
      )}

      {/* Cards de recetas filtradas */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        p={2}
      >
        {filteredRecipes.map((recipe) => (
          <Box
            key={recipe.id}
            flex="1 1 calc(25% - 16px)"
            maxWidth="calc(25% - 16px)"
            minWidth="250px"
            boxSizing="border-box"
          >
            <RecipeCard recipe={recipe} onOpenModal={handleOpenModal} />
          </Box>
        ))}
      </Box>

      {/* Modal con los detalles de la receta */}
      <RecipeModal
        open={selectedRecipe !== null}
        onClose={handleCloseModal}
        recipe={selectedRecipe || {}}
      />

      {/* Botón flotante para el chatbot */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleClickChat}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <EggAltIcon />
      </Fab>

      {/* Usar el componente Chatbot */}
      <ChatInterface isOpen={isChatOpen} onClose={handleCloseChat} />
    </DashboardLayout>
  );
};

export default RecipePage
