import React, { useEffect, useState } from "react";
import css from "./Header.module.css";
import logo from "../../assets/companyLogo.png";
import profile from "../../assets/RightTheme.png";
import { useNavigate } from "react-router";
import { BiBell, BiSolidExit, BiSolidUser } from "react-icons/bi";
import { MdOutlineMenu } from "react-icons/md";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../slices/UserSlice";

export default function Header({ authShow, setauthShow }) {
  const nav = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [useCookie, _setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();

  const getUserDetails = localStorage.getItem("userId");

  const logOut = () => {
    _setCookie("token", null);
    localStorage.removeItem("userId");
    setShowMenu(false);
    dispatch(removeCredentials());
  };

  return (
    <div className={css.head}>
      <div className={css.left}>
        <img src={logo} alt="" className={css.logo} />
      </div>

      <div className={css.middle}>
        <a href="#home">Home</a>
        <a href="#service">Services</a>
        <a href="#about">About us</a>
      </div>

      <div className={css.right}>
        {!getUserDetails ? (
          <button className={css.btn} onClick={() => setauthShow(true)}>
            Register
          </button>
        ) : (
          <div className={css.loggedDiv}>
            <img
              src={profile}
              alt=""
              className={css.img}
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        )}
      </div>

      <div className={css.smallScreenDiv}>
        <MdOutlineMenu className={css.icon} />
      </div>

      {showMenu && (
        <div className={css.menuOption}>
          <div className={css.duoDiv}>
            <BiSolidUser className={css.icon} />
            <article onClick={() => nav("/profile")}>Profile</article>
          </div>

          <div className={css.duoDiv}>
            <BiBell className={css.icon} />
            <article onClick={() => nav("/notify")}>Notification</article>
          </div>
          <div className={css.duoDiv} onClick={() => logOut()}>
            <BiSolidExit className={css.icon} />
            <article>Log Out</article>
          </div>
        </div>
      )}
    </div>
  );
}
