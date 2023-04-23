import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

import axios from "axios";
import { useState, useEffect } from 'react';

export default function Products() {
  const baseURL = "http://localhost:8080/order/findAllOrder";
  const [ordenes, setOrdenes] = useState([]);

  function crearListado(){
    axios.get(baseURL).then((response) => {
      setOrdenes(response.data);
      console.log(response.data);
    });

  }

  useEffect(() => {
    crearListado();
  }, []);


  
  

  return (
    <div id="myOrders" style={{ textAlign: 'left', width: '100%'}}> 

      <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
        <div>
          <h1>Products</h1>
        </div>
        <div> 
          <Button variant="contained" endIcon={<AddIcon />}>New Order</Button>
        </div>
        
      </div>
          
      <div>  
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: '#1976d2', fontWeight: 'bold'}}>
            <TableRow>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>ID</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Order #</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Date</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}># Products</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Final Price</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.idOrder}</TableCell>
                <TableCell>{row.orderNumber}</TableCell>
                <TableCell>{row.dateOrder}</TableCell>
                <TableCell>{row.statusOrder}</TableCell>
                <TableCell>{row.statusOrder}</TableCell>
                <TableCell>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" endIcon={<EditIcon />}>
                    Edit
                  </Button>
                  <Button variant="contained" endIcon={<DeleteIcon />}>
                    Delete 
                  </Button> 
                </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
      </div>
    </div>
  );
}

