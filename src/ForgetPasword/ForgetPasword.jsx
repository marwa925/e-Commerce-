import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function ForgetPasword() {
    let Baseurl="https://route-ecommerce.onrender.com";
    let [flag,setflag] =useState(true);
    let [msgerror,setmsgerror] =useState("");
    let navegate =useNavigate();
    let validationSchema= Yup.object({
        email:Yup.string().required().email("Enter valid email")
    })
    let form1= useFormik({
        initialValues:{
            email:""
        },
        onSubmit : (val)=>{
            forgetPasswordApi(val)
        },
        validationSchema
    })
    let form2= useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit : (val)=>{
            resetCodeApi(val);
        },
    })

    async function forgetPasswordApi(valobj){
        let{data}= await axios.post(`${Baseurl}/api/v1/auth/forgotPasswords`,valobj)
        console.log(data);
        if(data.statusMsg == "success"){
            setflag(false)
        }
    }
    async function resetCodeApi(val){
        let{data}= await axios.post(`${Baseurl}/api/v1/auth/verifyResetCode`,val).catch((error)=>{
            console.log(error.response.data.message);
            setmsgerror(error.response.data.message);
        })
        console.log(data)
        if(data.status =='Success'){
            navegate('/resetPassword')
        }
    }
  return (
    <div className='container'>
    <div className='col-md-5 m-auto rounded shadow p-3 bg-light my-5'>
        {flag?<form onSubmit={form1.handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input onChange={form1.handleChange} type="email" name="email" id="email"  className='form-control'/>
            </div>
            <p className='text-danger'>{form1.errors.email}</p>
            <button className='btn btn-success'>send massege</button>
        </form>: <form onSubmit={form2.handleSubmit}>
            <div>
                <label htmlFor="resetCode">reset Code</label>
                <input onChange={form2.handleChange} type="text" name="resetCode" id="resetCode"  className='form-control'/>
            </div>
            {msgerror !=""?<div className='alert alert-danger'>{msgerror}</div>:""}
            
            <button className='btn btn-success my-2'>Verify code</button>
        </form>}
        

        
    </div>
    </div>
  )
}
