import React,{Component} from 'react';
import {Navigate,Outlet } from 'react-router-dom';
import {isAuth} from './Api';


const AdminRoute = (component: Component, ...rest)=>
{
return isAuth() && isAuth().user.role === 1 ?
  <Outlet />
  :
   <Navigate to="/signin" />


}
 // return isAuth() ? <Outlet /> : <Navigate to="/login" />;

export default AdminRoute;
