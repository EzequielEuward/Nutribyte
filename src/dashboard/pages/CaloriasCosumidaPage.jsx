import { useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    TableHead,
    MenuItem,
    Select,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { mockCaloriasData } from "../../mock/data/mockCaloriasData";
import DashboardLayout from "../layout/DashboardLayout";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Registra los elementos necesarios para gráficos de línea y torta
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export const CaloriasConsumidasPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterDate, setFilterDate] = useState("All");
    const [searchPatient, setSearchPatient] = useState("");

    const handleFilterChange = (event) => {
        setFilterDate(event.target.value);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchPatient(event.target.value);
    };

    const filteredData = mockCaloriasData
        .filter((item) =>
            filterDate === "All" || item.fecha === filterDate
        )
        .filter((item) =>
            searchPatient === "" || item.paciente.toLowerCase().includes(searchPatient.toLowerCase())
        );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const totals = filteredData.reduce(
        (acc, item) => ({
            calorias: acc.calorias + item.calorias,
            proteinas: acc.proteinas + item.proteinas,
            carbohidratos: acc.carbohidratos + item.carbohidratos,
            grasas: acc.grasas + item.grasas,
        }),
        { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 }
    );

    // Datos para el gráfico de línea
    const chartData = {
        labels: filteredData.map((item) => item.fecha),
        datasets: [
            {
                label: "Calorías",
                data: filteredData.map((item) => item.calorias),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: true,
            },
            {
                label: "Proteínas",
                data: filteredData.map((item) => item.proteinas),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
            },
            {
                label: "Carbohidratos",
                data: filteredData.map((item) => item.carbohidratos),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
            {
                label: "Grasas",
                data: filteredData.map((item) => item.grasas),
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                fill: true,
            },
        ],
    };

    // Datos para el gráfico de torta
    const pieChartData = {
        labels: ["Calorías", "Proteínas", "Carbohidratos", "Grasas"],
        datasets: [
            {
                label: "Distribución de Nutrientes",
                data: [totals.calorias, totals.proteinas, totals.carbohidratos, totals.grasas],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
            },
        ],
    };

    // Recomendaciones para el paciente
    const recommendations = (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Recomendaciones para el Paciente:</Typography>
            <Typography variant="body1">
                Basado en la información de consumo nutricional, se recomienda mantener un balance adecuado entre las calorías consumidas y los nutrientes. Si el paciente está consumiendo más calorías de las necesarias, podría considerar ajustar su ingesta de carbohidratos y grasas.
            </Typography>
        </Box>
    );

    return (
        <DashboardLayout>
            <Box sx={{ p: 2, ml: 2 }}>
                {/* Filtros y tabla */}
                <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <TextField label="Buscar Paciente" variant="outlined" size="small" value={searchPatient} onChange={handleSearchChange} sx={{ width: "300px" }} />
                    <Select value={filterDate} onChange={handleFilterChange} displayEmpty sx={{ minWidth: 150 }}>
                        <MenuItem value="All">Todas las fechas</MenuItem>
                        {[...new Set(mockCaloriasData.map((item) => item.fecha))].map((date) => (
                            <MenuItem key={date} value={date}>
                                {date}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => console.log("Agregar registro")}>
                        Agregar Registro
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500, border: "1px solid #ddd" }} aria-label="calorias table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Paciente</TableCell>
                                <TableCell>Comida</TableCell>
                                <TableCell align="right">Calorías</TableCell>
                                <TableCell align="right">Proteínas</TableCell>
                                <TableCell align="right">Carbohidratos</TableCell>
                                <TableCell align="right">Grasas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.fecha}</TableCell>
                                    <TableCell>{row.paciente}</TableCell>
                                    <TableCell>{row.comida}</TableCell>
                                    <TableCell align="right">{row.calorias}</TableCell>
                                    <TableCell align="right">{row.proteinas}</TableCell>
                                    <TableCell align="right">{row.carbohidratos}</TableCell>
                                    <TableCell align="right">{row.grasas}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination rowsPerPageOptions={[5, 10, 25]} count={filteredData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

                {/* Gráficos en línea con flex */}
                <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                    <Box sx={{ flex: "1 1 100%", maxWidth: "500px", mb: 4 }}>
                        <Typography variant="h6">Gráfico de Consumo Nutricional</Typography>
                        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    </Box>

                    <Box sx={{ flex: "1 1 100%", maxWidth: "400px", mb: 4 }}>
                        <Typography variant="h6">Distribución de Nutrientes</Typography>
                        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    </Box>
                    <Box sx={{ flex: "1 1 100%", maxWidth: "400px", mb: 4 }}>
                        <Typography variant="h6">Distribución de Nutrientes</Typography>
                        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    </Box>
                </Box>
                <Box>{recommendations}</Box>

            </Box>
        </DashboardLayout>
    );
};
