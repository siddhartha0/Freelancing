import React from "react";
import css from "./Notification.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateJob } from "../../slices/PostSlice";
import Userapi from "../../api/Userapi";

function PostedJobs({
  yourPostedJobs,
  setSeeDetails,
  setSelectedDetails,
  setYourPostedJobs,
}) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const completeProject = async (job) => {
    const updatedJob = {
      ...job,
      completed: true,
    };

    const newUpdated = yourPostedJobs.map((jobs, i) =>
      jobs._id === job._id ? updatedJob : jobs
    );

    console.log(job.acceptedClientId);
    setYourPostedJobs(newUpdated);
    const { data } = await Userapi.getById(job.acceptedClientId); // dispatch(updateJob(updatedJob));
    dispatch(updateJob(updatedJob));
    const updateUserProfile = {
      ...data.user,
      experience: [...data.user.experience, job.postTitle],
    };
    await Userapi.update(data.user._id, updateUserProfile);

    // console.log(updateJob);
  };
  return (
    <div className={css.postDiv}>
      <div className={css.headDiv}>
        <article>Job Details</article>

        <article>Skills Needed</article>
      </div>
      <hr />
      {yourPostedJobs.length > 0 ? (
        yourPostedJobs.map((jobs) => (
          <div className={css.postBody} key={jobs._id}>
            <div className={css.userDetails}>
              <header>{jobs.postTitle}</header>
              <div className={css.duoDiv}>
                <article>
                  {jobs.postDescription.substring(0, 25) + "..."}
                </article>
              </div>
            </div>
            <div className={css.skillDiv}>
              {jobs.skills.map((skill, i) => (
                <article key={i}>{skill.skills}</article>
              ))}
            </div>
            <div className={css.projectDiv}>
              <div className={css.duoDiv}>
                <article>Project Status</article>
                <article>
                  {jobs.projectTaken ? "Taken" : "Not assigned"}
                </article>
              </div>

              <div className={css.duoDiv}>
                <article>Completed</article>
                <article>
                  {jobs.completed ? "Finished" : "Not Completed"}
                </article>
              </div>
            </div>

            <div className={css.actionDiv}>
              <button
                className={css.btn}
                style={{ backgroundColor: "#0ecc07be", color: "#000" }}
                onClick={() => completeProject(jobs)}
              >
                Mark as Completed
              </button>

              <button
                className={css.btn}
                style={{ backgroundColor: "#df0505e3" }}
                onClick={() => {
                  jobs.projectTaken
                    ? nav(`/acceptedClient/${jobs._id}`)
                    : setSeeDetails(true);
                  setSelectedDetails(jobs);
                }}
              >
                See Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <article>You haven't posted any jobs</article>
      )}
    </div>
  );
}

export default PostedJobs;
