import React, { useEffect, useState } from "react";
import css from "./Projects.module.css";
import { useParams } from "react-router-dom";
import applicationapi from "../../api/applicationapi";
import Jobapi from "../../api/Jobapi";
import {
  calaulateProjectDuration,
  calculateMonthly,
  calculateWeekly,
  moneyToBeProviedToClients,
} from "../utils/Helper";
import { useMemo } from "react";
import Pay from "./Pay";
import Khalti from "./Khalti";

function Projects() {
  const [getSalaryFre, setSalaryFre] = useState("weekly");
  const [clientID, setClientID] = useState("");

  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const todayDate = new Date();
  const [projectDetails, setProjectDetails] = useState(null);

  const [totalSalary, setTotalSalary] = useState(0);

  const [projectDuration, setProjectDuration] = useState();

  const salaryToBeProvided = useMemo(() => {
    return moneyToBeProviedToClients(totalSalary);
  }, [totalSalary]);

  const salaryPerMonth = useMemo(() => {
    return calculateMonthly(salaryToBeProvided, projectDuration);
  }, [salaryToBeProvided, projectDuration]);

  const salaryPerWeek = useMemo(() => {
    return calculateWeekly(salaryToBeProvided, projectDuration);
  }, [salaryToBeProvided, projectDuration]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const getapplication = await applicationapi.getMyapplication(id);

  //     const clientId = await Jobapi.getClientId();

  //     setUserDetails(getapplication.data.userId);

  //     setClientID(clientId.data.id);
  //     const project = await Jobapi.searchingJob(getapplication.data.jobId);

  //     salary = project.data.salary;
  //     setProjectDetails(project.data.details);
  //     setTotalSalary(project.data.details.salary);

  //     const duration = calaulateProjectDuration(
  //       project.data.details.deadlineDate
  //     );

  //     setProjectDuration(duration);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getapplication = await applicationapi.getMyapplication(id);
      const clientId = await Jobapi.getClientId();

      setUserDetails(getapplication.data.userId);
      setClientID(clientId.data.id);

      const project = await Jobapi.searchingJob(getapplication.data.jobId);
      setProjectDetails(project.data.details);
      setTotalSalary(project.data.details.salary);

      const duration = calaulateProjectDuration(
        project.data.details.deadlineDate
      );
      setProjectDuration(duration);
    };

    fetchData();
  }, []);

  return (
    <div className={css.wholeDiv}>
      <div className={css.mainDiv}>
        <div className={css.topDiv}>
          <header
            style={{
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            Project Details
          </header>
          <div className={css.infoDiv}>
            <div className={css.inputDiv}>
              <label>Title</label>
              <span className={css.input}>{projectDetails?.postTitle}</span>
            </div>

            <div className={css.inputDiv}>
              <label>Deadline Date</label>
              <input
                type="date"
                className={css.input}
                value={projectDetails?.deadlineDate}
              />
            </div>

            <div className={css.inputDiv}>
              <label>assigned Date</label>
              <span className={css.input}>
                {todayDate.toString().slice(0, 15)}
              </span>
            </div>
          </div>
        </div>

        <div className={css.topDiv}>
          <header
            style={{
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            More Details
          </header>
          <div className={css.infoDiv}>
            <div className={css.inputDiv}>
              <label>Total salary</label>
              <input
                type="text"
                className={css.input}
                value={totalSalary}
                onChange={(e) => setTotalSalary(e.target.value)}
              />
            </div>

            <div className={css.inputDiv}>
              <label>Provided to client</label>
              <span className={css.input}>{salaryToBeProvided}</span>
            </div>

            <div className={css.inputDiv}>
              <label>Project Duration</label>
              <span className={css.input}>{projectDuration}</span>
            </div>

            <div className={css.inputDiv}>
              <label>Salary Frequency</label>
              <select
                className={css.dropDown}
                onChange={(e) => setSalaryFre(e.target.value)}
              >
                <option className={css.valueDiv} value="weekly">
                  Weekly
                </option>
                <option className={css.valueDiv} value="monthly">
                  Monthly
                </option>
                <option className={css.valueDiv} value="completed">
                  Project Completed
                </option>
              </select>
            </div>

            <div className={css.inputDiv}>
              <label>
                Salary Recieved{" "}
                {getSalaryFre === "completed" ? "after " : "per "}
                {getSalaryFre}
              </label>
              <span className={css.input}>
                {getSalaryFre === "completed"
                  ? salaryToBeProvided
                  : getSalaryFre === "monthly"
                  ? salaryPerMonth
                  : salaryPerWeek}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={css.btnDiv}>
        <Pay
          clientId={clientID}
          totalSalary={totalSalary}
          projectDetails={projectDetails}
          userDetails={userDetails}
          getSalaryFre={getSalaryFre}
          salaryToBeProvided={salaryToBeProvided}
          salaryPerMonth={salaryPerMonth}
          salaryPerWeek={salaryPerWeek}
          projectDuration={projectDuration}
        />

        <Khalti
          clientId={clientID}
          totalSalary={totalSalary}
          projectDetails={projectDetails}
          userDetails={userDetails}
          getSalaryFre={getSalaryFre}
          salaryToBeProvided={salaryToBeProvided}
          salaryPerMonth={salaryPerMonth}
          salaryPerWeek={salaryPerWeek}
          projectDuration={projectDuration}
        />
      </div>
    </div>
  );
}

export default Projects;
