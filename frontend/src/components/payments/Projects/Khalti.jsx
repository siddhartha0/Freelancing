import axios from "axios";
import React from "react";

function Khalti(
  total,
  projectDetails,
  userDetails,
  getSalaryFre,
  salaryToBeProvided,
  salaryPerMonth,
  salaryPerWeek,
  projectDuration
) {
  const khalti = async () => {
    console.log(total);
    const response = await axios.get(
      `http://localhost:3333/khalti/${total.total}`
    );

    const acceptClient = {
      ...projectDetails,
      acceptedClientId: userDetails,
      projectTaken: true,
      salaryStatus: getSalaryFre,
      salary: total.total,
      clientRecievedSalary: salaryToBeProvided,
      moneySentPerSalaryStatus:
        getSalaryFre === "weekly"
          ? salaryPerWeek
          : getSalaryFre === "monthly"
          ? salaryPerMonth
          : salaryToBeProvided,
      projectDuration: projectDuration,
    };

    const resJson = await response.data;
    window.location.href = resJson.url;
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
