import React ,{useState} from 'react';
import Layout from '../core/Layout';
import {isAuth} from '../auth/Api'
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const {user,token} = isAuth();

const handleChange=(e)=>{
  setError('')
  setName(e.target.value)
}
const clickSubmit=(e)=>{
  e.preventDefault();
  setError('')
  setSuccess(false)
createCategory(user._id,token,{name}).then(data=>{
  if(data.error){
    setError(true)
  }else{
    setError('')
    setSuccess(true)
  }
})

}
  const newCatForm = () =>(
    <form onSubmit={clickSubmit}>
    <div className="form-group">
     <label className="text-muted mb-2">Name</label>
     <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
    </div>
    <button className="btn btn-outline-primary mt-3">Add Category</button>
    </form>
  )

  const showError = ()=>(
    <div className="alert alert-danger container col-md-4 justify-content-center" style={{display:error ? '' : 'none'}}>
      <span style={{margin:"50px"}}>category must be unique</span>
    </div>
  )
  const showSuccess = ()=>(
    <div className="alert alert-info container col-md-4 justify-content-center" style={{display:success ? '' : 'none'}}>
      " category created "
    </div>
  )
return (
  <div>
      <Layout title="Add new category" description={`ready to add new category? '${name}'`}></Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newCatForm()}

          </div>
        </div>
      </div>
</div>
)
}


export default AddCategory;
