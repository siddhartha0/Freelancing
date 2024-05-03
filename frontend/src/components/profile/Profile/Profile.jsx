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
import { useSelector } from "react-redux";
import { getUser } from "../../slices/UserSlice";

function Profile() {
  const user = useSelector(getUser);
  const [UserSkills, setUserSkills] = useState([]);
  const [userProject, setuserProject] = useState([]);
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      setUserSkills(user?.skill);

      setuserProject(user?.project);
    };
    fetchData();
  }, [user]);

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
          <header>{user?.name}</header>

          <article>{user?.jobTitle}</article>

          <button className={css.btn} onClick={() => setEditProps(true)}>
            Edit Profile
          </button>

          <div className={css.duoDiv}>
            <MdLocationOn className={css.icon} />
            <article>{user?.address}</article>
          </div>
          <div className={css.duoDiv}>
            <MdEmail className={css.icon} />
            <article>{user?.email}</article>
          </div>

          <div className={css.duoDiv}>
            <MdLocalPhone className={css.icon} />
            <article>{user?.contact}</article>
          </div>
        </div>

        <div className={css.skillDiv}>
          <header>Skills</header>
          {UserSkills.map((skill, i) => (
            <article key={i}>{skill}</article>
          ))}
        </div>

        <div className={css.workDone}>
          <header>Jaagir Koji Experience</header>
          {user?.experience?.length > 0 ? (
            user?.experience.map((user, i) => (
              <div className={css.workDiv} key={user + i}>
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
          {userProject?.length >= 1 ? (
            userProject.map((projects, index) => (
              <a href={projects.project} key={projects.project + index}>
                {projects.project}
              </a>
            ))
          ) : (
            <article>No project has been yet added.</article>
          )}
        </div>
      </div>

      {editProps && (
        <div className={css.editDiv}>
          <EditProfile
            setEditProps={setEditProps}
            userInfo={user}
            userSkill={UserSkills}
            userProject={userProject}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
