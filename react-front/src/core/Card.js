import React from 'react' ;
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage'



const Card =  ({product})=>{
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}
         <div className="card-body">
           <ShowImage item={product} url="product" />
         <p className='lead mt-2'>{product.description}</p>
         <p className='black-9'>{product.price}</p>

         <Link to={`/product/${product._id}`}><button className="btn btn-outline-primary mt-2 mb-2">
         ViewProduct
         </button></Link>
         <button className="btn btn-outline-warning mt-2 mb-2">
         add to card
         </button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Card ;
