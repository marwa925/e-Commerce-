import axios from "axios";
import { useFormik } from "formik";
import React , { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
export default function CheckOut() {
  let [loading, setloading] = useState(false);
  let Baseurl = "https://route-ecommerce.onrender.com";
  let {cardId} = useParams();
  let validationSchema=Yup.object({
      details:Yup.string().required().matches(/^[a-zA-Z]{3,30}$/,"enter details from 3 to 30 letter"),
      phone:Yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/,"enter valid phone"),
      city:Yup.string().required().matches(/^[a-zA-z]{3,10}$/,"enter valid city")
    })

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (vals) => {
      console.log(vals);
      check(vals,cardId)
    },
    validationSchema,
  });
  async function check(vals, id) {
    let body = {
      vals: vals,
    };
    let headers = {
      token: localStorage.getItem("token"),
    };
    setloading(true);
    let { data } = await axios.post(
      `${Baseurl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/#/`,
      body,
      { headers }
    );
    setloading(false);
    console.log(data);
    if(data.status=="success"){
        window.open(data.session.url,"_self")
    }
  }
  return (
    <div>
      <div className="container">
        <div className="col-md-5 m-auto rounded shadow p-3 bg-light my-5">
          <h2 className="text-dark fw-bold">Prepare For Payment </h2> <hr />
          <form onSubmit={formik.handleSubmit}>
            <div className="my-2">
              <label htmlFor="details">details</label>
              <input
                onChange={formik.handleChange}
                type="text"
                id="details"
                name="details"
                className="form-control"
              />
              <p className="text-danger">{formik.errors.details}</p>
            </div>
            <div className="my-2">
              <label htmlFor="phone">phone</label>
              <input
                onChange={formik.handleChange}
                type="text"
                id="phone"
                name="phone"
                className="form-control"
              />
                            <p className="text-danger">{formik.errors.phone}</p>
            </div>
            <div className="my-2">
              <label htmlFor="city">city</label>
              <input
                onChange={formik.handleChange}
                type="text"
                id="city"
                name="city"
                className="form-control"
              />
                            <p className="text-danger">{formik.errors.city}</p>
            </div>
            {loading?<button type="button" className="btn btn-success my-2">
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              </button> :<button className="btn btn-success" type="submit">
              Pay
            </button>}
            
          </form>
        </div>
      </div>
    </div>
  );
}
