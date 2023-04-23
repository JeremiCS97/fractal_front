export default function Root() {
  return (
    <>
      <div id="sidebar" style={{textAlign: 'center', width: '100%'}}>
        <h1>Welcome to Fractal Orders</h1> 
        <div> 
          <a href={`/my-orders`}>My Orders</a>  
        </div>
        <div>
          <a href={`/products`}>Products</a>  
        </div>
      </div>
    </>
  );
}