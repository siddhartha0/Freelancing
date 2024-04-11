import React from "react";
import css from "./Notification.module.css";
import { useNavigate } from "react-router";

function PendingJobs({ assignedJob }) {
  const nav = useNavigate();
  return (
    <div className={css.jobsDiv}>
      <div className={css.headDiv}>
        <article>Job Details</article>
        <article>Started Date</article>
        <article>Deadline Date</article>
      </div>

      {assignedJob.length > 0 ? (
        assignedJob.map((job, i) => (
          <div className={css.jobBody} key={i}>
            <div className={css.jobDetailsDiv}>
              <header>{job.postTitle}</header>
              <article>Xinu</article>
              <article>{job.postDescription}</article>
            </div>

            <div className={css.dateDiv}>
              <article>19 Jan, 2023</article>
            </div>

            <div className={css.dueDiv}>
              <article>19 May, 2023</article>
            </div>

            <div className={css.actionDiv}>
              <button
                className={css.btn}
                onClick={() => nav(`/pendingJob/${job._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <article>Nothing to show here.</article>
      )}
    </div>
  );
}

export default PendingJobs;
