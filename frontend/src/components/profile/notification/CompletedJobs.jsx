import React from "react";
import css from "./Notification.module.css";

function CompletedJobs({ finishedProjects }) {
  return (
    <div className={css.historyDiv}>
      {finishedProjects.length > 0 ? (
        finishedProjects?.map((project, i) => (
          <div className={css.history}>
            <div className={css.historyHeadDiv}>
              <header>{project.postTitle}</header>
            </div>
            <hr />
            <div className={css.historyBody}>
              <div className={css.historyDuoDiv}>
                <article>Project Owner :</article>
                <article>Xinu</article>
              </div>

              <div className={css.historyDuoDiv}>
                <article>Project Started :</article>
                <article>11th Sep 2023</article>
              </div>

              <div className={css.historyDuoDiv}>
                <article>Project Ended :</article>
                <article>11th Nov 2023</article>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            marginTop: "2rem",
            marginLeft: "2rem",
          }}
        >
          <p>No jobs completed yet</p>
        </div>
      )}
    </div>
  );
}

export default CompletedJobs;
