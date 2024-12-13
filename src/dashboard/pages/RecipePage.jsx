import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { recipesMock } from "../../mock/data/mockRecipe";
import { RecipeModal, RecipeCard } from "../components";
import { Box, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export const RecipePage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Estado para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  // Filtrado de recetas
  const filteredRecipes = recipesMock.filter((recipe) => {
    const matchesName = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan ? recipe.plan === selectedPlan : true;
    return matchesName && matchesPlan;
  });

  // Obtener todos los planes únicos de las recetas
  const plans = [...new Set(recipesMock.map(recipe => recipe.plan))];

  return (
    <DashboardLayout>
      <Box sx={{ textAlign: "left", ml: 3, mt: 2 }}>
        <Typography variant="h4">Recetas | Platos </Typography>
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
          sx={{ width: 200 }} // Ancho más pequeño
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
            sx={{
              "@media (max-width: 1024px)": {
                flex: "1 1 calc(33.33% - 16px)",
                maxWidth: "calc(33.33% - 16px)",
              },
              "@media (max-width: 768px)": {
                flex: "1 1 calc(50% - 16px)",
                maxWidth: "calc(50% - 16px)",
              },
              "@media (max-width: 480px)": {
                flex: "1 1 100%",
                maxWidth: "100%",
              },
            }}
          >
            <RecipeCard recipe={recipe} onOpenModal={handleOpenModal} />
          </Box>
        ))}
      </Box>

      {selectedRecipe && (
        <RecipeModal
          open={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
        />
      )}
    </DashboardLayout>
  );
};

export default RecipePage;
