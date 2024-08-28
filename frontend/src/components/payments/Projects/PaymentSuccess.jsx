import React, { useEffect } from "react";
import success from "../../../assets/success.svg";
import { Link, useParams } from "react-router-dom";
import css from "./Payment.module.css";
import Jobapi from "../../api/Jobapi";

function PaymentSuccess() {
  return (
    <div className={css.body}>
      <div className={css.card}>
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: " #F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className={css.checkmark}>✓</i>
        </div>
        <h1 className={css.h1}>Success</h1>
        <p className={css.p}>
          We received your Payment Succesfully !!!
          <br />
        </p>
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <Link
            to="/"
            style={{
              textTransform: "uppercase",
            }}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
