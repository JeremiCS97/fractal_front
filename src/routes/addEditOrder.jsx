import Button from '@mui/material/Button'; 
import AddIcon from '@mui/icons-material/Add'; 
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AddEditOrder() {
  const [date,setDate] = useState(new Date());
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  let baseURL = "http://localhost:8080/";
  console.log(queryParameters.get('id'));
  if (queryParameters.get('id') != undefined ){
    baseURL= "http://localhost:8080/order/findById/"+queryParameters.get('id');
  }
  const [order, setOrder] = useState([]);

  function findOrder(){
    axios.get(baseURL).then((response) => {
      setOrder(response.data);
      console.log(response.data);
    });

  }

  const queryParams = new URLSearchParams(window.location.search)
  const id = queryParams.get("id")
  const type = queryParams.get("type")

  useEffect(() => {
    console.log("id", id)
    console.log("type", type)
    findOrder();
  }, []);


  return (
    <div id="myOrders" style={{ textAlign: 'left', width: '100%', backgroundColor: 'white', padding: '20px', borderRadius: '30px', border: 'solid'}}> 

      <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
        <div>
          <h1>{type} Order</h1>
        </div>
        <div> 
          <Button variant="contained" endIcon={<AddIcon />}>Agregar</Button>
        </div>
        
      </div>
      <div style={{color: 'black', width: '100%'}}> 

        <Stack>
          <Grid container>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label>Order #</label>
              <TextField 
                id="orderNumber" 
                variant="outlined" 
                value = {order.orderNumber}/>
            </Grid>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label>Date Order</label>
              <TextField
                id="date" 
                variant="outlined" 
                value={order.dateOrder} />
            </Grid>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label># Products</label>
              <TextField 
                id="productsNumber" 
                variant="outlined" 
                value={order.numberProducts} />
            </Grid>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label>Final Proce</label>
              <TextField 
                id="finalPrice" 
                variant="outlined" 
                value={order.ammountPrice} /> 
            </Grid>
          </Grid>
        </Stack>
    
      </div>
          
    </div>
  );
}

