import React, { useCallback} from 'react'
import './search.scss'

const Text = ({ data, placeholder, setSearchKey, searchKey, searchFilter }) => {
  // console.log("DATA", data)
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    }
  }
  const handleChange = (value) => {
    // console.log("VA", value)
    // console.log("data", data)
    setSearchKey(value)
    searchFilter(data);
  }
  const debouncing = useCallback(debounce(handleChange), [])
  return (
    <div className='search_container'>
      <input  className='search' placeholder={placeholder} type="text" onChange={(e) => {
        debouncing(e.target.value)
      }} />
      <img src='./search.png' /></div>
  )
}

export default Text

