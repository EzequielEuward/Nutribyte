import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Avatar,
    Chip,
    IconButton,
    Divider,
    Modal,
    Paper,
} from "@mui/material";
import CallMergeIcon from '@mui/icons-material/CallMerge';
import {
    Signpost as SignpostIcon,
    GitHub as GitHubIcon,
    AccessTime as AccessTimeIcon,
    Search as SearchIcon,
    CalendarToday as CalendarTodayIcon,
    RotateLeft as RotateLeftIcon,
    MoreHoriz as MoreHorizontal,
} from "@mui/icons-material";
import DashboardLayout from "../layout/DashboardLayout";
import { getMockVersions } from "../../mock/data/mockVersiones";
import Swal from "sweetalert2";
import { useTheme } from "@emotion/react";

export const VersionPage = () => {
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [filter, setFilter] = useState("all");
    const [openModal, setOpenModal] = useState(false);

    const theme = useTheme();

    useEffect(() => {
        const fetchVersions = async () => {
            const data = await getMockVersions();
            setVersions(data);
        };
        fetchVersions();
    }, []);

    const handleGitHubClick = () => {
        window.open("https://github.com/EzequielEuward/Sintacc", "_blank");
    };

    const handleUpdateVersion = () => {
        setOpenModal(true);
    };

    const confirmUpdate = () => {
        setOpenModal(false);
        Swal.fire({
            title: "¡Versión actualizada a la ultima!",
            text: "Oops tiene la versión actualizada",
            icon: "warning",
        });
    };


    const handleVersionSelect = (versionId) => {
        setSelectedVersion((prev) => (prev === versionId ? null : versionId));
    };

    const filteredVersions = versions.filter((version) => {
        if (filter === "all") return true;
        return version.status === filter;
    });

    const renderStatusChip = (status) => {
        switch (status) {
            case "stable":
                return <Chip label="Estable" color="success" size="small" />;
            case "prerelease":
                return <Chip label="Prelanzamiento" color="warning" size="small" />;
            case "obsolete":
                return <Chip label="Obsoleta" color="error" size="small" />;
            default:
                return <Chip label="Desconocido" size="small" />;
        }
    };

    return (
        <DashboardLayout>
            <Box sx={{ p: 3, pt: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h5" fontWeight={700}>
                        Historial de Versiones
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={
                                    <GitHubIcon
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                }
                                onClick={handleGitHubClick}
                                sx={{
                                    color: theme.palette.text.primary,
                                    borderColor: theme.palette.primary.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.main,
                                        borderColor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Revisar Rama
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<CallMergeIcon sx={{ width: 16, height: 16 }} />}
                                onClick={handleUpdateVersion}
                                sx={{
                                    color: "white",
                                    backgroundColor: theme.palette.secondary.button,
                                    borderColor: theme.palette.primary.button,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.button,
                                        borderColor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Actualizar versión
                            </Button>
                        </Box >
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Filtro</InputLabel>
                            <Select value={filter} label="Filtro" onChange={(e) => setFilter(e.target.value)}>
                                <MenuItem value="all">Todas</MenuItem>
                                <MenuItem value="stable">Estables</MenuItem>
                                <MenuItem value="prerelease">Prelanzamiento</MenuItem>
                                <MenuItem value="obsolete">Obsoletas</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* Listado de versiones */}
                <Box
                    sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        p: 2,
                    }}
                >
                    {filteredVersions.map((version) => {
                        const isSelected = selectedVersion === version.id;
                        return (
                            <Box
                                key={version.id}
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 2,

                                    backgroundColor: isSelected
                                        ? theme.palette.action.hover
                                        : theme.palette.background.paper,
                                    color: theme.palette.text.primary,
                                }}
                                onClick={() => handleVersionSelect(version.id)}
                            >
                                {/* Encabezado de la versión */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 1,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Avatar src={version.authorAvatar} sx={{ width: 40, height: 40, bgcolor: "grey.300" }}>
                                            {version.authorInitials}
                                        </Avatar>
                                        <Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Typography variant="body1" fontWeight={600}>
                                                    {version.id}
                                                </Typography>
                                                {renderStatusChip(version.status)}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {version.shortDescription}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                        }}
                                    >
                                        <MoreHorizontal />
                                    </IconButton>
                                </Box>

                                {/* Sección expandida con detalles */}
                                {isSelected && (
                                    <Box sx={{ mt: 2 }}>
                                        <Divider sx={{ mb: 2 }} />
                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                                                gap: 2,
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="caption">Fecha</Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <CalendarTodayIcon sx={{ width: 16, height: 16, color: theme.palette.text.secondary }} />
                                                    <Typography variant="body2">{version.date}</Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption">Hora</Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <AccessTimeIcon sx={{ width: 16, height: 16, color: "grey.600" }} />
                                                    <Typography variant="body2">{version.time}</Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption">Autor</Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Avatar src={version.authorAvatar} alt={version.author} sx={{ width: 24, height: 24 }} />
                                                    <Typography variant="body2">{version.author}</Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption">Cambios</Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <GitHubIcon sx={{ width: 16, height: 16, color: "grey.600" }} />
                                                    <Typography variant="body2">{version.changes} archivos</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body2">{version.longDescription}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>

                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Paper sx={{ p: 3, maxWidth: 400, margin: "auto", mt: 10, textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700}>Precaución</Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        La actualización de la versión puede influir en el rendimiento o causar fallos inesperados. La pagina quedara inactiva por un tiempo para actualizarla!
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={confirmUpdate}
                    >
                        Hacer Actualización
                    </Button>
                </Paper>
            </Modal>
        </DashboardLayout>
    );
};

export default VersionPage;
