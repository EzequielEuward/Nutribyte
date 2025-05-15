import { useTheme } from "@mui/material/styles";
import { Fab, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const TopLeftActionButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isDark = theme.palette.mode === "dark";
  const fabColor = isDark ? "secondary" : "primary";

  const handleClick = () => {
    navigate(-1); 
  };

  return (
    <Tooltip title="Volver atrás" arrow>
      <Fab
        color={fabColor}
        size="small"
        onClick={handleClick}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1500,
          boxShadow: 3,
        }}
      >
        <ArrowBackIcon />
      </Fab>
    </Tooltip>
  );
};

export default TopLeftActionButton;
