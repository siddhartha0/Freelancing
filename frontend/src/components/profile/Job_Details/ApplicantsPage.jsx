import React, { useEffect, useState } from "react";
import css from "./applicants.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import pics from "../../../assets/noUser.png";
import applicationapi from "../../api/applicationapi";
import Userapi from "../../api/Userapi";
import { useNavigate } from "react-router";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import Jobapi from "../../api/Jobapi";
import { Toaster, toast } from "react-hot-toast";

export default function ApplicantsPage({
  setShowapplicants,
  jobId,
  selectedJobDetails,
}) {
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await applicationapi.getapplication();
      const oneJob = jobs.data.body.filter((job) => job.jobId === jobId);
      setJobDetails(oneJob);
      console.log(oneJob);
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
        {jobDetails.length > 0 ? (
          jobDetails.map((jobs, i) => (
            <div className={css.startDiv} key={i}>
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
