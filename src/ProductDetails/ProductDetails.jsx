import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function ProductDetails() {
  let navegate = useNavigate();
  let { id } = useParams();
  let Baseurl = "https://route-ecommerce.onrender.com";
  let [productDetails, setproductDetails] = useState();
  let [loading, setloading] = useState(false);
  useEffect(() => {
    getDetails();
  }, []);
  async function getDetails() {
    let { data } = await axios.get(`${Baseurl}/api/v1/products/${id}`);
    console.log(data.data);
    setproductDetails(data.data);
  }
  async function AddItemToCart(id) {
    setloading(true);
    let body = {
      productId: id,
    };
    let headers = {
      token: localStorage.getItem("token"),
    };
    let { data } = await axios.post(`${Baseurl}/api/v1/cart`, body, {
      headers,
    });
    console.log(id);
    console.log(headers);
    console.log(data);
    setloading(false);
    if (data.status == "success") {
      navegate("/cartdetails");
    }
  }
  return (
    <div className="bg-white">
      {productDetails ? (
        <div className="container py-2">
          {productDetails ? (
            <div className="row align-items-center">
              <div className="col-md-4">
                <OwlCarousel
                  className="owl-theme"
                  autoplay={true}
                  autoplayTimeout={1500}
                  loop
                  items={1}
                >
                  {productDetails.images.map((el, i) => {
                    return (
                      <div key={i}>
                        <img src={el} className="w-100" alt="" />
                      </div>
                    );
                  })}
                </OwlCarousel>
              </div>
              <div className="col-md-8 mt-2">
                <img
                  src={productDetails.brand.image}
                  className="col-2"
                  alt=""
                />
                <h2>{productDetails.title}</h2>
                <p className="text-muted">{productDetails.description}</p>
                <span className="text-success">
                  {productDetails.subcategory[0].name}
                </span>
                <div className="d-flex justify-content-between my-1">
                  <p>{productDetails.price}EGP</p>
                  <div>
                    <i className="fa-solid fa-star text-warning"></i>
                    <span>{productDetails.ratingsAverage}</span>
                  </div>
                </div>
                {loading ? (
                  <button type="button" className="btn btn-success w-100 my-2">
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => AddItemToCart(productDetails._id)}
                    className="btn btn-success w-100 my-2"
                  >
                    + Add to card
                  </button>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="z-3 d-flex vh-100 bg-light justify-content-center align-items-center">
          <i class="fa-solid fa-shopping-cart fa-bounce text-success fa-4x"></i>
        </div>
      )}
    </div>
  );
}
