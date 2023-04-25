import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

import axios from "axios";
import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Modal } from '@mui/material';

export default function MyOrders() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate();

  const URLGetOrders = "http://localhost:8080/order/findAllOrder";
  let URLDeleteOrder = "http://localhost:8080/order/delete/"

  const [ordenes, setOrdenes] = useState([]);

  const [open, setOpenQuestion] = useState({id:'',state:false});

  const handleClose = () => setOpenQuestion({id:'',state:false});

  function crearListado(){
    axios.get(URLGetOrders).then((response) => {
      setOrdenes(response.data);
      console.log(response.data);
    });

  };

  function handleOpenQuestion(a){
    setOpenQuestion({id:a,state:true});  
  };

  function callHandleDeleteOrder(a){
    handleDeleteOrder(a);
  }

  const handleDeleteOrder = (a) =>{
    deleteOrder(a);
  }
  function deleteOrder(a){
    axios.post(URLDeleteOrder+a).then(() => {
      console.log(URLDeleteOrder+a);
      console.log("Se eliminó correctamente la orden");
      setOpenQuestion({id:a,state:false});
      window.location.reload(false);
    });
  }

  useEffect(() => {
    crearListado();
  }, []);

  
  

  return (
    <div id="myOrders" style={{ textAlign: 'left', width: '100%'}}> 

      <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
        <div>
          <h1>My Orders</h1>
        </div>
        <div> 
          <Button variant="contained" endIcon={<AddIcon />} onClick={() => navigate('/addEditOrder?type=Add')}>New Order</Button>
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
                  <Button variant="contained" endIcon={<EditIcon />} onClick={() => navigate('/addEditOrder?type=Edit&id='+row.idOrder)}>
                    Edit
                  </Button>
                  <Button variant="contained" endIcon={<DeleteIcon />} onClick ={()=>handleOpenQuestion(row.idOrder)}>
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


      <Modal
      open={open.state}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <h1>
          Delete order
        </h1>
        <h4>
          ¿Are you sure you want to delete this order?
        </h4>
      <Stack spacing = {4} direction = "row">
        <Button variant="contained" onClick={function(){callHandleDeleteOrder(open.id)}}>Yes</Button>
        <Button variant="contained" onClick={handleClose}>No</Button>
      </Stack>
      </Box>
      </Modal>
    </div>
  );
}

