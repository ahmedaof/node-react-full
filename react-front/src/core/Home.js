import React , {useEffect,useState} from 'react' ;
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'

const Home = ()=>{
  const [productsBySell ,setProductsBySell] = useState([]);
  const [productsByArrival ,setProductsByArrival] = useState([]);
  const [error ,setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data=>{
      if(data.error){
        setError(data.error)
      }else{
        setProductsBySell(data)
      }
    })
  }


  const loadProductsByArrival = () => {
    getProducts('createAt').then(data=>{
      if(data.error){
        setError(data.error)
      }else{
        setProductsByArrival(data)
      }
    })
  }

  useEffect(()=>{
    loadProductsBySell()
    loadProductsByArrival()
  })
return (
  <div>
      <Layout title="home" description="react app with node"></Layout>
      <div className="container">
       <h2 className="mb-4">new Arrivals</h2>
       <div className="row">
       {productsByArrival.map((product,i) => (<Card key = {i} product = {product}/>))}
       </div>
       <h2 className="mb-4">Best Selers</h2>
            <div className="row">
       {productsBySell.map((product,i) => (<Card key = {i} product = {product}/>))}
  </div>
  </div>
  </div>
)
}

export default Home ;
