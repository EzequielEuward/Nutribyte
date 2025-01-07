import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Paper } from "@mui/material";

export const TablaCalorias = ({ filteredData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
    return (
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
                    {filteredData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
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
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default TablaCalorias;
