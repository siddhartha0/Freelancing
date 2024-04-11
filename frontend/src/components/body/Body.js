import React from "react";
import css from "./Body.module.css";
import theme from "../../assets/mainTheme.png";
import reactTheme from "../../assets/react.png";
import node from "../../assets/node.png";
import mongoo from "../../assets/mongoo.png";
import express from "../../assets/express.png";
import { useNavigate } from "react-router";

export default function Body() {
  const nav = useNavigate();
  return (
    <div className={css.body}>
      <div className={css.left}>
        <p className={css.leftSentence}>
          Find Your Dream <span>Job</span>
        </p>

        <p className={css.leftSecSentence}>
          Build your promising career with us.
        </p>

        <p className={css.leftThirdSentence}>Learn & work with experts. </p>

        <div className={css.btnDiv}>
          <button className={css.btn} onClick={() => nav("/searchJob")}>
            Search For Job
          </button>
          <button className={css.btn} onClick={() => nav("/post")}>
            Post a Job
          </button>
        </div>
      </div>

      <div className={css.right}>
        <img src={theme} alt="" className={css.mainTheme} />
        <img src={reactTheme} alt="" className={css.reactTheme} />
        <img src={node} alt="" className={css.nodeTheme} />
        <img src={mongoo} alt="" className={css.mongooTheme} />
        <img src={express} className={css.expressTheme} alt="" />
      </div>
    </div>
  );
}
