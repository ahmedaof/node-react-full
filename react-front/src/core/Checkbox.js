import React ,{useState,useEffect} from 'react';


const Checkbox = ({categories,handleFilters}) =>{
  const [checked,setChecked] = useState([]);

  const handleToggle = cat =>() =>{
    const currentCategoryId = checked.indexOf(cat);
    const newCheckedCategoryId = [...checked];

    if(currentCategoryId === -1){
      newCheckedCategoryId.push(cat)
    }else{
      newCheckedCategoryId.splice(currentCategoryId,1)
    }
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)

  }
  return categories.map((cat,i)=>(
    <li key="i" className="list-unstyled">
     <input onChange={handleToggle(cat._id)} value={checked.indexOf(cat._id === -1)} type="checkbox" className="form-check-input" />
     <label className="form-check-lable">{cat.name}</label>
    </li>
  )
)
}


export default Checkbox ;
