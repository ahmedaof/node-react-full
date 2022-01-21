import React , {useEffect,useState} from 'react' ;
import Layout from './Layout'
import Card from './Card'
import {getCategories,getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import {prices} from './fixedPrices'


const Shop =() =>{
  const [myFilters, setMyFilters] = useState({
    filters: {category:[] , price:[]}
  })
  const [categories,setCategories] = useState([]);
  const [error,setError] = useState(false);
  const [limit,setLimit] = useState(6);
  const [skip,setSkip] = useState(0);
  const [size,setSize] = useState(0);
  const [filterdResults,setFilterdResults] = useState(0);

  const loadFilteredResults = newFilters =>{
   getFilteredProducts(skip,limit,newFilters).then(data => {
     if(data.error){
       setError(data.error)
     }else{
       setFilterdResults(data.data);
       setSize(data.size);
       setSkip(0)
     }
   })
  }

  const loadMoreResults = () =>{
    let toSkip = skip + limit ;
   getFilteredProducts(toSkip,limit,myFilters.filters).then(data => {
     if(data.error){
       setError(data.error)
     }else{
       setFilterdResults([...filterdResults,...data.data]);
       setSize(data.size);
       setSkip(toSkip)
     }
   })
  }

const loadMoreButton = () =>(
   size > 0 && size >= limit  && (
     <button onClick={loadMoreResults} className="btn btn-warning mb-5">Load More</button>
   )
)
  const init = () =>{
    getCategories().then(data=>{
      if(data.error){
        setError(data.error)
      }else{
        setCategories(data)
      }
    })
  };

  useEffect(()=>{
    init();
    loadFilteredResults(skip,limit,myFilters.filter)
  },[])


   const handleFilters = (filters, filterBy) => {
     const newFilters = {...myFilters}
     newFilters.filters[filterBy] = filters

     if(filterBy === 'price'){
       let priceValues = handlePrice(filters)
        newFilters.filters[filterBy] = priceValues
     }
     loadFilteredResults(myFilters.filters);
     setMyFilters(newFilters);
   }

const handlePrice = value => {
  const data = prices ;let array = [];
  for(let key in data){
    if(data[key]._id === parseInt(value)){
      array = data[key].array
    }
  }
  return array ;
}


  return (
    <div>
        <Layout title="Shop" description="Search and fiend books"></Layout>
        <div className="container-fluid">

         <div className="row">
           <div className="col-4">
            <h4> filter by categories</h4>
           <ul>
           <Checkbox categories={categories} handleFilters={filters=>handleFilters(filters,'category')} />
           </ul>

           <h4> filter by prices</h4>
          <div className="container">
          <RadioBox prices={prices} handleFilters={filters=>handleFilters(filters,'price')} />
          </div>

           </div>
           <div className="col-8">
            <h2 className="mb-4">Products</h2>
            <div className="row">
              {Object.keys(filterdResults).map((product,i)=>(
                // console.log("ddddddddddddddddddddd:"+JSON.stringify(filterdResults[product]))
                // key: {i} Name: {subjects[keyName]}
                   <Card  key={i} product={(filterdResults[product])} />
              ))}
            </div>
            <hr />
            {loadMoreButton()}
           </div>
         </div>

    </div>
    </div>
  )
}


export default Shop ;
