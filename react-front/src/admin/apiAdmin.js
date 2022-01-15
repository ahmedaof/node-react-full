
import {API} from '../config'
  export const createCategory = (userId,token,category)=>{
        // console.log(name)
        return fetch(`${API}/category/create/${userId}`,{
          method:"POST",
          headers:{
            Accept:'application/json',
            "content-Type":'application/json',
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify(category)
        }).then(response =>{
          return response.json();
        }).catch(err=>{
          console.log(err)
        })
      }



  export const createProduct = (userId,token,product)=>{
        // console.log(name)
        return fetch(`${API}/product/create/${userId}`,{
          method:"POST",
          headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
          },
          body: product
        }).then(response =>{
          return response.json();
        }).catch(err=>{
          console.log(err)
        })
      }



export const getCategories=()=>{
  return fetch(`${API}/categories`,{
    method:"GET"
  }).then(res=>{
    return res.json();
  }).catch(err=>console.log(err))
}
