import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import SaveIcon from '@mui/icons-material/Save';
import { MealPlanTabs } from "./MealPlanTabs";

export const PlanEditModal = ({
    open,
    onClose,
    initialData,
    alimentosDisponibles,
    onSubmitEdit
}) => {
    const {
        control,
        handleSubmit,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            tipoPlan: initialData?.tipoPlan || "",
            fechaInicio: initialData?.fechaInicio || "",
            observaciones: initialData?.observaciones || ""
        }
    });

    const [alimentos, setAlimentos] = useState(initialData?.alimentos || []);

    const tipoPlanSeleccionado = watch("tipoPlan");
    const fechaInicioSeleccionada = watch("fechaInicio");

    const alimentosPorTipo = {
        "Plan Estandar": [0, 1],
        "Plan Keto": [0, 1, 2],
        "Plan Hiper Calorico": [0, 1, 2, 3],
        "Plan Alto Calorico": [0, 1, 2, 3, 4],
        "Plan Hiper Proteico": [0, 1, 2, 3, 4, 5],
        "Plan Vegetariano": [0, 1, 2, 3, 4, 5, 6],
        "Plan Vegano": [0, 1, 2, 3, 4, 5, 6, 7],
        "Plan Sin T.A.C.C": [0, 1, 2, 3, 4, 5, 6, 7, 8],
        "Plan Cardio Protector": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "Plan Normo Calórico": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };

    useEffect(() => {
        if (initialData) {
            setValue("tipoPlan", initialData.tipoPlan || "");
            setValue("fechaInicio", initialData.fechaInicio || "");
            setValue("observaciones", initialData.observaciones || "");

            if (initialData.alimentos && initialData.alimentos.length > 0) {
                setAlimentos(initialData.alimentos);
            } else if (initialData.tipoPlan) {
                const ids = alimentosPorTipo[initialData.tipoPlan] || [];
                const filtrados = alimentosDisponibles
                    .filter((a) => ids.includes(a.idAlimento))
                    .map((a) => ({ ...a, gramos: 100 }));
                setAlimentos(filtrados);
            }
        }
    }, [initialData, setValue, alimentosDisponibles]);

    const onSubmit = (formData) => {
        const fechaFin = addDays(new Date(formData.fechaInicio), 30).toISOString().split("T")[0];

        const planEditado = {
            ...initialData,
            IdPlanAlimento: initialData.idPlanAlimento || initialData.idPlanAlimenticio,
            tipoPlan: formData.tipoPlan,
            fechaInicio: formData.fechaInicio,
            fechaFin: fechaFin,
            observaciones: formData.observaciones,
            alimentos,
            idPaciente: initialData.idPaciente
          };

        onSubmitEdit(planEditado); // lo maneja el padre
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Editar Plan Alimenticio</DialogTitle>
            <DialogContent dividers>
                <form id="edit-plan-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de Plan</InputLabel>
                                <Controller
                                    name="tipoPlan"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} label="Tipo de Plan">
                                            {Object.keys(alimentosPorTipo).map((plan) => (
                                                <MenuItem key={plan} value={plan}>
                                                    {plan}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="fechaInicio"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Fecha de Inicio"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="observaciones"
                                control={control}
                                render={({ field }) => (
                                    <TextField label="Observaciones" fullWidth {...field} />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <MealPlanTabs
                                alimentos={alimentos}
                                setAlimentos={setAlimentos}
                                alimentosSugeridos={alimentosPorTipo[tipoPlanSeleccionado] || []}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button
                    form="edit-plan-form"
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                >
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlanEditModal;
