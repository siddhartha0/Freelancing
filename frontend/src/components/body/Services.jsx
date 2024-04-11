import React from "react";
import css from "./Service.module.css";
import { RiAccountBoxFill, RiSearchLine, RiCloudFill } from "react-icons/ri";
import ServiceFeatures from "./ServiceFeatures";

export default function Services() {
  return (
    <div className={css.service}>
      <div className={css.boxDiv}>
        <div className={css.firstBox}>
          <RiAccountBoxFill className={css.icon} />
          <header>Create Account</header>
          <p>Create high level profile so company could hire you easily.</p>
        </div>
        <div className={css.secondBox}>
          <RiSearchLine className={css.icon} />

          <header>Search for job</header>
          <p>Search for the job you love to do.</p>
        </div>
        <div className={css.thirdBox}>
          <RiCloudFill className={css.icon} />
          <header>CV</header>
          <p>Apply for the job with your cv.</p>
        </div>
      </div>

      <div className={css.serviceFeatures}>
        <ServiceFeatures />
      </div>
    </div>
  );
}
