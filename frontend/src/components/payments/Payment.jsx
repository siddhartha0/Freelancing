import React from "react";
import Header from "./Header";
import css from "./Payment.module.css";
import { Outlet, useLocation } from "react-router-dom";

function Payment() {
  const getRoutes = useLocation();

  return (
    <div className={css.mainDiv}>
      <aside className={css.leftDiv}>
        <Header path={getRoutes.pathname} />
        <div className={css.clientDetails}>
          <Outlet />
        </div>
      </aside>
    </div>
  );
}

export default Payment;
