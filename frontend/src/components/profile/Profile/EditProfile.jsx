import React, { useEffect, useState } from "react";
import css from "./Edit.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { BiUserPin } from "react-icons/bi";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsPlusSquareFill, BsTelephoneFill } from "react-icons/bs";
import Userapi from "../../api/Userapi";
import { Toaster, toast } from "react-hot-toast";
function EditProfile({ setEditProps, userInfo, userSkill, userProject }) {
  const [userDetails, setuserDetails] = useState({
    jobTitle: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = () => {
      setuserDetails({
        jobTitle: userInfo.jobTitle,
        contact: userInfo.contact,
        address: userInfo.address,
      });

      setskills([{ skill: userSkill.map((e, i) => e.skill) }]);
    };
    fetchData();
  }, []);

  const [skills, setskills] = useState([{ skill: "" }]);
  const [projectLink, setprojectLink] = useState([{ project: "" }]);

  const addSkillField = () => {
    setskills([...skills, { skill: "" }]);
  };

  const addProjectLink = () => {
    setprojectLink([...projectLink, { project: "" }]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setuserDetails({ ...userDetails, [e.target.name]: value });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const newDetails = {
        ...userDetails,
        skill: skills,
        project: projectLink,
      };
      const response = await Userapi.update(userId, newDetails);
      console.log(response.data);
      if (response.status === 200) toast.success("New Data has been updated");
      console.log("success");
    } catch (error) {
      toast.error(
        "There is some problem in the system. Please Try again later..."
      );
    }
  };

  const handleSkillChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...skills];
    list[i][name] = value;
    setskills(list);
  };

  const handleProjectChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...projectLink];
    list[index][name] = value;
    setprojectLink(list);
  };
  return (
    <div className={css.container}>
      <Toaster />
      <div className={css.topDiv}>
        <header>Edit Profile</header>
        <IoMdCloseCircle
          className={css.icon}
          onClick={() => setEditProps(false)}
        />
      </div>

      <form onSubmit={updateUser}>
        <div className={css.bodyDiv}>
          <div className={css.infoDiv}>
            <header>Bio</header>
            <div className={css.inputDiv}>
              <div className={css.duoDiv}>
                <input
                  type="text"
                  className={css.input}
                  placeholder="Enter the job title of your work "
                  name="jobTitle"
                  value={userDetails.jobTitle}
                  onChange={(e) => handleChange(e)}
                />
                <BiUserPin className={css.icon} />
              </div>

              <div className={css.duoDiv}>
                <input
                  type="text"
                  className={css.input}
                  placeholder="Enter your address"
                  name="address"
                  value={userDetails.address}
                  onChange={(e) => handleChange(e)}
                />
                <CiLocationArrow1 className={css.icon} />
              </div>

              <div className={css.duoDiv}>
                <input
                  type="text"
                  className={css.input}
                  name="contact"
                  placeholder="Enter your contact number"
                  value={userDetails.contact}
                  onChange={(e) => handleChange(e)}
                />
                <BsTelephoneFill className={css.icon} />
              </div>
            </div>
          </div>

          <div className={css.infoDiv}>
            <header>Skills</header>

            <div className={css.skillDiv}>
              {skills.map((skill, i) => (
                <div className={css.duoDiv}>
                  <input
                    type="text"
                    className={css.input}
                    placeholder="Enter the skills you have"
                    value={skill.skill}
                    name="skill"
                    onChange={(e) => handleSkillChange(e, i)}
                  />
                  <BsPlusSquareFill
                    className={css.icon}
                    onClick={() => addSkillField()}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={css.infoDiv}>
            <header>Projects</header>
            <div className={css.skillDiv}>
              {projectLink.map((project, index) => (
                <div key={index} className={css.duoDiv}>
                  <input
                    type="text"
                    className={css.input}
                    placeholder="Link Your github projects"
                    name="project"
                    value={project.project}
                    onChange={(e) => handleProjectChange(e, index)}
                  />
                  <BsPlusSquareFill
                    className={css.icon}
                    onClick={() => addProjectLink()}
                  />
                </div>
              ))}
            </div>
          </div>

          <button className={css.btn} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
