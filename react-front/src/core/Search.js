import React, { useEffect, useState } from 'react';
import { getCategories, list } from './apiCore'
import Card from './Card'

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false

  })

  const { categories, category, search, results, searched } = data;
  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setData({ ...data, categories: data })
      }
    })
  }


  useEffect(() => {
    loadCategories()
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category }).then(res => {
        if (res.err) {
          console.log(res.error)
        } else {
          setData({ ...data, results: res, searched: true })
        }
      })
    }
  }
  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  }

  const handleChange = (name) => e => {
    setData({ ...data, [name]: e.target.value, searched: false })
  }
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className='input-group-text'>
          <div className='input-group input-group-lg'>
            <div className='input-group-prepend'>
              <select className='btn mr-2' onChange={handleChange("category")}>
                <option value="all">All</option>
                {categories.map((cat, i) => (<option key={i} value={cat._id}>{cat.name}</option>))}
              </select>
            </div>
            <input type="search" className='form-control' onChange={handleChange("search")} placeholder='search by name' />
          </div>
          <div className='btn input-group-append' style={{ border: 'none' }}>
            <button className='input-group-text'>Search</button>
          </div>
        </span>
      </form>
    )
  }

  const searcheMessage = (searched, results) => {
     if(searched && results.length > 0){
       return `found ${results.length} products`
     }
     if(searched && results.length < 1){
       return `No products found`
     }

  }


  const searchedProducts = (results = []) => {
    return (
  <div>
    <h2 className='mt-4 mb-4'>
      {searcheMessage(searched, results)}
    </h2>
        <div className='row'>
          {results.map((product,i)=>(
            <Card key={i} product={product}/>
          ))}
      </div>
  </div>
    )
  }
  return (
    <div className="row">
      <div className="container mb-3">
        {searchForm()}
      </div>
      <div className="container-fluid mb-3">
        {searchedProducts(results)}
      </div>
    </div>
  )
}

export default Search;
