import React, { useState } from "react";
import css from "./LogIn.module.css";
import { RiAccountBoxFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { BiSolidLock } from "react-icons/bi";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import AuthApi from "../api/AuthApi";

function Login({ setauthShow }) {
  const [alertPwd, setalertPwd] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
  });
  const [loadingalert, setloadingalert] = useState(false);

  const [_, setCookies] = useCookies(["token"]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserDetails({ ...userDetails, [e.target.name]: value });
  };

  const logIn = async (e) => {
    e.preventDefault();
    setloadingalert(true);
    if (userDetails.name && userDetails.password) {
      const response = await AuthApi.login(userDetails);

      if (response.data.msg === "User has been logged in successfully.") {
        const token = response.data.token;
        setCookies("token", token);
        localStorage.setItem("userId", JSON.stringify(response.data.userId));
        setloadingalert(false);
        setauthShow(false);
      } else {
        console.log(response.data);
        toast.error(response.data.msg);
      }
    }
    setloadingalert(false);
  };

  return (
    <div className={css.container}>
      <form className={css.formDiv} onSubmit={logIn}>
        {loadingalert && (
          <div className={css.loadingDiv}>
            <RotatingLines
              visible={true}
              height="36"
              width="36"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}

        <header>Sign In With Us</header>

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
          <BiSolidLock className={css.icon} />
          <input
            type={alertPwd ? "text" : "password"}
            className={css.input}
            placeholder="Enter the password"
            name="password"
            value={userDetails.password}
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

        <p>Forget Password ?</p>

        <button
          className={css.btn}
          type="submit"
          style={
            userDetails.name && userDetails.password
              ? {}
              : {
                  cursor: "not-allowed",
                  opacity: 0.3,
                }
          }
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
