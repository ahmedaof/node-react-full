import React,{Component} from 'react';
import {Navigate,Outlet } from 'react-router-dom';
import {isAuth} from './Api';


const PrivateRoute = (component: Component, ...rest)=>
{
return isAuth()?
  <Outlet />
  :
   <Navigate to="/signin" />


}
 // return isAuth() ? <Outlet /> : <Navigate to="/login" />;

export default PrivateRoute;
