import React, { useEffect, useState } from "react";
import css from "./ClientProfile.module.css";
import pics from "../../../assets/noUser.png";
import { FaUserCircle, FaLocationArrow, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useParams } from "react-router";
import Userapi from "../../api/Userapi";

export default function ClientProfile() {
  const id = useParams();
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      const userDetails = await Userapi.getById(id.id);
      setUserDetails(userDetails.data.user);
      console.log(userDetails.data);
    };
    fetchData();
  }, []);

  return (
    <div className={css.wholeDiv}>
      <div className={css.topContainer}></div>

      <div className={css.profileContainer}>
        <div className={css.picsDiv}>
          <img src={pics} alt="" className={css.pics} />
        </div>
        <div className={css.infoDiv}>
          <header>
            {userDetails.jobTitle ? userDetails.jobTitle : "Fresher"}
          </header>
          <article>{userDetails.name}</article>
          <div className={css.skillDiv}>
            {userDetails.skill ? (
              userDetails.skill.map((skill, i) => (
                <article id={i}>{skill.skill}</article>
              ))
            ) : (
              <article> No Skill added yet </article>
            )}
          </div>
        </div>
      </div>

      <div className={css.bodyDiv}>
        <div className={css.projectDiv}>
          <header>Projects</header>
          {userDetails.project ? (
            userDetails.project.map((project, i) => {
              <a href={project.project} id={i}>
                {project.project}
              </a>;
            })
          ) : (
            <article>No projects added yet </article>
          )}
        </div>

        <div className={css.platformDiv}>
          <header>Jaagir Koji Experience</header>
          <article>None</article>
        </div>
      </div>
    </div>
  );
}
