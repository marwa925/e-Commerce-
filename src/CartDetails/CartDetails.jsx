import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { CartContext } from "../ShareData/CartContext";
import { Link, NavLink } from "react-router-dom";
export default function CartDetails() {
  let { cartData, getAllCartData, removeItem, updateQuntity, loading } =
    useContext(CartContext);

  useEffect(() => {
    getAllCartData();
  }, []);
  function countFun(id, count) {
    {
      count == 1 ? removeItem(id) : updateQuntity(id, (count -= 1));
    }
  }
  return (
    <>
      {cartData ? (
        <div className="container">
          {cartData ? (
            <>
              <div className="my-3 text-end">
                <button disabled className="btn btn-danger rounded-pill">
                  {" "}
                  Total Price: {cartData.data.totalCartPrice} EGP
                </button>
              </div>
              <div className="row g-3 my-3">
                {cartData.data.products.map((el) => {
                  return (
                    <>
                      <div className="col-md-3">
                        <div className="bg-light rounded  p-3 shadow lh-lg">
                          <img
                            src={el.product.imageCover}
                            className="w-100 p-0"
                            style={{ objectFit: "cover" }}
                            height={200}
                            alt=""
                          />
                          <div className="py-2">
                            <table className="table table-sm py-2">
                              <tbody>
                                <tr>
                                  <th>name</th>
                                  <td>:</td>
                                  <td>
                                    {el.product.title
                                      ?.split(" ")
                                      .slice(0, 3)
                                      .join(" ")}
                                  </td>
                                </tr>
                                <tr>
                                  <th>quantity</th>
                                  <td>:</td>
                                  <td>
                                    {loading ? (
                                      <button
                                        type="button"
                                        className="btn bg-danger btn-sm rounded text-light py-0"
                                      >
                                        <i className="fa-solid fa-spinner fa-spin text-white"></i>
                                      </button>
                                    ) : (
                                      <button
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          countFun(el.product._id, el.count);
                                        }}
                                        className="btn  btn-sm  rounded bg-danger text-light py-0"
                                      >
                                        -
                                      </button>
                                    )}

                                    <span className="mx-2">{el.count}</span>
                                    {loading ? (
                                      <button
                                        type="button"
                                        className="btn bg-success btn-sm rounded text-light py-0"
                                      >
                                        <i className="fa-solid fa-spinner fa-spin text-white"></i>
                                      </button>
                                    ) : (
                                      <button
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          updateQuntity(
                                            el.product._id,
                                            (el.count += 1)
                                          );
                                        }}
                                        className="btn bg-success btn-sm rounded text-light py-0"
                                      >
                                        +
                                      </button>
                                    )}
                                  </td>
                                </tr>

                                <tr>
                                  <th>price</th>
                                  <td>:</td>
                                  <td>{el.price} EGP</td>
                                </tr>
                                <tr>
                                  <th>Remove</th>
                                  <td>:</td>
                                  <td>
                                    <i
                                      onClick={() => removeItem(el.product._id)}
                                      style={{ cursor: "pointer" }}
                                      className="fa-solid fa-trash text-danger fs-4"
                                    ></i>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <Link
                className="btn btn-success my-2"
                to={"/checkout/" + cartData.data._id}
              >
                CheckOut Payment
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="z-3 d-flex vh-100 bg-light justify-content-center align-items-center">
          <i class="fa-solid fa-shopping-cart fa-bounce text-success fa-4x"></i>
        </div>
      )}
    </>
  );
}
