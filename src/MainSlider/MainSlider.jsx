import React from "react";
import { Link } from 'react-router-dom';
export default function MainSlider() {
  return (
    <>

      <div>
        <div className="header">
          <div className=" vh-100 w-50 justify-content-center d-flex align-items-center px-md-5">
            <div>
              <h1>Winter Sale 50%</h1>
              <h2>
                <i class="fa-solid fa-asterisk"></i> Special Offer{" "}
                <i class="fa-solid fa-asterisk"></i>
              </h2>
              <p className="parhome my-2">
                Last chance with 70% off all sale style.
                <br /> Don't miss out!
              </p>
              <p className="text-center my-3">
                
                <Link to="/products" className="btn btn-dark px-3 fs-5">
                  Get Chance <i class="fa-solid fa-arrow-down fa-bounce"></i>
                </Link>
                <br/><br/>
              </p>
            </div>
   
          </div>
        </div>
      </div>
    </>
  );
}
