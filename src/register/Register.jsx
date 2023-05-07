import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let [errorMsg, seterrorMsg] = useState("");
  let [loading, setloading] = useState(false);
  let navigate = useNavigate();
  let Baseurl = "https://route-ecommerce.onrender.com";
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3, "min char 3").max(10, "max char 10"),
    email: Yup.string().email("enter valid email").required(),
    phone: Yup.string()
      .required()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "enter valid phone"),
    password: Yup.string()
      .required()
      .matches(/^[A-Z][A-Za-z0-9!@#$%^&*()_-]{3,10}$/, "enter valid password"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "repassword not matched"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      dataRegister(values);
    },
    validationSchema,
  });
  async function dataRegister(objData) {
    setloading(true);
    let { data } = await axios
      .post(`${Baseurl}/api/v1/auth/signup`, objData)
      .catch((errors) => {
        console.log(errors.response.data.errors.msg);
        seterrorMsg(errors.response.data.errors.msg);
        setloading(false);
      });
    setloading(false);
    console.log(data);
    if (data.message == "success") {
      ///login
      navigate("/login");
    }
  }
  return (
    <div className="">
      <div className="container py-5">
        <div className="col-md-5 m-auto rounded shadow p-3 bg-light ">
          <h2 className="mt-2 text-dark">Register Now:</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="my-3">
              <label htmlFor="name">name</label>
              <input
                onChange={formik.handleChange}
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <p className="text-danger">{formik.errors.name}</p>
            </div>
            <div className="my-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={formik.handleChange}
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
              <p className="text-danger">{formik.errors.email}</p>
            </div>
            <div className="my-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={formik.handleChange}
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <p className="text-danger">{formik.errors.password}</p>
            </div>
            <div className="my-3">
              <label htmlFor="repassword">Repassword</label>
              <input
                onChange={formik.handleChange}
                type="password"
                name="rePassword"
                id="repassword"
                className="form-control"
              />
              <p className="text-danger">{formik.errors.rePassword}</p>
            </div>
            <div className="my-3">
              <label htmlFor="phone">Phone</label>
              <input
                onChange={formik.handleChange}
                type="text"
                name="phone"
                id="phone"
                className="form-control"
              />
              <p className="text-danger">{formik.errors.phone}</p>
            </div>
            {errorMsg != "" ? (
              <div className=" alert alert-danger">{errorMsg}</div>
            ) : (
              ""
            )}
            {loading ? (
              <button type="button" className="btn btn-success my-2">
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              </button>
            ) : (
              <button
                disabled={!formik.isValid}
                type="submit"
                className="btn btn-success my-2"
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
