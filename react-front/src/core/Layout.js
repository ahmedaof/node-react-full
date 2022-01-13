import React from 'react';
import Menu from './Menu'
const Layout = ({title = "Title" , description ="Description",childern,className}) => {
  return(
  <div>
  <Menu />
      <div className='container logo col-md-10 offset-md-5 justify-content-center'>
         <h2>{title}</h2>
         <p className="col-md-2 justify-content-center">{description}</p>
      </div>
      <div className = {className}>
         {childern}
      </div>
  </div>
  )
}
export default Layout;
