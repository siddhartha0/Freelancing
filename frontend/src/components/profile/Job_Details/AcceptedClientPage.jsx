import React, { useEffect, useState } from "react";
import css from "./ClientPage.module.css";
import { IoChevronBack, IoMailOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPhone, FaLocationArrow } from "react-icons/fa6";
import profile from "../../../assets/noUser.jpg";
import ToDo from "./ToDo";
import { useNavigate, useParams } from "react-router";
import Userapi from "../../api/Userapi";
import Jobapi from "../../api/Jobapi";
import { DragDropContext } from "react-beautiful-dnd";
import { calaulateProjectDuration } from "../../payments/utils/Helper";

function AcceptedClientPage() {
  const [projectRemainingTime, setProjectRemainingTime] = useState("");
  const nav = useNavigate();
  const { id } = useParams();
  const [clientDetails, setClientDetails] = useState({});
  const [selectedJobDetails, setSelectedJobDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const job = await Jobapi.searchingJob(id);
      setSelectedJobDetails(job.data.details);
      const clientId = job.data.details.acceptedClientId;
      const getClient = await Userapi.getById(clientId);
      if (getClient.data) {
        setClientDetails(getClient.data.user);
      }

      setProjectRemainingTime(
        calaulateProjectDuration(job.data.details.deadlineDate)
      );

      // console.log(remainingTime);
    };
    fetchData();
  }, [id]);

  return (
    <DragDropContext>
      <div className={css.mainDiv}>
        <div className={css.topDiv}>
          <IoChevronBack className={css.icon} onClick={() => nav("/notify")} />
          <article>Client Details</article>
        </div>

        <div className={css.bodyDiv}>
          <div className={css.bodyTopDiv}>
            <container className={css.profileContainer}>
              <div className={css.imgDiv}>
                <img src={profile} alt="profile" className={css.profilePics} />
              </div>

              <div className={css.informationDiv}>
                <div className={css.topRightDiv}></div>
                <header className={css.headDiv}>
                  <article>{clientDetails.jobTitle}</article>
                </header>
                <container className={css.duoDiv}>
                  <FaUser className={css.logo} />
                  <article>{clientDetails.name}</article>
                </container>
                <container className={css.duoDiv}>
                  <FaLocationArrow className={css.logo} />
                  <article>{clientDetails.address}</article>
                </container>
                <container className={css.duoDiv}>
                  <IoMailOutline className={css.logo} />
                  <article>{clientDetails.email}</article>
                </container>
                <container className={css.duoDiv}>
                  <FaPhone className={css.logo} />
                  <article>{clientDetails.contact}</article>
                </container>
              </div>
            </container>

            <container className={css.profileContainer}>
              <div className={css.informationDiv}>
                <header className={css.headDiv}>
                  <article>{clientDetails.jobTitle}</article>
                </header>
                <container className={css.duoDiv}>
                  <article>Project Duration</article>
                  <span>{selectedJobDetails?.projectDuration}</span>
                </container>
                <container className={css.duoDiv}>
                  <article>Total Salary</article>
                  <article>{selectedJobDetails?.salary}</article>
                </container>
                <container className={css.duoDiv}>
                  <article>Salary Frequency</article>
                  <article>{selectedJobDetails?.salaryStatus}</article>
                </container>
                <container className={css.duoDiv}>
                  <article>Remaining Time</article>
                  <article>{projectRemainingTime}</article>
                </container>
              </div>
            </container>
          </div>

          <ToDo
            selectedJobDetails={selectedJobDetails}
            setSelectedJobDetails={setSelectedJobDetails}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default AcceptedClientPage;
