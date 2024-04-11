import React, { useEffect, useState } from "react";
import css from "./Notification.module.css";
import { MdArrowBackIos, MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import Jobapi from "../../api/Jobapi";
import applicationapi from "../../api/applicationapi";
import PostedDetails from "../Job_Details/PostedDetails";
import Jobsapplied from "./Jobsapplied";
import PostedJobs from "./PostedJobs";
import CompletedJobs from "./CompletedJobs";
import PendingJobs from "./PendingJobs";

function Notification() {
  const nav = useNavigate();
  const [appliedJob, setappliedJob] = useState(true);
  const [postedJobs, setPostedJob] = useState(false);
  const [pendingJobs, setPendingJob] = useState(false);
  const [completedJob, setCompletedJob] = useState(false);
  const [yourPostedJobs, setYourPostedJobs] = useState([]);
  const [yourappliedJobs, setyourappliedJobs] = useState([]);
  const [seeDetails, setSeeDetails] = useState(false);
  const [selectedJobDetails, setSelectedDetails] = useState({});
  const [finishedProjects, setFinishedProjects] = useState([]);
  const [userID, setuserID] = useState("");
  const [assignedJob, setAssignedJob] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = JSON.parse(localStorage.getItem("userId"));
      setuserID(userId);
      const jobs = await Jobapi.fetchJobs();

      const yourPostedJobs = jobs.data.JobPost.filter(
        (job) => job.ownerId === userId
      );
      const yourPendingJobs = jobs.data.JobPost.filter(
        (job) => job.acceptedClientId == userId && job.completed === false
      );

      const finished = jobs.data.JobPost.filter(
        (job) => job.acceptedClientId === userId && job.completed === true
      );
      setFinishedProjects(finished);
      setAssignedJob(yourPendingJobs);

      const yourJob = jobs.data.JobPost.map((job) =>
        job.clientId.includes(userId)
      );

      const you = jobs.data.JobPost.filter((job, i) => yourJob[i] === true);

      setyourappliedJobs(you);

      setYourPostedJobs(yourPostedJobs);
    };
    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <div
        className={css.bodyDiv}
        style={
          seeDetails ? { filter: "blur(1.2rem)", overflowY: "hidden" } : {}
        }
      >
        <div className={css.headerDiv}>
          <MdArrowBackIos className={css.icons} onClick={() => nav("/")} />

          <div className={css.optionDiv}>
            <MdMenu className={css.icon} />
          </div>

          <div className={css.topDiv}>
            <header
              onClick={() => {
                setappliedJob(true);
                setCompletedJob(false);
                setPendingJob(false);
                setPostedJob(false);
              }}
              style={
                appliedJob
                  ? {
                      borderBottom: ".5px solid #ee1f04de",
                    }
                  : {}
              }
            >
              Applied Jobs
            </header>
            <header
              onClick={() => {
                setPostedJob(true);
                setCompletedJob(false);
                setPendingJob(false);
                setappliedJob(false);
              }}
              style={
                postedJobs
                  ? {
                      borderBottom: ".5px solid #ee1f04de",
                    }
                  : {}
              }
            >
              Posted Jobs
            </header>
            <header
              onClick={() => {
                setPostedJob(false);
                setCompletedJob(false);
                setPendingJob(true);
                setappliedJob(false);
              }}
              style={
                pendingJobs
                  ? {
                      borderBottom: ".5px solid #ee1f04de",
                    }
                  : {}
              }
            >
              Pending Jobs
            </header>
            <header
              onClick={() => {
                setPostedJob(false);
                setCompletedJob(true);
                setPendingJob(false);
                setappliedJob(false);
              }}
              style={
                completedJob
                  ? {
                      borderBottom: ".5px solid #ee1f04de",
                    }
                  : {}
              }
            >
              Completed Jobs
            </header>
          </div>
        </div>

        <div className={css.bodyDiv}>
          {appliedJob && (
            <Jobsapplied yourappliedJobs={yourappliedJobs} userID={userID} />
          )}
          {postedJobs && (
            <PostedJobs
              yourPostedJobs={yourPostedJobs}
              setSeeDetails={setSeeDetails}
              setSelectedDetails={setSelectedDetails}
              setYourPostedJobs={setYourPostedJobs}
            />
          )}
          {pendingJobs && <PendingJobs assignedJob={assignedJob} />}
          {completedJob && (
            <CompletedJobs finishedProjects={finishedProjects} />
          )}
        </div>
      </div>

      {seeDetails && (
        <div className={css.postDetailDiv}>
          <IoMdClose
            className={css.icon}
            onClick={() => setSeeDetails(false)}
          />
          <PostedDetails selectedJobDetails={selectedJobDetails} />
        </div>
      )}
    </div>
  );
}

export default Notification;
