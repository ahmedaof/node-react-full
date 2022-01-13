
import {API} from '../config'
  export const signup = user=>{
        // console.log(name)
        return fetch(`${API}/signup`,{
          method:"POST",
          headers:{
            Accept:'application/json',
            "content-Type":'application/json'
          },
          body: JSON.stringify(user)
        }).then(response =>{
          return response.json();
        }).catch(err=>{
          console.log("ddddddddddddddd"+err)
        })
      }


  export const signin = user=>{
        // console.log(name)
        return fetch(`${API}/signin`,{
          method:"POST",
          headers:{
            Accept:'application/json',
            "content-Type":'application/json'
          },
          body: JSON.stringify(user)
        }).then(response =>{
          return response.json();
        }).catch(err=>{
          return err.json();
        })
      }


export const authenticate = (data , next) =>{
  if(typeof window !== 'undefined'){
    localStorage.setItem('jwt',JSON.stringify(data));
    next()
  }
}


export const signout = (next)=>{
  if(typeof window !== 'undefined'){
    localStorage.removeItem('jwt');
    next();
    return fetch(`${API}/signout`,{
      method:'GET'
    }).then(res=>{
      console.log('signout' , res)
    })
    .catch(err=>{console.log(err)})
  }
}


export const isAuth=()=>{
  if(typeof window == 'undefined'){
return false;}
 if(localStorage.getItem('jwt')){
   return JSON.parse(localStorage.getItem('jwt'))
 }else{
   return false ;
 }
}
