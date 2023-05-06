import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";

export default function CheckOut() {
  let Baseurl = "https://route-ecommerce.onrender.com";
  let {cardId} = useParams();
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
  });
  async function check(vals, id) {
    let body = {
      vals: vals,
    };
    let headers = {
      token: localStorage.getItem("token"),
    };
    let { data } = await axios.post(
      `${Baseurl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/#/`,
      body,
      { headers }
    );
    console.log(data);
    if(data.status=="success"){
        window.open(data.session.url,"_self")
    }
  }
  return (
    <div>
      <div className="container">
        <div className="col-md-5 m-auto rounded shadow p-3 bg-light my-5">
          <h5 className="text-dark fw-bold">Prepare For Payment </h5> <hr />
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
            </div>
            <button className="btn btn-primary" type="submit">
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
