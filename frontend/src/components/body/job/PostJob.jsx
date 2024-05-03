import React, { useState } from "react";
import css from "./PostJob.module.css";
import { PiPlusCircle } from "react-icons/pi";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import Jobapi from "../../api/Jobapi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";

function PostJob() {
  const nav = useNavigate();
  const [date, setDate] = useState(new Date());

  const [inputField, setInputField] = useState({
    postTitle: "",
    salary: "",
    ownerId: "",
    salaryStatus: "",
    newToDos: [],
    finishedToDos: [],
  });
  const [skills, setSkill] = useState([{ skill: "" }]);

  const addSkills = () => {
    setSkill([...skills, { skill: "" }]);
  };

  const handleChange = (e) => {
    const name = e.target.value;
    setInputField({ ...inputField, [e.target.name]: name });
  };

  const [getContent, setContent] = useState("");

  const handleSkillChange = (e, i) => {
    const { value, name } = e.target;
    const skillList = [...skills];
    skillList[i][name] = value;
    setSkill(skillList);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "link",
    "image",
    "code-block",
  ];

  const postJob = async () => {
    const ownerId = JSON.parse(localStorage.getItem("userId"));
    if (ownerId) {
      if (inputField.postTitle && getContent) {
        const toPost = {
          ...inputField,
          postDescription: getContent.toString(),
          deadlineDate: date.toISOString().slice(0, 10),
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
        });
        setContent("");
        setDate("");
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
          <div>
            <DatePicker
              selected={date}
              onChange={(select) => setDate(select)}
              className={css.date}
            />
          </div>
        </div>

        <div className={css.descriptionDiv}>
          <header>Job Description</header>
          <ReactQuill
            className={css.editor}
            theme="snow"
            value={getContent}
            onChange={(value) => setContent(value.toString())}
            modules={modules}
            formats={formats}
          />
        </div>

        <div className={css.salaryDiv}>
          <header>Salary</header>

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
