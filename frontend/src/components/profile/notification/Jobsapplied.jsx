import React, { useEffect, useState } from "react";
import css from "./Notification.module.css";
import Userapi from "../../api/Userapi";
function Jobsapplied({ yourappliedJobs, userID }) {
  useEffect(() => {
    console.log(yourappliedJobs);
    yourappliedJobs.map((job) => console.log(job.acceptedClientId));
    console.log(userID);
  }, []);
  // console.log(userID);
  return (
    <div className={css.mainDiv}>
      <div className={css.startDiv}>
        <div className={css.headDiv}>
          <article>Job Bio</article>

          <article>Skills Needed</article>
          <article>Salary</article>
          <article>Status</article>
        </div>
        <hr />

        {yourappliedJobs.length > 0 ? (
          yourappliedJobs.map((jobs, i) => (
            <div className={css.detailDiv} key={i}>
              <div className={css.bioDiv}>
                <header>{jobs.postTitle}</header>
                <article>Xinu</article>
                <article>Sent 10 hours ago</article>
              </div>

              <div className={css.skillDiv}>
                {jobs.skills.map((skill, i) => (
                  <article key={i}>{skill.skills}</article>
                ))}
              </div>

              <div className={css.salaryDiv}>
                <article>$</article>
                <article>{jobs.salary}</article>
              </div>

              <div className={css.resultDiv}>
                <article>
                  {jobs.acceptedClientId
                    ? jobs.acceptedClientId === userID
                      ? "Accepted"
                      : "Rejected"
                    : "Pending"}
                </article>
              </div>

              <div className={css.actionDiv}>
                <button className={css.btn}>Delete</button>
                <button className={css.btn}>Contact</button>
              </div>
            </div>
          ))
        ) : (
          <article>You haven't applied to any jobs yet.</article>
        )}
        <hr />
      </div>

      {!yourappliedJobs && (
        <div className={css.emptyDiv}>
          <article>You haven't applied for any jobs yet</article>
        </div>
      )}
    </div>
  );
}

export default Jobsapplied;
