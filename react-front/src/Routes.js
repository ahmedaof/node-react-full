import React,{Fragment} from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Home from './core/Home';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
const Router = () =>{
  return(
    <BrowserRouter>
        <Fragment>
         <Routes >
           <Route exact path='/user/dashboard' element={<PrivateRoute/>}>
             <Route exact path='/user/dashboard' element={<Dashboard/>}/>
           </Route>
           <Route exact path='/admin/dashboard' element={<AdminRoute/>}>
             <Route exact path='/admin/dashboard' element={<AdminDashboard/>}/>
           </Route>
           <Route path="/" exact element={<Home/>}/>
             <Route path="/Signin" exact element={<Signin/>}/>
             <Route path="/Signup" exact element={<Signup/>}/>
         </Routes >
   </Fragment>
    </BrowserRouter>
  )
}


export default Router;
