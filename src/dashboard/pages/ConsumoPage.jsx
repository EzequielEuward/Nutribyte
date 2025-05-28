import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
    Box,
    Container,
    Divider,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
    Tooltip,
    IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../layout/DashboardLayout";

import { listarPacientes } from "../../store/patient/";
import { buscarPacientePorDni, listarConsumosPorUsuario, crearConsumo, eliminarConsumo, editarConsumo, listarConsumosPorPaciente } from "../../store/consumo/thunk";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ScrollToTopButton } from "../../home/components";
import { TablaConsumosPaciente, FormularioNuevoConsumo, ListaConsumosAccordion, FormularioEditarConsumo, TablaConsumo } from "../components/consumo/";


import { PatientSearchCard } from "../components/planes/"
import { ConsejosRapidos, PatientInfoCardConsulta } from "../components/consultas/";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

export const ConsumoPage = () => {

    const dispatch = useDispatch();
    const methods = useForm();
    const theme = useTheme()
    const navigate = useNavigate()
    const pacientesList = useSelector(state => state.patients.pacientes || []);
    const { consumos, isLoading, error } = useSelector((state) => state.consumo);
    const { uid: idUser } = useSelector((state) => state.auth);

    //Manejo de estados
    const [dni, setDni] = useState("");
    const [step, setStep] = useState("busqueda");
    const [paciente, setPaciente] = useState(null);
    const [activeTab, setActiveTab] = useState("consumos");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedConsumo, setSelectedConsumo] = useState(null);
    const ultimoConsumo = consumos.length > 0 ? consumos[consumos.length - 1] : null;


    //Manejo de efectos
    useEffect(() => {
        dispatch(listarPacientes());

        dispatch(listarConsumosPorUsuario())

    }, [dispatch]);

    useEffect(() => {
        if (paciente) {
            setStep('creacion');
            methods.reset({
                ...methods.getValues(),
            });
        }
    }, [paciente]);

    const handleOpenEdit = (consumo) => {
        setSelectedConsumo(consumo);
        setEditModalOpen(true);
    };



    const buscarPaciente = () => {
        const dniValido = dni.trim();

        if (!dniValido || !/^\d{7,8}$/.test(dniValido)) {
            Swal.fire({
                icon: 'warning',
                title: 'DNI inválido',
                text: 'Ingrese un DNI válido (7 u 8 dígitos)',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        dispatch(buscarPacientePorDni(dniValido))
            .unwrap()
            .then((pac) => {
                setPaciente(pac); // ✅ setear paciente
                setStep("creacion");
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al buscar paciente',
                    text: error.message || "Ocurrió un error inesperado",
                    confirmButtonText: 'Aceptar'
                });
            });
    };

    //POST CONSUMO
    const handleCrearConsumo = async (data, resetForm) => {
        if (!paciente?.idPaciente) return;

        if (!data.consumoAlimentos.length) {
            Swal.fire("Atención", "Debe agregar al menos un alimento", "warning");
            return;
        }

        const payload = {
            idPaciente: paciente.idPaciente,
            fecha: data.fecha,
            consumoAlimentos: data.consumoAlimentos.map((a) => ({
                idAlimento: Number(a.idAlimento),
                cantidad: Number(a.cantidad),
            })),
        };

        try {
            await dispatch(crearConsumo(payload)).unwrap();
            Swal.fire("¡Guardado!", "El consumo fue registrado correctamente", "success");
            resetForm(); // limpia el formulario
            dispatch(listarConsumosPorPaciente(paciente.idPaciente));
        } catch (err) {
            Swal.fire("Error", err.message || "No se pudo registrar el consumo", "error");
        }
    };

    const handleEditarConsumo = async ({ idConsumo, idPaciente, fecha, consumoAlimentos = [] }) => {
        const consumoPayload = {
            idConsumo,
            idPaciente,
            fecha,
            consumoAlimentos: consumoAlimentos.map((a) => ({
                idConsumo,
                idAlimento: Number(a.idAlimento),
                cantidad: Number(a.cantidad),
            })),
        };

        try {
            await dispatch(editarConsumo({ idConsumo, consumo: consumoPayload })).unwrap();

            // 🔁 Esperá a que se actualice antes de cerrar el modal
            const action = await dispatch(listarConsumosPorPaciente(idPaciente));
            if (listarConsumosPorPaciente.fulfilled.match(action)) {
                Swal.fire("Actualizado", "El consumo fue editado correctamente", "success");
                setEditModalOpen(false);
            } else {
                throw new Error("No se pudo recargar la lista de consumos");
            }

        } catch (err) {
            Swal.fire("Error", err.message || "No se pudo editar el consumo", "error");
        }
    };


    //ELIMINAR CONSUMO
    const handleEliminarConsumo = (idConsumo) => {
        Swal.fire({
            title: '¿Eliminar consumo?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d32f2f',
            cancelButtonColor: '#757575',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminarConsumo(idConsumo))
                    .unwrap()
                    .then(() => {
                        Swal.fire('Eliminado', 'El consumo ha sido eliminado', 'success');
                    })
                    .catch((error) => {
                        Swal.fire('Error', error || 'No se pudo eliminar el consumo', 'error');
                    });
            }
        });
    };

    return (
        <DashboardLayout>
            <Container maxWidth="xl">
                <Tooltip title="Volver">
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.text.tertiary,
                            mt: 2,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.text.tertiary,
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="h3" sx={{ mt: 2, color: theme.palette.text.primary, mb: 2 }}>
                    Seguimiento Nutricional
                </Typography>

                {step === "busqueda" && (
                    <>
                        <Box sx={{ mt: 2 }}>
                            <ConsejosRapidos />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <PatientSearchCard
                                dni={dni}
                                setDni={setDni}
                                onSearch={buscarPaciente}
                                pacientesList={pacientesList}
                            />
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <CardHeader
                                        title="Últimos Registros de Consumo"
                                        titleTypographyProps={{ variant: "h6" }}
                                    />
                                    <CardContent>
                                        <TablaConsumo consumos={consumos} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )}

                {step === "creacion" && paciente && (
                    <>
                        <PatientInfoCardConsulta
                            paciente={paciente.persona}
                            onEdit={() => setStep("busqueda")}
                        />

                        <Divider sx={{ my: 4 }} />

                        <Grid container spacing={4}>
                            {/* Historial de consumos */}
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <CardHeader
                                        title={`Registros de Consumo de ${paciente.persona.nombre} ${paciente.persona.apellido}`}
                                        titleTypographyProps={{ variant: "h5" }}
                                    />
                                    <CardContent>
                                        <ListaConsumosAccordion
                                            consumos={consumos}
                                            onEdit={handleOpenEdit}
                                            onDelete={handleEliminarConsumo}
                                            onAdd={(c) => console.log("Agregar algo a:", c)}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Formulario para nuevo consumo */}
                            {/* Formulario para nuevo consumo + botón de hábitos */}
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <CardHeader
                                        title={
                                            <Typography variant="h6" color="text.primary">
                                                Nuevo Registro de Consumo
                                            </Typography>
                                        }
                                    />
                                    <CardContent>
                                        <FormularioNuevoConsumo onSubmit={handleCrearConsumo} />

                                        {/* 🔘 BOTÓN PARA COPIAR Y ABRIR FORMULARIO DE HÁBITOS */}
                                        <Box display="flex" justifyContent="flex-end" mt={3}>
                                            <IconButton
                                                onClick={() => {
                                                    if (!ultimoConsumo) {
                                                        Swal.fire("Atención", "Primero debes registrar un consumo para este paciente.", "warning");
                                                        return;
                                                    }
                                                    const url = `http://localhost:5173/habitos-y-consumos?idUser=${idUser}&idPaciente=${paciente.idPaciente}&idConsumo=${ultimoConsumo.idConsumo}`;
                                                    navigator.clipboard.writeText(url);
                                                    window.open(url, "_blank");
                                                }}
                                                color="primary"
                                                sx={{
                                                    bgcolor: '#e0f7fa',
                                                    '&:hover': { bgcolor: '#b2ebf2' },
                                                    px: 2,
                                                    borderRadius: 2
                                                }}
                                            >
                                                <AddIcon sx={{ mr: 1 }} />
                                                <Typography variant="body2">Enviar Formulario de Hábitos</Typography>
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )}

                <FormularioEditarConsumo
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    consumo={selectedConsumo}
                    onSubmit={handleEditarConsumo}
                />

                {/* {isLoading && <Typography>Cargando...</Typography>} */}
                {error && <Typography color="error">{error}</Typography>}
                <ScrollToTopButton />
            </Container>
        </DashboardLayout>
    );
};

export default ConsumoPage;