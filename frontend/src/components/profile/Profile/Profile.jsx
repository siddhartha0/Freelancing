import React, { useEffect, useState } from "react";
import css from "./Profile.module.css";
import {
  MdLocationOn,
  MdEmail,
  MdLocalPhone,
  MdCheckCircle,
  MdOutlineArrowBack,
} from "react-icons/md";
import profile from "../../../assets/RightTheme.png";
import { useNavigate } from "react-router";
import EditProfile from "./EditProfile";
import Userapi from "../../api/Userapi";

function Profile() {
  const [userDetails, setUserDetails] = useState({});

  const [UserSkills, setUserSkills] = useState([]);
  const [userProject, setuserProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const user = await Userapi.getById(userId);
      setUserDetails(user.data.user);

      setUserSkills(user.data.user.skill);

      setuserProject(user.data.user.project);
      console.log(user.data.user);
    };
    fetchData();
  }, []);

  const nav = useNavigate();
  const [editProps, setEditProps] = useState(false);
  return (
    <div className={css.container}>
      <div className={css.topDiv}>
        <MdOutlineArrowBack className={css.icon} onClick={() => nav("/")} />
        <header>Profile</header>
      </div>

      <div
        className={css.bodyDiv}
        style={editProps ? { position: "fixed", filter: "blur(2rem)" } : {}}
      >
        <div className={css.profileDiv}>
          <img src={profile} alt="" className={css.img} />
          <header>{userDetails.name}</header>

          <article>{userDetails.jobTitle}</article>

          <button className={css.btn} onClick={() => setEditProps(true)}>
            Edit Profile
          </button>

          <div className={css.duoDiv}>
            <MdLocationOn className={css.icon} />
            <article>{userDetails.address}</article>
          </div>
          <div className={css.duoDiv}>
            <MdEmail className={css.icon} />
            <article>{userDetails.email}</article>
          </div>

          <div className={css.duoDiv}>
            <MdLocalPhone className={css.icon} />
            <article>{userDetails.contact}</article>
          </div>
        </div>

        <div className={css.skillDiv}>
          <header>Skills</header>
          {UserSkills.map((skill, i) => (
            <article key={i}>{skill.skill}</article>
          ))}
        </div>

        <div className={css.workDone}>
          <header>Jaagir Koji Experience</header>
          {userDetails?.experience?.length > 0 ? (
            userDetails?.experience.map((user) => (
              <div className={css.workDiv}>
                <MdCheckCircle className={css.icon} />
                <article>{user}</article>
              </div>
            ))
          ) : (
            <article>No Experience yet</article>
          )}
        </div>
        <div className={css.projectDiv}>
          <header>Completed Project</header>
          {userProject.map((projects, index) => (
            <a href={projects.project}>{projects.project}</a>
          ))}
        </div>
      </div>

      {editProps && (
        <div className={css.editDiv}>
          <EditProfile
            setEditProps={setEditProps}
            userInfo={userDetails}
            userSkill={UserSkills}
            userProject={userProject}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
