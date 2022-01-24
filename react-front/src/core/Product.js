import React, { useEffect, useState } from 'react';
import Layout from './Layout'
import moment from 'moment'
import { getProducts, readProduct } from './apiCore'
import ShowImage from './ShowImage'
import { useParams,Link } from "react-router-dom";
const Product = props => {
    const id = useParams().productId;
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        readProduct(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
            }
        })
    }

    useEffect(() => {
        const productId = id;
        loadSingleProduct(productId)
    }, [])
    return (
        <div>
            <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)}></Layout>
            <div className="container-fluid">
                <div className="row">
                    {product && product.description &&
                      
                            <div className="card">
                                <div className="card-header">{product.name}
                                    <div className="card-body">
                                        <ShowImage item={product} url="product" />
                                        <p className='lead mt-2'>{product.description}</p>
                                        <p className='black-9'>{product.price}</p>
                                        <p className='black-8'> Category:{product.category && product.category.name}</p>
                                        <p className='black-8'> Added on : {moment(product.createdAt).fromNow()}</p>
                                        
                                        <button className="btn btn-outline-warning mt-2 mb-2">
                                            add to card
                                        </button>
                                    </div>
                                </div>
                            </div>
                     
                    }
                </div>

            </div>
        </div>
    )
}
export default Product;