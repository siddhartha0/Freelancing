import React from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import Jobapi from "../../api/Jobapi";

export default function Sewa({
  total,
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
  const uuid = Date.now();
  const message = `total_amount=${total},transaction_uuid=${uuid},product_code=EPAYTEST`;
  const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

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
        url: `http://localhost:3333/esewa/${totalSalary}`,
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

  // const url = `http://localhost:3000/success`;

  return (
    <div>
      {/* <form action={handlePayment}>
        <input type="hidden" id="amount" name="amount" value={total} required />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value="0"
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={total}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={uuid}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value="http://localhost:3000/success"
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value="http://localhost:8000/failed"
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={hashInBase64}
          required
        />
        <button
          type="submit"
          style={{
            background: "green",
            padding: "10px",
            border: "none",
          }}
        >
          Pay with Esewa
        </button>
      </form> */}
      <button
        style={{
          background: "green",
          padding: "10px",
          border: "none",
        }}
        onClick={handlePayment}
      >
        Pay with Esewa
      </button>
    </div>
  );
}
