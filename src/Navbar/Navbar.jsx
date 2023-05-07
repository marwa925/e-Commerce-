import React from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/freshcart-logo.svg";
import { CartContext } from "../ShareData/CartContext";
export default function Navbar({ userData, logOut }) {
  let { cartData, removeItem, updateQuntity } = useContext(CartContext);
  function countFun(id, count) {
    {
      {
        count == 1 ? removeItem(id) : updateQuntity(id, (count -= 1));
      }
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} className="w-100" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="products"
                  >
                    Products
                  </NavLink>
                </li>
                
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData ? (
                <>
                  <li className="nav-item py-2">
                    <i className="fa-brands fa-facebook mx-2"></i>
                    <i className="fa-brands fa-twitter mx-2"></i>
                    <i className="fa-brands fa-youtube mx-2"></i>
                    <i className="fa-brands fa-spotify mx-2"></i>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li
                    className="nav-item"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <span className="nav-link">
                      <div className="position-relative">
                        <i className="fa-solid fa-shopping-cart"></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                          {cartData?.numOfCartItems}
                        </span>
                      </div>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" style={{cursor:"pointer"}} onClick={logOut}>
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Cart Items
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cartData
            ? cartData.data.products.map((el,i) => {
                return (
                  <div className="borderDash p-2" key={i}>
                    <div className="d-flex  align-items-center">
                      <img
                        src={el.product.imageCover}
                        className="w-25 p-0"
                        style={{ objectFit: "cover" }}
                        height={150}
                        alt=""
                      />
                      <div>
                        <button
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            countFun(el.product._id, el.count);
                          }}
                          className="btn  btn-sm  rounded bg-danger text-light py-0"
                        >
                          -
                        </button>
                        <span className="mx-2">{el.count}</span>
                        <button
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            updateQuntity(el.product._id, (el.count += 1));
                          }}
                          className="btn bg-success btn-sm rounded text-light py-0"
                        >
                          +
                        </button>
                      </div>
                      <i
                        onClick={() => removeItem(el.product._id)}
                        style={{ cursor: "pointer" }}
                        className="fa-solid fa-trash text-danger fs-4"
                      ></i>
                    </div>
                    <h5>
                      {el.product.title?.split(" ").slice(0, 3).join(" ")}
                    </h5>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="offcanvas-bottom">
          <Link
            className="btn btn-success w-100 my-1"
            to={"/checkout/"+cartData?.data?._id}
          >
            CheckOut Payment
          </Link>
          <Link to="/home" className="btn btn-primary w-100 my-1">
            Add More Items{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
