import React, { useEffect, useRef, useState } from "react";
import css from "./Test.module.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateJob } from "../../slices/PostSlice";
import { getUser } from "../../slices/UserSlice";
import toast, { Toaster } from "react-hot-toast";
import Fileapi from "../../api/Fileapi";

function TestByCompany({ yourappliedJobs, userID }) {
  const [taskRemainingJobs, setTaskRemainingJobs] = useState([]);
  useEffect(() => {
    const remainingJob = yourappliedJobs.filter((job) => {
      return job.task;
    });
    console.log(remainingJob);
    setTaskRemainingJobs(remainingJob);
  }, []);

  const nav = useNavigate();

  const [completedTaskURL, setCompletedTaskURL] = useState();
  const dispatch = useDispatch();
  const userInfo = useSelector(getUser);
  const [test, setTest] = useState();
  const docs = useRef();

  const changeDocs = (e) => {
    if (e.target.files && e.target.files[0]) {
      const docs = e.target.files[0];
      setTest(docs);
    }
  };

  const submitTask = async (job) => {
    const submittedTime = new Date().toUTCString();

    const newValue = {
      userID: userInfo._id,
      userName: userInfo.name,
      userEmail: userInfo.email,
      submittedDate: submittedTime.toString(),
      taskURL: completedTaskURL,
    };

    var updateValue = {
      ...job,
      taskCompletion: [...job.taskCompletion, newValue],
    };

    if (test) {
      const data = new FormData();
      const name = Date.now() + test.name;
      data.append("name", name);
      data.append("file", test);
      const sendingDocs = {
        ...newValue,
        taskDoc: name,
      };
      updateValue = {
        ...job,
        taskCompletion: [...job.taskCompletion, sendingDocs],
      };
      try {
        await Fileapi.uploadCompletedTask(data);
      } catch (error) {}
    }

    try {
      dispatch(updateJob(updateValue));
      toast.success("Congratulations !!! wait for your client updates");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={css.mainDiv}>
      <Toaster />
      {taskRemainingJobs.length > 0 ? (
        <div className={css.bodyDiv}>
          <div className={css.headerDiv}>
            <button className={css.textBtn}>Remaining</button>
            <button className={css.textBtn}>Submitted</button>
          </div>

          <div className={css.taskDiv}>
            {taskRemainingJobs &&
              taskRemainingJobs.map((job) => (
                <div className={css.contentDiv} id={job._id}>
                  {console.log(job)}
                  <div className={css.leftDiv}>
                    <header onClick={() => nav(`/jobDetails/${job?._id}`)}>
                      {job.postTitle}
                    </header>
                    <a href={`/viewTask/${job.task}`} target="blank">
                      {job.task}
                    </a>
                    <span>Deadline Date: {job.deadlineDate}</span>
                    <input
                      type="file"
                      ref={docs}
                      onChange={(e) => changeDocs(e)}
                    />
                    <input
                      type="url"
                      placeholder="Place the url if there..."
                      value={completedTaskURL}
                      onChange={(e) => setCompletedTaskURL(e.target.value)}
                      style={{
                        width: "250px",
                      }}
                    />
                  </div>
                  <div className={css.rightDiv}>
                    <button className={css.btn} onClick={() => submitTask(job)}>
                      Submit
                    </button>
                    <button className={css.btn}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className={css.noneDiv}>
          <p>No task has been assigned to you yet.</p>
        </div>
      )}
    </div>
  );
}

export default TestByCompany;
