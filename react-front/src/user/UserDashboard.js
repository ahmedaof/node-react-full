import React from 'react';
import Layout from '../core/Layout';
import {isAuth} from '../auth/Api'
import {Link} from 'react-router-dom';

const Dashboard =()=>{
  const {user:{name,email,role}} = isAuth();
  const userLinks = () =>{
    return (
      <div className ="card">
        <h4 className="card-header">User Links</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link className="nav-link" to="/cart">my Cart</Link>
            </li>
            <li className="list-group-item">
                <Link className="nav-link" to="/profile/update">update profile</Link>
            </li>
          </ul>
      </div>
    )
  }
  const userInfo = ()=>(

          <div className="card-md-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">{name}</li>
              <li className="list-group-item">{email}</li>
              <li className="list-group-item">{role === 1 ? 'Admin' : 'User'}</li>
            </ul>
          </div>


  )
  const purchasehistory = () => (
    <div className="card mt-5">
      <h3 className="card-header">purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
    </div>
  )
  return (
    <div>
        <Layout title="User Dashboard" description={`welcome ${name}`}></Layout>
        <div className="container">
          <div className="row">
            <div className="col-3">
              {userLinks()}
            </div>
            <div className="col-9">
              {userInfo()}
              {purchasehistory()}
            </div>
          </div>
        </div>
  </div>
  )
}


export default Dashboard;
