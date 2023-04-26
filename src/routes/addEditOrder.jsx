import Button from '@mui/material/Button'; 
import AddIcon from '@mui/icons-material/Add'; 
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AddEditOrder() {
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
  const [date,setDate] = useState(new Date());

  const navigate = useNavigate();

  const [queryParameters] = useSearchParams();

  const [orNumber, setOrderNumber] = useState ('');

  const [openProducts, setOpenProducts] = useState(false);

  const [openSaveModal, setOpenSaveModal] = useState({idSaveModal:'',state:false});

  const [openEditLine, setOpenEditLine] = useState({idLine:'',state:false});

  const [lineproducts, setLineProducts] = useState([]);

  const [numberProducts, setNumberProducts] = useState ('');

  const [ammountPrice, setAmmountPrice] = useState ('');

  const [products, setProducts] = useState ([]);

  let [selectedProduct, setSelectedProduct] = useState ('');
  
  let [dateOrder, setOrderDate] = useState ('');

  let [selectedQty, setQty] = useState ('');

  const queryParams = new URLSearchParams(window.location.search);
  
  const baseURL = "http://localhost:8080/";

  const type = queryParams.get("type");

  const idNewOrder = queryParams.get("idNewOrder"); 
  
  const urlFindProduct = "http://localhost:8080/product/findAll";

  const urlInsertLineOrder = "http://localhost:8080/lineorder/insert";

  const urlUpdateNumberOder = "http://localhost:8080/order/updateNumberOrder";

  let URLDeleteLineOrder = "http://localhost:8080/lineorder/delete/";

  let URLOrder = "";

  let URLListProducts = "";

  let isDisabled = true;

  let id = '';


  if(type != 'Add'){
    id = queryParams.get("id");
  }
  else{
    id = queryParams.get("idNewOrder");
  }

  URLOrder= baseURL + "order/findById/"+id;
  
  URLListProducts = baseURL + "lineorder/findByOrderId/"+id ;
  

  function findOrder(){
    axios.get(URLOrder).then((response) => {
      setOrderNumber(response.data.orderNumber);
      setOrderDate(response.data.dateOrder);
      setNumberProducts(response.data.numberProducts);
      setAmmountPrice(response.data.ammountPrice);
    });

  }
  
  function loadProducts(){
    axios.get(urlFindProduct).then((response)=>{
      setProducts(response.data);
    })
  }

  function loadLineProducts(){
    axios.get(URLListProducts).then((response)=>{
      setLineProducts(response.data);
    })
  }

  function deleteLineOrder(a){
    axios.post(URLDeleteLineOrder+a).then(()=>{
      setOpenEditLine({id:a,state:false});
      window.location.reload(false);
    })
  }

  const handleOpenListProducts = () => {
    setOpenProducts(true);
    loadProducts();
  };

  const handleOpenLineOrder = (a) => {
    setOpenEditLine({idLine:a,state:true});
  };

  const handleSave = () =>{
    setOpenSaveModal({idSaveModal:id,state:true});
  }

  const navigateHome = () => {
    navigate('/my-orders');
  }

  function handleConfirmSave(a){
    axios.post(urlUpdateNumberOder,{
      idOrder:a,
      orderNumber:orNumber
    }).then(()=>{
      window.location.reload(false);
    }
    )
  }

  const handleAddLine = (e) =>{
    axios.post(urlInsertLineOrder,{
        product:{
          idProduct:selectedProduct
        },
        order:{
          idOrder:id
        },
        qtyLineOrder:selectedQty
      
    }).then(()=>{
      window.location.reload(false);
    }
    )
  }

  const handleCloseSaveModal = () => setOpenSaveModal({idSaveModal:'',state:false});

  const handleCloseProducts = () => setOpenProducts(false);

  const handleCloseLine = () => setOpenEditLine({id:'',state:false});
  

  useEffect(() => {
    
    if (type =='Add') {
      let d = new Date();
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      setOrderDate(ye+'-'+mo+'-'+da);
      setNumberProducts(0);
      setAmmountPrice(0.0);
      isDisabled = false;
    }
    else{
      findOrder();
      loadLineProducts();
    }
  }, []);


  return (
    <div id="myOrders" style={{ textAlign: 'left', width: '100%', backgroundColor: 'white', padding: '20px', borderRadius: '30px', border: 'solid'}}> 

      <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
        <div>
          <h1>{type} Order</h1>
        </div>
        <div> 
          <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpenListProducts}>Add Product</Button>
        </div>
        
      </div>
      <div style={{color: 'black', width: '100%', paddingBottom: '30px'}}> 

        <Stack>
          <Grid container>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label>Order #</label>
              <TextField 
                id="orderNumber" 
                variant="outlined" 
                value = {orNumber}
                onChange={event => { 
                  setOrderNumber (event.target.value); 
                }}/>
            </Grid>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label>Date Order</label>
              <TextField
                id="date" 
                variant="outlined" 
                value={dateOrder}
                disabled
                onChange={event => { 
                  setOrderDate (event.target.value); 
                }}/>
            </Grid>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label># Products</label>
              <TextField 
                id="productsNumber" 
                variant="outlined" 
                value={numberProducts} 
                disabled
                onChange={event => { 
                  setNumberProducts (event.target.value); 
                }}/>
            </Grid>
            <Grid sx={{margin:1, display: 'grid'}} item>
              <label>Final Price</label>
              <TextField 
                id="finalPrice" 
                variant="outlined" 
                value={ammountPrice} 
                disabled
                onChange={event => { 
                  setAmmountPrice (event.target.value); 
                }}/> 
            </Grid>
          </Grid>
        </Stack>
    
      </div>
      <div style={{ width: '100%'}}> 
        <Stack spacing = {4} direction = "row">
          <Button onClick={function() {handleSave(id,true)}} variant="contained">Save</Button>
          <Button onClick={navigateHome} style={{ marginRight: 'auto'}} variant="contained">Cancel</Button>
        </Stack>
      </div>
      <div>
       .
      </div>
      <div>  
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: '#1976d2', fontWeight: 'bold'}}>
            <TableRow>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>ID</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Name</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Unit Price</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Qty</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Total Price</TableCell>
              <TableCell style={{ backgroundColor: '#1976d2', fontWeight: 'bold', color: 'white'}}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineproducts.map((lineproduct, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{lineproduct.idLineOrder}</TableCell>
                <TableCell>{lineproduct.product.nameProduct}</TableCell>
                <TableCell>{lineproduct.product.unitPrice}</TableCell>
                <TableCell>{lineproduct.qtyLineOrder}</TableCell>
                <TableCell>{lineproduct.priceLineOrder}</TableCell>
                <TableCell>
                <Stack direction="row" spacing={0}>
                  <Button endIcon={<EditIcon/>}>
                  </Button>
                  <Button endIcon={<DeleteIcon/>} onClick ={function(){handleOpenLineOrder(lineproduct.idLineOrder)}}>
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
      open={openProducts}
      onClose={handleCloseProducts}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <h1>
          Add Product
        </h1>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product</InputLabel>
       <Select
          value={selectedProduct}
          label="Products"
          onChange={event=>{
            setSelectedProduct(event.target.value);
            console.log(selectedProduct);
          }}
        >{products.map((product)=>(
          <MenuItem 
          key={product.idProduct}
          value={product.idProduct}>
            {product.nameProduct}
          </MenuItem>
        ))}
        </Select>
        <Grid sx={{margin:1, display: 'grid'}} item>
          <label>Quantity Required</label>
          <TextField
            id="qty" 
            variant="outlined" 
            value={selectedQty}
            InputProps={{
              inputProps:{
                max:100,min:0
              }
            }}
            disabled={false}
            onChange={event => { 
              setQty (event.target.value); 
              console.log(selectedQty);
            }}
            onKeyPress={event =>{
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}/>
        </Grid>
      </FormControl>
      <Stack spacing = {4} direction = "row">
        <Button variant="contained" onClick={handleAddLine}>Add</Button>
        <Button variant="contained" onClick={handleCloseProducts}>Cancel</Button>
      </Stack>
      </Box>
      </Modal>

      <Modal
      open={openEditLine.state}
      onClose={handleCloseLine}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <h1>
          Delete line
        </h1>
        <h4>
          ¿Are you sure you want to delete this line?
        </h4>
      <Stack spacing = {4} direction = "row">
        <Button variant="contained" onClick={function(){deleteLineOrder(openEditLine.idLine)}}>Yes</Button>
        <Button variant="contained" onClick={handleCloseLine}>No</Button>
      </Stack>
      </Box>
      </Modal>

      <Modal
      open={openSaveModal.state}
      onClose={handleCloseSaveModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <h1>
          Save changes
        </h1>
        <h4>
          ¿Are you sure you want to save those changes?
        </h4>
      <Stack spacing = {4} direction = "row">
        <Button variant="contained" onClick={function(){handleConfirmSave(openSaveModal.idSaveModal)}}>Save</Button>
        <Button variant="contained" onClick={handleCloseSaveModal}>Cancel</Button>
      </Stack>
      </Box>
      </Modal>

    </div>
  );
}