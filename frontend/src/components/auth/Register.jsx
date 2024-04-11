import React, { useEffect, useState } from "react";
import css from "./LogIn.module.css";
import { BiSolidLock } from "react-icons/bi";

import {
  RiAccountBoxFill,
  RiErrorWarningLine,
  RiEyeFill,
  RiEyeOffFill,
  RiMailFill,
} from "react-icons/ri";

import AuthApi from "../api/AuthApi";

function Register() {
  const [alertPwd, setalertPwd] = useState(false);
  const [pwdStatus, setPwdStatus] = useState(false);
  const [registerMsg, setRegisterMsg] = useState(false);
  const [alertConfirmPwd, setalertConfirm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    pwd: "",
    rePwd: "",
  });

  useEffect(() => {
    const checkPwd = () => {
      // console.log(userDetails.pwd === userDetails.rePwd);
      if (
        userDetails.pwd.trim().toLowerCase() ===
        userDetails.rePwd.trim().toLowerCase()
      ) {
        setPwdStatus(true);
      } else {
        setPwdStatus(false);
      }
    };
    checkPwd();
  }, [userDetails.pwd, userDetails.rePwd, pwdStatus]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserDetails({ ...userDetails, [e.target.name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    if (pwdStatus && userDetails.email && userDetails.name) {
      setRegisterMsg(true);
      setTimeout(() => {
        setRegisterMsg(false);
      }, 1500);
      await AuthApi.register(userDetails);
    }
  };

  return (
    <div className={css.container}>
      <form className={css.formDiv} onSubmit={register}>
        <header>Create Account</header>
        <article className={css.article}>Create a better career</article>

        <div className={css.duoDiv}>
          <RiAccountBoxFill className={css.icon} />

          <input
            type="text"
            className={css.input}
            placeholder="Enter your username"
            name="name"
            value={userDetails.name}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={css.duoDiv}>
          <RiMailFill className={css.icon} />

          <input
            type="text"
            className={css.input}
            placeholder="Enter your Mail"
            name="email"
            value={userDetails.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={css.duoDiv}>
          <BiSolidLock className={css.icon} />
          <input
            type={alertPwd ? "text" : "password"}
            className={css.input}
            placeholder="Enter the password"
            name="pwd"
            value={userDetails.pwd}
            onChange={(e) => handleChange(e)}
          />
          <RiEyeFill
            className={css.icon}
            onClick={() => setalertPwd(!alertPwd)}
            style={
              alertPwd
                ? { display: "none" }
                : {
                    cursor: "pointer",
                  }
            }
          />

          {alertPwd && (
            <RiEyeOffFill
              className={css.icon}
              style={{ cursor: "pointer" }}
              onClick={() => setalertPwd(!alertPwd)}
            />
          )}
        </div>

        <div className={css.duoDiv}>
          <BiSolidLock className={css.icon} />
          <input
            type={alertConfirmPwd ? "text" : "password"}
            className={css.input}
            placeholder="Confirm Password"
            name="rePwd"
            value={userDetails.rePwd}
            onChange={(e) => handleChange(e)}
          />
          <RiEyeFill
            className={css.icon}
            onClick={() => setalertConfirm(!alertConfirmPwd)}
            style={
              alertConfirmPwd
                ? { display: "none" }
                : {
                    cursor: "pointer",
                  }
            }
          />

          {alertConfirmPwd && (
            <RiEyeOffFill
              className={css.icon}
              style={{ cursor: "pointer" }}
              onClick={() => setalertConfirm(!alertConfirmPwd)}
            />
          )}
        </div>

        <button
          style={
            userDetails.email && userDetails.name && pwdStatus
              ? {}
              : { cursor: "not-allowed", opacity: ".3" }
          }
          className={css.btn}
          type="submit"
        >
          Register
        </button>

        {registerMsg && (
          <article className={css.msgarticle}>
            User has been registered.
          </article>
        )}

        {!pwdStatus && (
          <div className={css.duoalertDiv}>
            <RiErrorWarningLine />
            <article>Please type the same password</article>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
