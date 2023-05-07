import { CartContext } from '../ShareData/CartContext';
import  axios from 'axios'
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
export default function Products() {
  let navegate= useNavigate();
  let {products,getData} =useContext(CartContext);
  let Baseurl="https://route-ecommerce.onrender.com";
  useEffect(()=>{
    getData();
  },[])
  async function AddItemToCart(id){
    let body= {
      productId:id
    }
    let headers={
      token:localStorage.getItem('token')
    }
    let {data} = await axios.post(`${Baseurl}/api/v1/cart`,body,{headers});
    console.log(id);
    console.log(headers);
    console.log(data);
    if(data.status=='success'){
      navegate('/cartdetails');
    }
  }
  return (
    <div className='bg-white'>
    {products[0]?<div>
      <div className="container"> 
        <div className='row g-3 py-5'>
      {products.map((el,i)=>{
        return <div key={i} className='col-md-3 products'>
          <Link to={'/productDetails/'+el._id}>
            <div className=' borders shadow rounded p-3 '>
              <img src={el.imageCover} className='w-100' alt="" />
              <h2 className='h6 fw-bold my-1'>{el.title.split(" ").slice(0,2).join(" ")}</h2>
              <span className='text-success'>{el.brand.name}</span>
              <div className='d-flex justify-content-between my-1'>
                <p>{el.price}EGP</p>
                <div>
                  <i className='fa-solid fa-star text-warning'></i>
                  <span>{el.ratingsAverage}</span>
                </div>
              </div>
              <button onClick={()=>AddItemToCart(el._id)} className='btnCard btn btn-success m-auto '>+ Add to card</button>
            </div>
          </Link>
      </div>
      })}
      

        </div>
        
    </div>
    </div>:<div className='z-3 d-flex vh-100 bg-light justify-content-center align-items-center'>
    <i class="fa-solid fa-shopping-cart fa-bounce text-success fa-4x"></i>
        </div>}
    </div>
    
  )
}
