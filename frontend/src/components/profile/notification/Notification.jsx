import React, { useEffect, useState } from "react";
import css from "./Notification.module.css";
import { MdArrowBackIos, MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import Jobapi from "../../api/Jobapi";
import PostedDetails from "../Job_Details/PostedDetails";
import Jobsapplied from "./Jobsapplied";
import PostedJobs from "./PostedJobs";
import CompletedJobs from "./CompletedJobs";
import PendingJobs from "./PendingJobs";

function Notification() {
  const nav = useNavigate();
  const [getactiveHeader, setactiveHeader] = useState(1);
  const [yourPostedJobs, setYourPostedJobs] = useState([]);
  const [yourappliedJobs, setyourappliedJobs] = useState([]);
  const [seeDetails, setSeeDetails] = useState(false);
  const [selectedJobDetails, setSelectedDetails] = useState({});
  const [finishedProjects, setFinishedProjects] = useState([]);
  const [userID, setuserID] = useState("");
  const [assignedJob, setAssignedJob] = useState([]);

  const headerData = [
    {
      id: 1,
      header: "applied Jobs",
    },
    {
      id: 2,
      header: "Posted Jobs",
    },
    {
      id: 3,
      header: "Pending Jobs",
    },
    {
      id: 4,
      header: "Completed Jobs",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const userId = JSON.parse(localStorage.getItem("userId"));
      setuserID(userId);
      const jobs = await Jobapi.fetchJobs();

      const yourPostedJobs = jobs.data.JobPost.filter(
        (job) => job.ownerId === userId
      );
      const yourPendingJobs = jobs.data.JobPost.filter(
        (job) => job.acceptedClientId === userId && job.completed === false
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
            {headerData.map((data) => (
              <header
                id={data.header}
                onClick={() => {
                  setactiveHeader(data.id);
                }}
                style={
                  data.id === getactiveHeader
                    ? {
                        borderBottom: ".5px solid #ee1f04de",
                      }
                    : {
                        opacity: 0.6,
                      }
                }
              >
                {data.header}
              </header>
            ))}
          </div>
        </div>

        <div className={css.bodyDiv}>
          {getactiveHeader === 1 && (
            <Jobsapplied yourappliedJobs={yourappliedJobs} userID={userID} />
          )}
          {getactiveHeader === 2 && (
            <PostedJobs
              yourPostedJobs={yourPostedJobs}
              setSeeDetails={setSeeDetails}
              setSelectedDetails={setSelectedDetails}
              setYourPostedJobs={setYourPostedJobs}
            />
          )}
          {getactiveHeader === 3 && <PendingJobs assignedJob={assignedJob} />}
          {getactiveHeader === 4 && (
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
