import React,{useState} from 'react' ;
import {Navigate } from 'react-router-dom';
import Layout from '../core/Layout'
import {signin,authenticate,isAuth} from './Api';



const Signin = ()=>{
  const [values, setValues] = useState({email:'',password:'',error:'',loading:false,redirectToReferrer: false});
  const {email,password,error,loading,redirectToReferrer} = values;
  const {user} = isAuth();
  const SigninForm =()=>{
      const handleChange = name=> event=>{
         setValues({...values, error:false , [name]:event.target.value})
      }

      const clickSubmit =(e)=>{
        e.preventDefault();
        setValues({...values, error: false ,loading:true});
        signin({email,password}).then(data=>{
          if(data.errors){
            setValues({...values, error:  data.errors.map(function (error) {
              return error.msg  }) , loading:false})
          }
          else if ( data.err !== undefined) {
            setValues({...values,error: data.err, loading:false })
          }
          else{
            authenticate(data,()=>{

              setValues({...values,redirectToReferrer:true})
            })

          }
        })
      }
    return(
    <form>
    <div className="container col-md-8 justify-content-center">
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
      <span style={{margin:"50px"}}>{error}</span>
    </div>
  )
  const showLoading = ()=>(
    <div className="alert alert-info container col-md-4 justify-content-center" style={{display:loading ? '' : 'none'}}>
      "loading ..."
    </div>
  )
  const redirectUser = ()=>{
   if(redirectToReferrer){
     if(user && user.Role === 1){
       return <Navigate  to="/admin/dashboard" />
     }else{
       return <Navigate  to="/user/dashboard" />
     }
   }
  }
return(
<div>

  <Layout title="signin" description="signin to  e-book" className="container">
  </Layout>
  {showError()}
  {showLoading()}
  {SigninForm()}
  {redirectUser()}
  </div>
)
}

export default Signin ;
