import React, { useEffect, useState } from "react";
import "./BillingPageBody.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Required at least 2 letters")
    .max(50, "Required maximum 50 letters")
    .required("First Name Is Required"),
  companyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  streetAddress: Yup.string().email("Invalid email").required("Required"),
  apartment: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  townCity: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  emailAddress: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
function ShoppingCartBody() {
  const [subTotal, setSubTotal] = useState(0);
  const [itemList, setItemList] = useState([]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phoneNumber: "",
      emailAddress: "",
      couponCode: "",
      paymentMethod: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      axios
        .post("https://66b0ab0f6a693a95b539b080.mockapi.io/orders", {
          ...values,
          isBank: true,
          isCashOnDelivery: false,
          subTotal: subTotal,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
  useEffect(() => {
    let subTotalOverall = 0;

    const processData = () => {
      const cartList = JSON?.parse(localStorage?.getItem("cartList"));
      let cartItemList = [];
      let quantityCartList = {};

      cartList.forEach((product) => {
        subTotalOverall += Number(product.price);
        if (quantityCartList[product.title]) {
          quantityCartList[product.title].push(product);
        } else {
          quantityCartList[product.title] = [product];
        }
      });
      for (const [key, value] of Object.entries(quantityCartList)) {
        cartItemList.push([key, value]);
      }
      setSubTotal(subTotalOverall);
      setItemList(cartItemList);
    };
    processData();
  }, []);

  return (
    <div className=" shopping-cart">
      <form onSubmit={formik.handleSubmit}>
        <ul className="breadcrumb text-left">
          <li>Account</li>
          <li>My Account</li>
          <li>Product</li>
          <li>View Cart</li>
          <li>Checkout</li>
        </ul>
        <div className="flex">
          <div className="flex words-left">
            <div>
              <h1 className="billing-details">Billing Details</h1>
              <div>
                <div>First Name</div>
                <input
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />

                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.firstName && (
                      <div>{formik.errors.firstName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Company Name</div>
                <input
                  id="companyName"
                  name="companyName"
                  type="companyName"
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.companyName && (
                      <div>{formik.errors.companyName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div
                  id="companyName"
                  name="companyName"
                  type="companyName"
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                >
                  Street Address
                </div>
                <input />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.companyName && (
                      <div>{formik.errors.companyName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Apartment, floor .etc. {"(optional)"}</div>
                <input
                  id="apartment"
                  name="apartment"
                  type="apartment"
                  onChange={formik.handleChange}
                  value={formik.values.apartment}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.apartment && (
                      <div>{formik.errors.apartment}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Town/City</div>
                <input
                  id="townCity"
                  name="townCity"
                  type="townCity"
                  onChange={formik.handleChange}
                  value={formik.values.townCity}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.townCity && (
                      <div>{formik.errors.townCity}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Phone Number</div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.phoneNumber && (
                      <div>{formik.errors.phoneNumber}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Email Address</div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="emailAddress"
                  onChange={formik.handleChange}
                  value={formik.values.emailAddress}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.emailAddress && (
                      <div>{formik.errors.emailAddress}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex">
                <input className="save-this-info" type="checkbox" />

                <div className="mt-auto">
                  Save this information for faster check-out next time
                </div>
              </div>
            </div>
          </div>
          <div className="ml-64">
            {itemList.length &&
              itemList.map((item) => {
                return (
                  <div className="flex item-card">
                    <img src={item[1][0].img} className="item-image" />
                    <div>{item[1][0].title + " x " + item[1].length}</div>
                    <div className="price">
                      {Number(item[1][0].price) * item[1].length + " $"}
                    </div>
                  </div>
                );
              })}
            <div className="flex item-card border-grey">
              <div>Subtotal:</div>
              <div className="price">
                {Number(Math.round(subTotal * 100) / 100) + " $"}
              </div>
            </div>
            <div className="flex item-card border-grey">
              <div>Shipping:</div>
              <div className="price">Free</div>
            </div>
            <div className="flex item-card">
              <div>Total:</div>
              <div className="price">
                {Number(Math.round(subTotal * 100) / 100) + " $"}
              </div>
            </div>

            <div className="flex mb-6">
              <input
                type="radio"
                name="paymentMethod"
                value="banking"
                className="mt-auto"
              />
              <div className="ml-2 mt-auto">Bank</div>
              <div className="flex image-box">
                <img src="./public/icons/payment-methods/Bkash.png" />
                <img src="./public/icons/payment-methods/Visa.png" />
                <img src="./public/icons/payment-methods/Mastercard.png" />
                <img src="./public/icons/payment-methods/Nagad.png" />
              </div>
            </div>

            <div className="flex mb-6">
              <input name="paymentMethod" value="cashOnDelivery" type="radio" />
              <div className="ml-2">Cash On Delivery</div>
            </div>
            <div className="flex">
              <input
                className="coupon-input"
                placeholder="Coupon Code"
                id="couponCode"
                name="couponCode"
                type="couponCode"
                onChange={formik.handleChange}
                value={formik.values.couponCode}
              />
              <button className="button-style apply">Apply Coupon</button>
            </div>
            <div className="flex">
              <button className="button-style" type="submit">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShoppingCartBody;
