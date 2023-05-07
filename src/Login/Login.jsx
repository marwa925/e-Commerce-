import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ saveUserData }) {
  let [errorMsg, seterrorMsg] = useState("");
  let [loading, setloading] = useState(false);
  let navigate = useNavigate();
  let Baseurl = "https://route-ecommerce.onrender.com";
  let validationSchema = Yup.object({
    email: Yup.string().email("enter valid email").required(),
    password: Yup.string()
      .required()
      .matches(/^[A-Z][A-Za-z0-9!@#$%^&*()_-]{3,10}$/, "enter valid password"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dataLogin(values);
    },
    validationSchema,
  });
  async function dataLogin(objData) {
    setloading(true);
    let { data } = await axios
      .post(`${Baseurl}/api/v1/auth/signin`, objData)
      .catch((errors) => {
        console.log(errors.response.data.message);
        seterrorMsg(errors.response.data.message);
        setloading(false);
      });
    setloading(false);
    console.log(data);
    if (data.message == "success") {
      ///home
      localStorage.setItem("token", data.token);
      saveUserData(data.user);
      navigate("/home");
    }
  }
  return (
    <div className="">
      <div className="container">
        <div className="col-md-5 m-auto rounded shadow p-3 bg-light my-5">
          <h2 className="mt-2 text-dark">Login Now:</h2>
          <form onSubmit={formik.handleSubmit}>
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
            <Link to="/forgetpassword">Forget Password</Link> <br />
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
              <button type="submit" className="btn btn-success my-2">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
