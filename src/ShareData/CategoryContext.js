import axios from 'axios';
import {createContext, useEffect, useState} from 'react'

export let categoryContext = createContext(null); 

export default function CategorycontextProvider (props){
    let Baseurl = "https://route-ecommerce.onrender.com";
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getAllCategory();
  }, []);
  async function getAllCategory() {
    let { data } = await axios.get(`${Baseurl}/api/v1/categories`);
    setCategory(data.data);
  }
    return <categoryContext.Provider value={{category}}>
        {props.children}
    </categoryContext.Provider>
}
