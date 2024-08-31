import React, { useEffect, useState } from "react";
import css from "./applicants.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import pics from "../../../assets/noUser.png";
import applicationapi from "../../api/applicationapi";
import { useNavigate } from "react-router";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import Jobapi from "../../api/Jobapi";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getJobsPost } from "../../slices/PostSlice";

export default function ApplicantsPage({
  setShowapplicants,
  jobId,
  selectedJobDetails,
}) {
  const [jobDetails, setJobDetails] = useState([]);
  const job = useSelector(getJobsPost);
  const [taskCompletedUsers, setTaskCompletedUsers] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await applicationapi.getapplication();

      const oneJob = jobs?.data?.body.filter((job) => job?.jobId === jobId);

      setJobDetails(oneJob);
      if (oneJob.length > 0) {
        const currentJob = job?.jobs?.filter(
          (project) => project?._id === oneJob[0].jobId
        );
        const taskSubmitter = currentJob[0].taskCompletion;
        setTaskCompletedUsers(taskSubmitter);
      }

      // await Jobapi.searchingJob(oneJob.jobId)
    };
    fetchJobs();
  }, []);

  const nav = useNavigate();

  return (
    <div className={css.container}>
      <Toaster />
      <div className={css.topDiv}>
        <IoMdCloseCircle
          className={css.icon}
          onClick={() => setShowapplicants(false)}
        />
      </div>
      <div className={css.bodyDiv}>
        {jobDetails?.length > 0 &&
          jobDetails
            ?.filter((jobs, i) => jobs.userId === taskCompletedUsers[i]?.userID)
            .map((jobs) => (
              <div className={css.parentDiv}>
                <article>Task Finished Candidate</article>
                <div className={css.startDiv}>
                  {console.log(jobs)}
                  <img src={pics} alt="" className={css.profile} />

                  <article
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      nav(`/clientProfile/${jobs.userId}`);
                    }}
                  >
                    {jobs.userName}
                  </article>
                  <div className={css.cvDiv}>
                    <div className={css.pdfView}>
                      <a href={`/viewPdf/${jobs.name}`} target="blank">
                        {jobs.name}
                      </a>
                    </div>
                  </div>
                  <div className={css.btnDiv}>
                    <button
                      className={css.btn}
                      onClick={() => nav(`/acceptapplication/${jobs._id}`)}
                    >
                      Accept
                    </button>
                    <button className={css.btn}>Reject</button>
                  </div>
                </div>
              </div>
            ))}

        {jobDetails?.length > 0 ? (
          jobDetails
            ?.filter((jobs, i) => jobs.userId !== taskCompletedUsers[i]?.userID)
            .map((jobs, i) => (
              <div className={css.parentDiv} id={i}>
                <article>Task Remaining candidate</article>
                <div className={css.startDiv}>
                  <img src={pics} alt="" className={css.profile} />

                  <article
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      nav(`/clientProfile/${jobs.userId}`);
                    }}
                  >
                    {jobs?.userName}
                  </article>
                  <div className={css.cvDiv}>
                    <div className={css.pdfView}>
                      <a href={`/viewPdf/${jobs.name}`} target="blank">
                        {jobs?.name}
                      </a>
                    </div>
                  </div>
                  <div className={css.btnDiv}>
                    <button
                      className={css.btn}
                      onClick={() => nav(`/acceptapplication/${jobs._id}`)}
                    >
                      Accept
                    </button>
                    <button className={css.btn}>Reject</button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div>
            <article>No one has applied yet.</article>
          </div>
        )}
      </div>
    </div>
  );
}
