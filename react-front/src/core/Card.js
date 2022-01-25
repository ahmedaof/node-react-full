import React, { useState } from 'react' ;
import {Link, Navigate} from 'react-router-dom';
import ShowImage from './ShowImage'
import { addItem } from './cartHelpers';


const Card =  ({product,showAddToCartButton = true})=>{

  const [redirect , setRedirect] = useState(false)
  const addToCart = () =>{
     addItem(product,()=>{
       setRedirect(true);
     })
  }

  const shouldRedirect = redirect => {
    if(redirect){
      return <Navigate to='/cart'/>
    }
  }
  return (
    <div className="col-4 mb-3">
      <div className="card">
        {shouldRedirect(redirect)}
        <div className="card-header name">{product.name}
         <div className="card-body">
           <ShowImage item={product} url="product" />
         <p className='lead mt-2'>{product.description}</p>
         <p className='black-10'>{product.price}</p>

         <Link to={`/product/${product._id}`}><button className="btn btn-outline-primary mt-2 mb-2">
         ViewProduct
         </button></Link>
             {showAddToCartButton && (  <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
             add to card </button>)}  
         </div>
        </div>
      </div>
    </div>
  )
}

export default Card ;
