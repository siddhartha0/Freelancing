import React, { useEffect, useRef, useState } from "react";
import css from "./ShowJob.module.css";
import { IoFilterOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import CalculateTime from "../CalculateTime";
import { useSelector } from "react-redux";
import { getJobsPost } from "../../slices/PostSlice";
import { getUser } from "../../slices/UserSlice";
import { recommend } from "../../payments/utils/Helper";

function ShowJob({ searchInput }) {
  const job = useSelector(getJobsPost);
  const nav = useNavigate();
  const [showJobs, setShowJobs] = useState();
  const [getFilterOption, setFilterOption] = useState(false);
  const [status, setStatus] = useState("Recently Posted");
  const user = useSelector(getUser);

  const ref = useRef();

  const clickOutSide = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setFilterOption(false);
    }
  };
  useEffect(() => {
    const getJob = job.jobs.filter((job) => !job.acceptedClientId);
    setShowJobs(getJob);

    document.addEventListener("mousedown", clickOutSide);
    return () => document.removeEventListener("mousedown", clickOutSide);
  }, [job]);

  const filterByLatestJobs = () => {
    const getJob = job.jobs.filter((job) => !job.acceptedClientId);
    setShowJobs(getJob);
    setStatus("Recently posted");
  };

  const filterByRecentlyaccepted = () => {
    const filterJob = job.jobs.filter((job) => job.acceptedClientId);
    setShowJobs(filterJob);
    setStatus("Taken jobs");
  };

  const recomendToUser = () => {
    const userSkills = user.skill[0].skill;
    const getJob = job.jobs.filter((job) => !job.acceptedClientId);

    const jobs = recommend(userSkills, getJob);
    setShowJobs(jobs);
    setStatus("Recommended Jobs");
  };

  return (
    <div className={css.container}>
      <div className={css.topDiv}>
        <div className={css.iconDiv} onClick={() => setFilterOption(true)}>
          <IoFilterOutline className={css.icon} />
          <span>Filter</span>
        </div>

        {getFilterOption && (
          <div
            className={css.optionDiv}
            ref={ref}
            onClick={() => setFilterOption(false)}
          >
            <p onClick={recomendToUser}>Recommended</p>
            <p onClick={filterByLatestJobs}>Latest Jobs</p>
            <p onClick={filterByRecentlyaccepted}>Recently Taken</p>
          </div>
        )}
      </div>

      <article
        style={{
          alignSelf: "flex-end",
          fontWeight: 500,
          textTransform: "capitalize",
        }}
      >
        {status}
      </article>

      <div className={css.leftDiv}>
        {showJobs?.length >= 1 ? (
          showJobs
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
            ))
        ) : (
          <article>No Job in this section</article>
        )}
      </div>
    </div>
  );
}

export default ShowJob;
