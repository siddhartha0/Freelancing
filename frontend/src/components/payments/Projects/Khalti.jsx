import axios from "axios";
import React from "react";
import Jobapi from "../../api/Jobapi";

function Khalti({
  clientId,
  totalSalary,
  projectDetails,
  userDetails,
  getSalaryFre,
  salaryToBeProvided,
  salaryPerWeek,
  salaryPerMonth,
  projectDuration,
}) {
  console.log(totalSalary);

  const khalti = async () => {
    console.log(totalSalary);
    const response = await axios.get(
      `http://localhost:3333/khalti/${totalSalary}`
    );

    const resJson = await response.data;
    window.location.href = resJson.url;

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

    console.log(acceptClient);
    await Jobapi.updateJobDetails(acceptClient);
  };
  return (
    <>
      <button
        style={{
          background: "#5D2E8E",
          padding: "8px",
          border: "none",
          borderRadius: "5px",
          color: "white",
        }}
        onClick={khalti}
      >
        Khalti Pay
      </button>
    </>
  );
}

export default Khalti;
