import Jobapi from "../../api/Jobapi";
import axios from "axios";

export default function Pay({
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
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const tosend = {
        totalSalary: totalSalary,
        projectDuration: projectDuration,
        details: projectDetails,
      };
      const res = await axios({
        method: "get",
        url: `http://localhost:3333/paypal/${totalSalary}`,
        data: tosend,
      });

      console.log(projectDetails);
      console.log(userDetails);
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
      // console.log(res);

      if (res && res.data) {
        window.location.href = res.data.links[1].href;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button
        style={{
          background: "#003087",
          cursor: "pointer",
          padding: "10px",
          border: "none",
        }}
        onClick={handlePayment}
      >
        Pay With Paypal
      </button>
    </>
  );
}
