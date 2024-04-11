import React from "react";
import css from "./ShowJob.module.css";
import { IoFilterOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import CalculateTime from "../CalculateTime";
import { useSelector } from "react-redux";
import { getJobsPost } from "../../slices/PostSlice";

function ShowJob({ searchInput }) {
  const job = useSelector(getJobsPost);
  const nav = useNavigate();
  console.log(job.jobs);

  return (
    <div className={css.container}>
      <div className={css.topDiv}>
        <IoFilterOutline className={css.icon} />
        <span>Filter</span>
      </div>
      <div className={css.leftDiv}>
        {job.jobs &&
          job.jobs
            .filter((job) =>
              job.postTitle.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((jobs, i) => (
              <div
                className={css.resultDiv}
                key={jobs._id}
                onClick={() => nav(`/jobDetails/${jobs._id}`)}
              >
                <div className={css.leftResult}>
                  <header>{jobs.postTitle}</header>
                  <p>{jobs.postDescription.substring(0, 50) + "..."}</p>

                  <div className={css.skillDiv}>
                    {jobs.skills.map((skill, i) => (
                      <span key={i}>{skill.skills}</span>
                    ))}
                  </div>

                  <div>
                    <CalculateTime time={jobs.postedDate} />
                  </div>
                </div>

                <div className={css.rightResult}>
                  <span>Salary</span>
                  <p>
                    $ <span>{jobs.salary}</span>
                  </p>
                  <span>{jobs.salaryStatus}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ShowJob;
