import { useEffect, useRef } from "react";
import Slider from "react-slick";
import { Box, Typography, useTheme, Container } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const slides = [
    {
        title: "Planificá tu nutrición",
        description: "Diseñá planes alimenticios personalizados para cada paciente.",
        image: "/slider2.png",
    },
    {
        title: "Seguimiento en tiempo real",
        description: "Monitoreá el progreso y ajustá los planes según evolución.",
        image: "/slider1.png",
    },
];

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <Box
            onClick={onClick}
            sx={{
                display: { xs: "none", sm: "flex" },
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                width: 48,
                height: 48,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 3,
                '&:hover': {
                    bgcolor: 'primary.dark',
                },
            }}
        >
            <ArrowForwardIosIcon />
        </Box>
    );
};

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <Box
            onClick={onClick}
            sx={{
                display: { xs: "none", sm: "flex" },
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                width: 48,
                height: 48,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 3,
                '&:hover': {
                    bgcolor: 'primary.dark',
                },
            }}
        >
            <ArrowBackIosIcon />
        </Box>
    );
};

export const SliderSection = () => {
    const theme = useTheme();
    const sliderRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && sliderRef.current) {
                    sliderRef.current.slickGoTo(0); // Forzar recálculo cuando aparece
                }
            },
            { threshold: 0.3 }
        );

        const section = document.getElementById("slider");
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);
    // 🔄 Forzar resize para corregir desajustes en mobile
    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 300);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, md: 6 },
            }}
        >
            <Container maxWidth="lg">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column-reverse", md: "row" },
                                alignItems: "center",
                                gap: 4,
                                px: { xs: 1, sm: 3, md: 6 },
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{ flex: 1 }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 2,
                                        color: theme.palette.text.primary,
                                        textAlign: { xs: "center", md: "left" },
                                        fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                                    }}
                                >
                                    {slide.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        textAlign: { xs: "center", md: "left" },
                                        px: { xs: 1, md: 0 },
                                    }}
                                >
                                    {slide.description}
                                </Typography>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={slide.image}
                                    alt={slide.title}
                                    sx={{
                                        maxWidth: "100%",
                                        borderRadius: 4,
                                        boxShadow: 3,
                                        height: { xs: 240, sm: 340, md: 480 },
                                        objectFit: "cover",
                                    }}
                                />
                            </motion.div>
                        </Box>
                    ))}
                </Slider>
            </Container>
        </Box>
    );
};

export default SliderSection;
