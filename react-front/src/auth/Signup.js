import React,{useState} from 'react' ;
import {Link} from 'react-router-dom';
import Layout from '../core/Layout'
import {signup} from './Api';



const Signup = ()=>{
  const [values, setValues] = useState({name:'',email:'',password:'',error:'',success:false});
  const {name , email,password,error,success} = values;
  const SignUpForm =()=>{
      const handleChange = name=> event=>{
         setValues({...values, error:false , [name]:event.target.value})
      }

      const clickSubmit =(e)=>{
        e.preventDefault();
        setValues({...values, error: false});
        signup({name,email,password}).then(data=>{
          if(data.errors){
            setValues({...values, error:data.errors[0].msg , success:false})
          }else{
            setValues({...values,name:'',email:'',password:'', error:'' , success:true})

          }
        })
      }
    return(
    <form>
    <div className="container col-md-8 justify-content-center">
     <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
     </div>
     <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
     </div>
     <div className="form-group">
        <label className="text-muted">password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password}  />
     </div>
    <br></br>
     <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
     </div>
    </form>


)


}
  const showError = ()=>(
    <div className="alert alert-danger container col-md-4 justify-content-center" style={{display:error ? '' : 'none'}}>
      <span style={{margin:"119px"}}>{error}</span>
    </div>
  )
  const showSuccess = ()=>(
    <div className="alert alert-info container col-md-4 justify-content-center" style={{display:success ? '' : 'none'}}>
      New account is created plz <Link to="/signin">Signin</Link>
    </div>
  )
return(
<div>

  <Layout title="Signup" description="signup to  e-book" className="container">
  </Layout>
  {showError()}
  {showSuccess()}
  {SignUpForm()}
  </div>
)
}

export default Signup ;
