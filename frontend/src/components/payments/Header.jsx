import React from "react";
import css from "./Payment.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

function Header({ path }) {
  const nav = useNavigate();
  const { id } = useParams();

  return (
    <div className={css.header}>
      <IoIosArrowBack className={css.icon} />
      <div className={css.infoDiv}>
        <span
          style={
            path.endsWith(`/acceptapplication/${id}`)
              ? { color: "#ee1f04de", opacity: "1" }
              : path.endsWith("/project") || path.endsWith("/payment")
              ? { color: "green", opacity: 0.6, animation: "ease-in-out 0.5s" }
              : {}
          }
          onClick={() => nav("")}
        >
          Client Details
        </span>
        <div
          className={css.progressDiv}
          style={
            path.endsWith("/project") || path.endsWith("/payment")
              ? { background: "green", animation: "ease-in-out 5s" }
              : {}
          }
        ></div>
        <span
          style={
            path.endsWith("/project")
              ? {
                  color: "#ee1f04de",
                  opacity: "1",
                  animation: "ease-out 5s",
                }
              : path.endsWith("/payment")
              ? {
                  color: "green",
                  opacity: 0.6,
                }
              : {}
          }
          onClick={() => nav("project")}
        >
          Project Details
        </span>
      </div>
    </div>
  );
}

export default Header;
