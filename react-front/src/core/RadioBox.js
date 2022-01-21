import React ,{useState,useEffect , Fragment} from 'react';

const RadioBox = ({prices,handleFilters}) => {
   const [value , setValue] = useState(0);
   const handleChange = (e) =>{
      handleFilters(e.target.value)
      setValue(e.target.value)
   }
   return prices.map((price,i)=>(
     <div key="i">
      <input onChange={handleChange} value={`${price._id}`} type="radio" name={price} className="mr-2 ml-4" />
      <label className="form-check-lable">{price.name}</label>
     </div>
   )
 )
}


export default RadioBox;
