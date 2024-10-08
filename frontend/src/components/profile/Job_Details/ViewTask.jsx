import React from "react";
import css from "./ViewPdf.module.css";
import { useParams } from "react-router";

function ViewTask() {
  const pdf = useParams();
  const REACT_APP_PUBLIC_FOLDER = "http://localhost:3333/task/";

  return (
    <div className={css.mainDiv}>
      <iframe
        src={REACT_APP_PUBLIC_FOLDER + pdf.pdf}
        style={{ height: "100vh", width: "100vw" }}
      ></iframe>
    </div>
  );
}

export default ViewTask;
