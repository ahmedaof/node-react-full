import React ,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuth} from '../auth/Api'
import {Link} from 'react-router-dom';
import {createProduct,getCategories} from './apiAdmin';


const AddProduct = () => {
  const {user,token} = isAuth();
  const [values, setValues] = useState({
    name:'',
    description:'',
    price:'',
    categories:[],
    category:'',
    shipping:'',
    quantity:'',
    photo:'',
    loading:false,
    error:'',
    createdProduct:'',
    redirectToProfile:false,
    formData:''
  })

  const {    name,
      description,
      price,
      categories,
      category,
      shipping,
      quantity,
      loading,
      error,
      createdProduct,
      redirectToProfile,
      formData} = values;

      const init = () =>{
        getCategories().then(data=>{
          if(data.error){
            setValues({...values,error:data.error})
          }else{
            setValues({...values,categories:data, formData: new FormData()})
          }
        })
      }

  useEffect(()=>{
    init()
  },[])

const handleChange = name => e => {
  const value = name === 'photo' ? e.target.files[0] : e.target.value;
  formData.set(name, value)
  setValues({...values, [name]:value})
}
const clickSubmit=(e)=>{
  e.preventDefault();
  setValues({...values,error:'',loading:true})
createProduct(user._id,token,formData).then(data=>{
  if(data.error){
    setValues({...values,error:data.error.message})
  }else{
    setValues({...values,    name:'',
        description:'',
        price:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:data.name,
        })
  }
})

}
  const newProductForm = () =>(
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>product photo</h4>
    <div className="form-group">
     <label className="btn btn-secondary">
     <input type="file" name="photo" onChange={handleChange('photo')} accept="image/*"/>
     </label>
    </div>

    <div className="form-group">
     <label className="form-group">Name </label>
     <input type="text" className="form-control" onChange={handleChange('name')} value={name} autoFocus required/>
    </div>
    <div className="form-group">
     <label className="form-group">Description </label>
     <textarea type="text" className="form-control" onChange={handleChange('description')} value={description} autoFocus required/>
    </div>
    <div className="form-group">
     <label className="form-group">price </label>
     <input type="number" className="form-control" onChange={handleChange('price')} value={price} autoFocus required/>
    </div>
    <div className="form-group">
     <label className="form-group">category </label>
     <select onChange={handleChange('category')}  className="form-control" >
       <option>please select</option>
       {categories && categories.map((cat,index)=>(<option key={index} value={cat._id}>{cat.name}</option>)

       )}
     </select>
    </div>
    <div className="form-group">
     <label className="form-group">shipping </label>
     <select onChange={handleChange('shipping')}  className="form-control" >
       <option>please select</option>
       <option value="0">no</option>
       <option value="1">yes</option>
     </select>
    </div>
    <div className="form-group">
     <label className="form-group">quantity </label>
     <input type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} autoFocus required/>
    </div>


    <button className="btn btn-outline-primary mt-3">Add Product</button>
    </form>
  )

  const showError = ()=>(
    <div className="alert alert-danger container col-md-4 justify-content-center" style={{display:error ? '' : 'none'}}>
      <span style={{margin:"50px"}}>{error}</span>
    </div>
  )
  const showSuccess = ()=>(
    <div className="alert alert-info container col-md-4 justify-content-center" style={{display:loading ? '' : 'none'}}>
      <h2>product is created </h2>
    </div>
  )


return (
  <div>
      <Layout title="Add new product" description={`ready to add new product? '${name}'`}></Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newProductForm()}

          </div>
        </div>
      </div>
</div>
)
}


export default AddProduct;
