import React,{Fragment} from 'react' ;
import {signout,isAuth} from '../auth/Api' ;
import {NavLink,Navigate } from 'react-router-dom';
const Menu = () =>{

  return(
  <div>
    <ul className= "nav nav-tabs bg-primary">
     <li className="nav-item">
       <NavLink  className="nav-link" style={isActive => ({color: isActive ? "black" : "ffffff"})} to="/">Home</NavLink >
     </li>
     <li className="nav-item">
       <NavLink  className="nav-link" style={isActive => ({color: isActive ? "black" : "ffffff"})} to="/shop">Shop</NavLink >
     </li>
     {isAuth() && isAuth().user.role === 0 && (

       <li className="nav-item">
         <NavLink  className="nav-link" style={isActive => ({color: isActive ? "black" : "ffffff"})} to="/user/dashboard">Dashboard</NavLink >
         </li>
     )}
     {isAuth() && isAuth().user.role === 1 && (

       <li className="nav-item">
         <NavLink  className="nav-link" style={isActive => ({color: isActive ? "black" : "ffffff"})} to="/admin/dashboard">Dashboard</NavLink >
         </li>
     )}
     {!isAuth() && (
       <Fragment>
     <li className="nav-item">
       <NavLink  className="nav-link" style={isActive => ({color: isActive ? "black" : "ffffff"})} to="/signin">Signin</NavLink >
     </li>
     <li className="nav-item">
       <NavLink  className="nav-link" style={isActive => ({color: isActive ? "black" : "ffffff"})} to="/signup">Signup</NavLink >
     </li>
   </Fragment>
 )}
    {isAuth() && (
     <li className="nav-item">
       <span  className="nav-link" style={{cursor:'pointer',color:'white'}} onClick={()=>signout(()=>{
           Navigate('/');
         })}>Signout</span >
     </li>

 )}
    </ul>
  </div>
  )
}


export default Menu;
