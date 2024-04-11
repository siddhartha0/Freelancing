import React, { useEffect, useRef, useState } from "react";
import css from "./Details.module.css";
import { MdArrowBackIos, MdOutlineAttachMoney } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import Jobapi from "../../api/Jobapi";
import Fileapi from "../../api/Fileapi";
import applicationapi from "../../api/applicationapi";
import Userapi from "../../api/Userapi";
import { Toaster, toast } from "react-hot-toast";

function JobDetails() {
  const nav = useNavigate();
  const jobId = useParams();

  const [postDetails, setPostDetails] = useState({});
  const [skills, setSkills] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [cv, setCv] = useState();
  const document = useRef();
  const [userId, setuserId] = useState("");
  const [alreadyapplied, setalreadyapplied] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const result = await Jobapi.searchingJob(jobId.id);
      setPostDetails(result.data.details);
      const getSkill = result.data.details.skills.map((e) => e.skills);
      setSkills(getSkill);
      const Id = JSON.parse(localStorage.getItem("userId"));
      setuserId(Id);
      const user = await Userapi.getById(Id);
      setUserDetails(user);
      result.data.details.clientId.map((id) =>
        id === Id ? setalreadyapplied(true) : setalreadyapplied(false)
      );
    };
    fetchJobDetails();
  }, []);

  const changeCv = (e) => {
    if (e.target.files && e.target.files[0]) {
      const docs = e.target.files[0];
      setCv(docs);
    }
  };

  const sendCv = async () => {
    if (userId) {
      if (cv) {
        const data = new FormData();
        const name = Date.now() + cv.name;
        data.append("name", name);
        data.append("file", cv);
        const sendingDocs = {
          userId: userId,
          name: name,
          jobId: postDetails._id.toString(),
          userName: userDetails.data.user.name,
        };
        try {
          await applicationapi.sendapplication(sendingDocs);

          await Fileapi.uploadDocs(data);
        } catch (error) {
          console.log(error);
        }
        const updateJob = {
          ...postDetails,
          clientId: [...postDetails.clientId, userId],
        };
        await Jobapi.updateJobDetails(updateJob);
        toast.success("Your application has been sent");
      } else {
        toast.error("Please attached ur cv ");
      }
    } else {
      toast.error("You must be logged in");
    }
  };

  return (
    <div className={css.container}>
      <Toaster />
      <div className={css.headerDiv}>
        <MdArrowBackIos
          className={css.icons}
          onClick={() => nav("/searchJob")}
        />
        <article>Back To Job</article>
      </div>
      {alreadyapplied && (
        <article>You have already submitted your proposal</article>
      )}
      <div className={css.topDiv}>
        <div className={css.leftDiv}>
          <header>{postDetails.postTitle}</header>
          <article>Deadline Date</article>
          <article>{postDetails.deadlineDate}</article>
        </div>

        <div className={css.rightDiv}>
          <header>Salary</header>
          <div className={css.duoDiv}>
            <MdOutlineAttachMoney className={css.icon} />
            <p>{postDetails.salary}</p>
          </div>
          <p>{postDetails.salaryStatus}</p>
        </div>
      </div>

      <div className={css.bodyDiv}>
        <div className={css.taskDiv}>
          <header>Job Tasks & Responsibities</header>

          <article>{postDetails.postDescription}</article>
        </div>

        <div className={css.skillDiv}>
          <header>Skills Needed</header>
          <div className={css.skills}>
            {skills.map((e, i) => (
              <div className={css.skill} key={i}>
                <article>{e}</article>
              </div>
            ))}
          </div>
        </div>
        <div className={css.cvDiv}>
          <header>Place your cv here</header>
          <input
            type="file"
            placeholder="Send your app"
            ref={document}
            onChange={(e) => changeCv(e)}
          />
        </div>

        <button
          className={css.btn}
          onClick={() => sendCv()}
          style={alreadyapplied ? { cursor: "not-allowed" } : {}}
        >
          Send Your Application
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
