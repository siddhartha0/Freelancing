import React, { memo, useRef, useState } from "react";
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
import Fileapi from "../../api/Fileapi";

const PostJob = memo(() => {
  const nav = useNavigate();

  const [inputField, setInputField] = useState({
    postTitle: "",
    salary: "",
    ownerId: "",
    salaryStatus: "",
    projectDuration: "",
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

  const durationValue = [
    "less than month",
    "1 month",
    "2 months",
    "3 months",
    "4 months",
  ];

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
  const [taskDetails, setTaskDetails] = useState();
  const [durationAlert, setDurationAlert] = useState(false);

  const taskRef = useRef();

  const changeCv = (e) => {
    if (e.target.files && e.target.files[0]) {
      const docs = e.target.files[0];
      setTaskDetails(docs);
    }
  };

  const postJob = async () => {
    const ownerId = JSON.parse(localStorage.getItem("userId"));
    if (ownerId) {
      if (inputField.postTitle && getContent) {
        if (taskDetails) {
          const data = new FormData();
          const name = Date.now() + taskDetails.name;
          data.append("name", name);
          data.append("file", taskDetails);
          const toPost = {
            ...inputField,
            postDescription: getContent.toString(),
            ownerId: ownerId,
            skills: skills,
            task: name,
          };
          await Jobapi.postJob(toPost);
          await Fileapi.uploadTasks(data);

          toast.success("Job has been posted");
          setInputField({
            postDescription: "",
            deadlineDate: "",
            postTitle: "",
            salary: "",
          });
          setContent("");
        }
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
        <div className={css.firstDiv}>
          <div>
            <header>Job Title</header>
            <input
              type="text"
              className={css.input}
              placeholder="Enter the job of the title"
              name="postTitle"
              value={inputField.postTitle}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <header>Project Duration</header>
            <input
              className={css.input}
              value={inputField.projectDuration}
              name="projectDuration"
              onChange={handleChange}
              onClick={() => setDurationAlert((prev) => !prev)}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {durationAlert &&
                durationValue.map((time) => (
                  <div
                    key={time}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                    onClick={() => {
                      setInputField({ ...inputField, projectDuration: time });
                      setDurationAlert(false);
                    }}
                  >
                    {inputField.projectDuration
                      ? time
                          .toLocaleLowerCase()
                          .includes(
                            inputField.projectDuration.toLocaleLowerCase()
                          )
                      : time}
                  </div>
                ))}
            </div>
          </div>

          <div>
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

          <div>
            <header>Tasks</header>
            <input
              type="file"
              className={css.input}
              ref={taskRef}
              onChange={(e) => changeCv(e)}
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
        <div>
          <button className={css.btn} onClick={() => postJob()}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
});

export default PostJob;
