import React, { useEffect, useState } from 'react';
import Layout from './Layout'
import moment from 'moment'
import { listRelated, readProduct } from './apiCore'
import ShowImage from './ShowImage'
import Card from './Card'
import { addItem } from './cartHelpers';
import { useParams, Link, Navigate } from "react-router-dom";
const Product = props => {
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

    const id = useParams().productId;
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        readProduct(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                //related
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = id;
        loadSingleProduct(productId)
    }, [useParams()])
    return (
        <div>
            <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)}></Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className='col-8'>


                        {product && product.description &&

                            <div className="card">
                                <div className="card-header name">{product.name}
                                    <div className="card-body">
                                    {shouldRedirect(redirect)}
                                        <ShowImage item={product} url="product" />
                                        <p className='lead mt-2'>{product.description}</p>
                                        <p className='black-10'>{product.price}</p>
                                        <p className='black-9'> Category:{product.category && product.category.name}</p>
                                        <p className='black-8'> Added on : {moment(product.createdAt).fromNow()}</p>
                                        {product.quantity > 0 ?
                                            (<span className='badge badge-primary badge-pill'>In stock</span>) : (<span className='badge badge-primary badge-pill'>Out stock</span>)

                                        }
                                        <br />
                                        <button className="btn btn-outline-warning mt-2 mb-2">
                                            add to card
                                        </button>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                    <div className='col-4'>
                        <h4>Related Product</h4>
                        {relatedProduct.map((prod,i)=>(
                            <div className='mb-3'>
                                <Card key={i} product={prod}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;