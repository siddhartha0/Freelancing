import React, { useEffect, useState } from "react";
import css from "./ClientPending.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getJobsPost, updateJob } from "../../slices/PostSlice";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaMoneyCheck } from "react-icons/fa";
import Userapi from "../../api/Userapi";
import Jobapi from "../../api/Jobapi";

function ClientPendingDetails() {
  const { id } = useParams();

  const [myJob, setMyJob] = useState();
  const [bossDetails, setBossDetails] = useState({});

  useEffect(() => {
    const post = async () => {
      const job = await Jobapi.searchingJob(id);
      console.log(job.data.details);
      setMyJob(job.data.details);
      const boss = job.data.details.ownerId;
      const BossDetailResponse = await Userapi.getById(boss);
      setBossDetails(BossDetailResponse.data.user);
      console.log(BossDetailResponse.data.user);
    };
    post();
  }, []);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const markComplete = (task) => {
    console.log(myJob);
    const removeFinished = myJob.newToDos.filter((todo) => todo !== task);
    const newUpdatedCompleteToDos = {
      ...myJob,
      finishedToDos: [...myJob.finishedToDos, task],
      newToDos: removeFinished,
    };
    setMyJob(newUpdatedCompleteToDos);
    dispatch(updateJob(newUpdatedCompleteToDos));
  };

  return (
    <div className={css.startDiv}>
      <div className={css.topDiv}>
        <IoIosArrowBack className={css.icon} onClick={() => nav("/notify")} />
        <header>{myJob?.postTitle}</header>
      </div>

      <div className={css.bodyStartDiv}>
        <div className={css.completedDiv}>
          <header>Completed Task</header>
          <hr />
          {myJob?.finishedToDos?.length > 0 ? (
            myJob?.finishedToDos?.map((todo, i) => (
              <article key={i}>{todo}</article>
            ))
          ) : (
            <article
              style={{
                color: "orange",
                display: "flex",
                width: "90%",
                margin: "auto",
              }}
            >
              No task has been completed yet
            </article>
          )}
        </div>

        <div className={css.profileDiv}>
          <article style={{}}>{myJob?.postDescription}</article>
          <hr />
          <div className={css.duoDiv}>
            <header>Started Date : </header>
            <article>{myJob?.postedDate.toString().substring(0, 10)}</article>
          </div>

          <div className={css.duoDiv}>
            <header style={{ color: "red" }}>DeadLine :</header>
            <article>{myJob?.deadlineDate}</article>
          </div>
          <div className={css.duoDiv}>
            <header>Owner Name : </header>
            <article
              style={{
                textTransform: "uppercase",
                color: "rgb(133, 120, 150)",
              }}
            >
              {bossDetails.name}
            </article>
          </div>

          <div className={css.duoDiv}>
            <header>Owner Email : </header>
            <article
              style={{
                textTransform: "lowercase",
                color: "rgb(133, 120, 150)",
              }}
            >
              {bossDetails.email}
            </article>
          </div>

          <div className={css.duoDiv}>
            <header>Owner Contact : </header>
            <article
              style={{
                textTransform: "uppercase",
                color: "rgb(133, 120, 150)",
              }}
            >
              {bossDetails.contact}
            </article>
          </div>
          <div className={css.duoDiv}>
            <header>Salary : </header>
            <article style={{ color: "rgb(30, 175, 30)" }}>
              $ {myJob?.salary}
            </article>
          </div>
          <div className={css.duoDiv}>
            <header>Salary Status : </header>
            <article style={{ color: "#ee1f04de" }}>
              {myJob?.salaryStatus}
            </article>
          </div>

          {/* <header>Job Title</header>
          <div className={css.duoDiv}>
            <RiAccountBoxFill className={css.icon} />
            <article>Owner Name</article> */}
          {/* </div> */}
        </div>
      </div>

      <div className={css.mainBodyDiv}>
        <article>Due Task</article>

        <div className={css.detailBodyDiv}>
          {myJob?.newToDos?.length > 0 ? (
            myJob?.newToDos?.map((job, i) => (
              <div className={css.actionDiv} key={i}>
                <article>{job}</article>
                <button className={css.btn} onClick={() => markComplete(job)}>
                  Mark as Complete
                </button>
              </div>
            ))
          ) : (
            <article>Please wait while your client add the task</article>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientPendingDetails;
