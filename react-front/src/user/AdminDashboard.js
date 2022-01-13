import React from 'react';
import Layout from '../core/Layout';
import {isAuth} from '../auth/Api'
import {Link} from 'react-router-dom';

const AdminDashboard =()=>{
  const {user:{name,email,role}} = isAuth();
  const adminLinks = () =>{
    return (
      <div className ="card">
        <h4 className="card-header">Admin Links</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link className="nav-link" to="/create/category">Create Category</Link>
            </li>
            <li className="list-group-item">
                <Link className="nav-link" to="/create/product">Create Product</Link>
            </li>
          </ul>
      </div>
    )
  }
  const adminInfo = ()=>(

          <div className="card-md-5">
            <h3 className="card-header">Admin Information</h3>
            <ul className="list-group">
              <li className="list-group-item">{name}</li>
              <li className="list-group-item">{email}</li>
              <li className="list-group-item">{role === 1 ? 'Admin' : 'User'}</li>
            </ul>
          </div>


  )

  return (
    <div>
        <Layout title="User Dashboard" description={`welcome ${name}`}></Layout>
        <div className="container">
          <div className="row">
            <div className="col-3">
              {adminLinks()}
            </div>
            <div className="col-9">
              {adminInfo()}

            </div>
          </div>
        </div>
  </div>
  )
}


export default AdminDashboard;
