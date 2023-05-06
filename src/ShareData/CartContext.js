import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(null);

export function CartContextProvider(props) {
  let Baseurl = "https://route-ecommerce.onrender.com";
  let [cartData, setCartData] = useState();
  let [products,setProducts] = useState([]);
  let [loading, setloading] = useState(false);
  useEffect(()=>{
    getAllCartData();
  },[])
  async function getAllCartData() {
    let header = {
      token: localStorage.getItem("token"),
    };
    let { data } = await axios.get(`${Baseurl}/api/v1/cart`, {
      headers: header,
    });
    console.log(data)
    setCartData(data);
  }
  async function removeItem(id){
    let header = {
        token: localStorage.getItem("token"),
      };
    let {data} = await axios.delete(`${Baseurl}/api/v1/cart/${id}`, {
        headers: header,
      })
      setCartData(data);
  }
 
  async function updateQuntity(id,count){
    setloading(true);
    let body={
        count:count
    }
    let header = {
        token: localStorage.getItem("token"),
      };
    let {data} = await axios.put(`${Baseurl}/api/v1/cart/${id}`,body, {
        headers: header,
      })
      setCartData(data);
      setloading(false);
  }
  async function getData(){
    let {data}= await axios.get(`${Baseurl}/api/v1/products`);
    // console.log(data.data);
    setProducts(data.data);
  }
  return (
    <CartContext.Provider value={{cartData,products,loading,getData,getAllCartData,removeItem,updateQuntity}}>{props.children}</CartContext.Provider>
  );
}
