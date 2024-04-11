import React, { useEffect, useState } from "react";
import css from "./PostJob.module.css";
import { PiPlusCircle } from "react-icons/pi";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import Jobapi from "../../api/Jobapi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";

function PostJob() {
  const nav = useNavigate();

  const [inputField, setInputField] = useState({
    postTitle: "",
    salary: "",
    postDescription: "",
    ownerId: "",
    salaryStatus: "",
    deadlineDate: "",
    newToDos: [],
    finishedToDos: [],
  });
  const [skills, setSkill] = useState([{ skill: "" }]);

  useEffect(() => {
    const fetchData = () => {};
    fetchData();
  }, []);

  const addSkills = () => {
    setSkill([...skills, { skill: "" }]);
  };

  const handleChange = (e) => {
    const name = e.target.value;
    setInputField({ ...inputField, [e.target.name]: name });
  };

  const handleSkillChange = (e, i) => {
    const { value, name } = e.target;
    const skillList = [...skills];
    skillList[i][name] = value;
    setSkill(skillList);
  };

  const postJob = async () => {
    const ownerId = JSON.parse(localStorage.getItem("userId"));
    if (ownerId) {
      if (inputField.postTitle && inputField.postDescription) {
        const toPost = {
          ...inputField,
          ownerId: ownerId,
          skills: skills,
        };
        await Jobapi.postJob(toPost);
        toast.success("Job has been posted");
        setInputField({
          postDescription: "",
          deadlineDate: "",
          postTitle: "",
          salary: "",
          salaryStatus: "",
        });
      } else {
        toast.error("Please fill the necessary fields");
      }
    } else {
      toast.error("Try to post by logging in");
    }
  };

  return (
    <div className={css.mainDiv}>
      <Toaster />
      <div className={css.topDiv}>
        <IoChevronBack className={css.icon} onClick={() => nav("/")} />
        <article>Post a Job</article>
      </div>
      <div className={css.container}>
        <div className={css.titleDiv}>
          <header>Job Title</header>
          <input
            type="text"
            className={css.input}
            placeholder="Enter the job of the title"
            name="postTitle"
            value={inputField.postTitle}
            onChange={(e) => handleChange(e)}
          />

          <header>Deadline Date</header>
          <input
            type="text"
            className={css.input}
            placeholder="mm/dd/yyyy"
            name="deadlineDate"
            value={inputField.deadlineDate}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={css.descriptionDiv}>
          <header>Job Description</header>
          <textarea
            name="postDescription"
            id=""
            cols="30"
            rows="10"
            className={css.input}
            value={inputField.postDescription}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>

        <div className={css.salaryDiv}>
          <header>Salary</header>

          <div className={css.radioDiv}>
            <input
              type="radio"
              name="salary"
              value="Hourly"
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  salaryStatus: e.target.value,
                })
              }
            />
            <label htmlFor="">Hourly</label>
            <input
              type="radio"
              name="salary"
              value="Weekly"
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  salaryStatus: e.target.value,
                })
              }
            />

            <label htmlFor="">Weekly</label>

            <input
              type="radio"
              name="salary"
              value="Monthly"
              placeholder="Monthly"
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  salaryStatus: e.target.value,
                })
              }
            />
            <label htmlFor="">Monthly</label>
          </div>

          <input
            type="text"
            className={css.input}
            placeholder="Enter the Salary"
            name="salary"
            value={inputField.salary}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={css.skillsDiv}>
          <header>Skills Needed</header>
          {skills.map((skill, index) => (
            <div className={css.duoDiv}>
              <input
                type="text"
                className={css.input}
                placeholder="Enter the skills"
                name="skills"
                onChange={(e) => handleSkillChange(e, index)}
                value={inputField.skills}
              />
              <PiPlusCircle
                style={index >= skills.length - 1 ? {} : { display: "none" }}
                className={css.icon}
                onClick={() => {
                  addSkills();
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button className={css.btn} onClick={() => postJob()}>
        Post
      </button>
    </div>
  );
}

export default PostJob;
