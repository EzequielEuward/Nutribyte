import { Drawer, Box, Typography, IconButton, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const FoodDrawer = ({ open, onClose, data }) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 300, p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6">{data.nombre}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography>Group: {data.grupo}</Typography>
                <Typography>Calories: {data.calorias}</Typography>
                <Typography>Proteins: {data.proteinas}</Typography>
                <Typography>Carbohydrates: {data.carbohidratos}</Typography>
                <Typography>Fats: {data.grasas}</Typography>
            </Box>
        </Drawer>
    );
};

export default FoodDrawer;
