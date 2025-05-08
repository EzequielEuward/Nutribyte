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
} from "@mui/material";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../layout/DashboardLayout";

import { listarPacientes } from "../../store/patient/";
import { buscarPacientePorDni, listarConsumosPorUsuario, crearConsumo, eliminarConsumo } from "../../store/consumo/thunk";

import { TablaConsumosPaciente, FormularioNuevoConsumo, ListaConsumosAccordion } from "../components/consumo/";


import { PatientSearchCard } from "../components/planes/";
import { PatientInfoCardConsulta } from "../components/consultas/";

export const ConsumoPage = () => {

    const dispatch = useDispatch();
    const methods = useForm();
    const pacientesList = useSelector(state => state.patients.pacientes || []);
    const { consumos, isLoading, error } = useSelector((state) => state.consumo);

    //Manejo de estados
    const [dni, setDni] = useState("");
    const [step, setStep] = useState("busqueda");
    const [paciente, setPaciente] = useState(null);
    const [activeTab, setActiveTab] = useState("consumos");


    //Manejo de efectos
    useEffect(() => {
        dispatch(listarPacientes());
        dispatch(listarConsumosPorUsuario());
    }, [dispatch]);

    useEffect(() => {
        if (paciente) {
            setStep('creacion');
            methods.reset({
                ...methods.getValues(),
            });
        }
    }, [paciente]);

    const buscarPaciente = () => {
        const dniValido = dni.trim();
        if (!dniValido || !/^\d{7,8}$/.test(dniValido)) {
            alert("Ingrese un DNI válido (7 u 8 dígitos)");
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
                alert(error.message || "Error buscando paciente");
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
            dispatch(listarConsumosPorPaciente(paciente.idPaciente)); // recarga
        } catch (err) {
            Swal.fire("Error", err.message || "No se pudo registrar el consumo", "error");
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
                <Typography variant="h3" sx={{ mt: 2, color: "secondary.main" }}>
                    Seguimiento Nutricional
                </Typography>

                {step === "busqueda" && (
                    <>
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
                                        {/* Este componente mostrará todos los consumos (o por paciente si filtrás) */}
                                        <h2>ACA IRIA OTRA COSA QUE HAY QUE VER QUE PONER</h2>z
                                        {/* <TablaConsumosPaciente consumos={consumos} /> */}
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
                                            onEdit={(c) => console.log("Editar:", c)}
                                            onDelete={handleEliminarConsumo}
                                            onAdd={(c) => console.log("Agregar algo a:", c)}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Formulario para nuevo consumo */}
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <CardHeader
                                        title="Nuevo Registro de Consumo"
                                        titleTypographyProps={{ variant: "h6", color: "primary" }}
                                    />
                                    <CardContent>
                                        <FormularioNuevoConsumo onSubmit={handleCrearConsumo} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )}



                {isLoading && <Typography>Cargando...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
            </Container>
        </DashboardLayout>
    );
};

export default ConsumoPage;