import React, { useState } from "react";
import css from "./Layout.module.css";
import Header from "./header/Header";
import Body from "./body/Body";
import Services from "./body/Services";
import Layoutauth from "./auth/Layoutauth";
import { RiCloseFill } from "react-icons/ri";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  const [authShow, setauthShow] = useState(false);

  return (
    <div className={css.layout}>
      <div
        className={css.head}
        style={authShow ? { filter: "blur(2rem)", zIndex: "-1" } : {}}
      >
        <Header authShow={authShow} setauthShow={setauthShow} />
      </div>

      <div
        className={css.body}
        style={
          authShow
            ? {
                filter: "blur(2rem)",
                position: "fixed",
                zIndex: "-1",
              }
            : {}
        }
      >
        <Toaster />
        <Body />
        <Services />
      </div>

      {authShow && (
        <div className={css.auth}>
          <RiCloseFill
            className={css.icon}
            onClick={() => setauthShow(false)}
          />
          <Layoutauth setauthShow={setauthShow} />
        </div>
      )}
    </div>
  );
}
