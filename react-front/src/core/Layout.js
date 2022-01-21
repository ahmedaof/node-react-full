import React from 'react';
import Menu from './Menu'
import "../style.css"
const Layout = ({title = "Title" , description ="Description",childern,className}) => {
  return(
  <div className='jumbotron'>
  <Menu />
      <div className='container logo col-md-10 mb-3'>
         <br />
         <br />
         <h2>{title}</h2>
         <p>{description}</p>
      </div>
      <div className = {className}>
         {childern}
      </div>
  </div>
  )
}
export default Layout;
