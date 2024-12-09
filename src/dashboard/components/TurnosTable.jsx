import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Datos de ejemplo
const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 30, state: 'California', phone: '123-456-7890' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, state: 'Texas', phone: '987-654-3210' },
  { id: 3, firstName: 'Mike', lastName: 'Johnson', age: 35, state: 'New York', phone: '555-555-5555' },
];

// Componente principal
export const TurnosTable = () => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TurnosTable;
