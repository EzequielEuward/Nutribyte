import { useState } from "react";
import {Box,Table,TableBody,TableCell,TableContainer,TableFooter,TablePagination,TableRow,Paper,TableHead,MenuItem,Select,IconButton} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {FoodAction,FoodDrawer} from "../food/";
import { mockFoodData } from "../../../mock/data/mockFoodData";

export const FoodTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterGroup, setFilterGroup] = useState("All");
  const [drawerData, setDrawerData] = useState(null);

  const handleOpenDrawer = (data) => {
    setDrawerData(data);
  };

  const handleCloseDrawer = () => {
    setDrawerData(null);
  };

  const handleFilterChange = (event) => {
    setFilterGroup(event.target.value);
    setPage(0);
  };

  const filteredData =
    filterGroup === "All"
      ? mockFoodData
      : mockFoodData.filter((item) => item.grupo === filterGroup);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 2, ml: 2 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Select
          value={filterGroup}
          onChange={handleFilterChange}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="All">All Groups</MenuItem>
          {[...new Set(mockFoodData.map((item) => item.grupo))].map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Group</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Proteins</TableCell>
              <TableCell align="right">Carbohydrates</TableCell>
              <TableCell align="right">Fats</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredData
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell>{row.grupo}</TableCell>
                <TableCell align="right">{row.calorias}</TableCell>
                <TableCell align="right">{row.proteinas}</TableCell>
                <TableCell align="right">{row.carbohidratos}</TableCell>
                <TableCell align="right">{row.grasas}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDrawer(row)}>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={FoodAction}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {drawerData && (
        <FoodDrawer open={!!drawerData} onClose={handleCloseDrawer} data={drawerData} />
      )}
    </Box>
  );
};

export default FoodTable;
