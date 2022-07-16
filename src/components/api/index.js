const axios = require('axios').default;
export const fetchData = (callback,url) => {
  axios.get(process.env.REACT_APP_BASE_URL+url).then((res)=>{
 callback(res)
 })
 }
 