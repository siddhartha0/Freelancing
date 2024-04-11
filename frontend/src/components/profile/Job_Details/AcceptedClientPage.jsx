import React, { useEffect, useState } from "react";
import css from "./ClientPage.module.css";
import { IoChevronBack, IoMailOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPhone, FaLocationArrow } from "react-icons/fa6";
import profile from "../../../assets/noUser.jpg";
import ToDo from "./ToDo";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { getJobsPost } from "../../slices/PostSlice";
import Userapi from "../../api/Userapi";
import Jobapi from "../../api/Jobapi";

function AcceptedClientPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const jobDetails = useSelector(getJobsPost);
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
    };
    fetchData();
  }, []);

  return (
    <div className={css.mainDiv}>
      <div className={css.topDiv}>
        <IoChevronBack className={css.icon} onClick={() => nav("/notify")} />
        <article>Client Details</article>
      </div>

      <div className={css.bodyDiv}>
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

        <ToDo
          selectedJobDetails={selectedJobDetails}
          setSelectedJobDetails={setSelectedJobDetails}
        />
      </div>
    </div>
  );
}

export default AcceptedClientPage;
