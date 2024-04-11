import React, { useState } from "react";
import css from "./Layout.module.css";
import Login from "./Login";
import Register from "./Register";
import logo from "../../assets/companyLogo.png";

function Layoutauth({ setauthShow }) {
  const [switchaction, setswitch] = useState(false);

  return (
    <div className={css.container}>
      <div className={css.topDiv}>
        <p onClick={() => setswitch(!switchaction)}>Login</p>
        <div className={css.borderDiv}></div>
        <p onClick={() => setswitch(!switchaction)}>Register</p>
      </div>

      <div
        className={css.login}
        style={switchaction ? { display: "none" } : {}}
      >
        <div className={css.leftDiv}>
          <img src={logo} alt="" className={css.logo} />
          <p>Welcome Back</p>
          <article>
            Infinite Jobs are waiting for you. Show your skills & earn what you
            are capable of.
          </article>
        </div>

        <div className={css.loginDiv}>
          <Login setauthShow={setauthShow} />
        </div>
      </div>

      {switchaction && (
        <div className={css.register}>
          <div className={css.registerDiv}>
            <Register />
          </div>
          <div className={css.rightDiv}>
            <img src={logo} alt="" className={css.logo} />
            <p>Hello, There!!</p>
            <article>
              Build your career with our experts. Connect, learn & earn from the
              best in the game.
            </article>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layoutauth;
