import { useEffect, useState } from "react";
import { Fab, Zoom, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = theme.palette.mode === "dark";

  return (
    <Zoom in={showButton}>
      <Fab
        onClick={scrollToTop}
        sx={{
          width: 45,   // default small is 40px → ahora +5px
          height: 45,
          position: "fixed",
          bottom: { xs: 80, sm: 24, md: 30 },
          right: 24,
          zIndex: 1600,
          boxShadow: 3,
          backgroundColor: isDark ? theme.palette.secondary.main : theme.palette.primary.main,
          color: "#fff",
          "&:hover": {
            backgroundColor: isDark
              ? theme.palette.secondary.dark
              : theme.palette.primary.dark,
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
