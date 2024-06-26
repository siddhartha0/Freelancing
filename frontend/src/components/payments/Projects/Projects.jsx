import React, { useEffect, useState } from "react";
import css from "./Projects.module.css";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
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

function Projects() {
  const [getSalaryFre, setSalaryFre] = useState("weekly");
  const [clientID, setClientID] = useState("");

  const { id } = useParams();
  const [userDetails, setUserDetails] = useState();
  const todayDate = new Date();
  const [payPalDispatch] = usePayPalScriptReducer();
  const [projectDetails, setProjectDetails] = useState();

  const [totalSalary, setTotalSalary] = useState();

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

  const acceptApplication = async () => {
    const acceptClient = {
      ...projectDetails,
      acceptedClientId: userDetails,
      projectTaken: true,
      salaryStatus: getSalaryFre,
      salary: totalSalary,
      clientRecievedSalary: salaryToBeProvided,
      moneySentPerSalaryStatus:
        getSalaryFre === "weekly"
          ? salaryPerWeek
          : getSalaryFre === "monthly"
          ? salaryPerMonth
          : salaryToBeProvided,
      projectDuration: projectDuration,
    };

    const res = await Jobapi.updateJobDetails(acceptClient);
    console.log(res);
  };

  const onapprove = (data, action) => {
    action.order.capture().then(async function (details) {
      acceptApplication();
    });
  };

  const createOrder = (data, action) => {
    return action.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalSalary,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const getapplication = await applicationapi.getMyapplication(id);

      const clientId = await Jobapi.getClientId();

      setUserDetails(getapplication.data.userId);

      setClientID(clientId.data.id);
      const project = await Jobapi.searchingJob(getapplication.data.jobId);

      setProjectDetails(project.data.details);

      const duration = calaulateProjectDuration(
        project.data.details.deadlineDate
      );

      setProjectDuration(duration);
      setTotalSalary(project.data.details.salary);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const loadScript = async () => {
      payPalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientID,
          currency: "USD",
        },
      });
      payPalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    };
    loadScript();
  }, [clientID, payPalDispatch]);

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
        <PayPalButtons
          className={css.payBtns}
          style={{
            shape: "rect",
            layout: "vertical",
          }}
          onApprove={onapprove}
          createOrder={createOrder}
        />
      </div>
    </div>
  );
}

export default Projects;
