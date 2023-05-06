import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
    let navigate=useNavigate();
  let Baseurl="https://route-ecommerce.onrender.com";
  let validationSchema= Yup.object(
    {
      email:Yup.string().email("enter valid email").required(),
      newPassword:Yup.string().required().matches(/^[A-Z][A-Za-z0-9!@#$%^&*()_-]{3,10}$/,"enter valid password"),
    }
  )
  let formik= useFormik({
    initialValues:{
      email:"",
      newPassword:"",
    },
    onSubmit:(values)=>{
        resetPasswordApi(values);
    },
    validationSchema,
  })
  async function resetPasswordApi(objData){
    let {data}= await axios.put(`${Baseurl}/api/v1/auth/resetPassword`,objData)
    console.log(data)

    if(data.token){
        navigate("/login")
    }
  }
  return (
    <form onSubmit={formik.handleSubmit}>
        <div className='my-3'>
          <label htmlFor="email">Email</label>
          <input onChange={formik.handleChange} type="email" name="email" id="email" className='form-control'/>
          <p className='text-danger'>{formik.errors.email}</p>
        </div>
        <div className='my-3'>
          <label htmlFor="newPassword">newPassword</label>
          <input onChange={formik.handleChange} type="password" name="newPassword" id="newPassword" className='form-control'/>
          <p className='text-danger'>{formik.errors.newPassword}</p>
          <button   className='btn btn-success'>Reset</button>
        </div>
    </form>
  )
}
