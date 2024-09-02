import React from "react";
import axios from "axios";
import Jobapi from "../../api/Jobapi";
import CryptoJS from "crypto-js";
// export default function Sewa({
//   total,
//   clientId,
//   totalSalary,
//   projectDetails,
//   userDetails,
//   getSalaryFre,
//   salaryToBeProvided,
//   salaryPerWeek,
//   salaryPerMonth,
//   projectDuration,
// }) {
//   const handlePayment = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios({
//         method: "get",
//         url: `http://localhost:3333/esewa/${total.total}`,
//       });

//       console.log(res.data);

//       console.log(projectDetails);
//       console.log(userDetails);
//       const acceptClient = {
//         ...projectDetails,
//         acceptedClientId: userDetails,
//         projectTaken: true,
//         salaryStatus: getSalaryFre,
//         salary: totalSalary,
//         clientRecievedSalary: salaryToBeProvided,
//         moneySentPerSalaryStatus:
//           getSalaryFre === "weekly"
//             ? salaryPerWeek
//             : getSalaryFre === "monthly"
//             ? salaryPerMonth
//             : salaryToBeProvided,
//         projectDuration: projectDuration,
//       };

//       console.log(acceptClient);
//       // await Jobapi.updateJobDetails(acceptClient);
//       // // console.log(res);

//       // if (res && res.data) {
//       // window.location.href = res.data.links[1].href;
//       // }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <button
//         style={{
//           background: "green",
//           padding: "10px",
//           border: "none",
//         }}
//         onClick={handlePayment}
//       >
//         Pay with Esewa
//       </button>
//     </div>
//   );
// }

export default function Sewa(total) {
  const amount = total.total;
  const taxAmount = 0;
  const totalAmount = total.total;
  const productServiceCharge = 0;
  const productDeliveryCharge = 0;
  const successURL = "http://localhost:3000/success";
  const failureURL = "http://localhost:3000/failed";
  const uuid = Date.now();

  const message = `total_amount=${total.total},transaction_uuid=${uuid},product_code=EPAYTEST`;

  const secret = "8gBm/:&EnhH.1/q";
  const s = CryptoJS.HmacSHA256(message, secret);
  const signature = CryptoJS.enc.Base64.stringify(s);

  const submit = async (e) => {
    e.preventDefault();

    console.log(total);
    const acceptClient = {
      acceptedClientId: total.userDetails,
      projectTaken: true,
      salaryStatus: total.getSalaryFre,
      salary: total.total,
      clientRecievedSalary: total.salaryToBeProvided,
      moneySentPerSalaryStatus:
        total.getSalaryFre === "weekly"
          ? total.salaryPerWeek
          : total.getSalaryFre === "monthly"
          ? total.salaryPerMonth
          : total.salaryToBeProvided,
      projectDuration: total.projectDuration,
    };
    await Jobapi.updateJobDetails(acceptClient);
  };

  return (
    <form
      id="esewaForm"
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
      onSubmit={submit}
    >
      <input type="text" name="amount" value={amount} hidden />
      <input hidden type="text" name="tax_amount" value={taxAmount} />
      <input hidden type="text" name="total_amount" value={totalAmount} />
      <input type="text" name="transaction_uuid" value={uuid} hidden />
      <input type="text" name="product_code" value="EPAYTEST" hidden />
      <input
        type="text"
        name="product_service_charge"
        value={productServiceCharge}
        hidden
      />
      <input
        type="text"
        name="product_delivery_charge"
        value={productDeliveryCharge}
        hidden
      />
      <input type="text" name="success_url" value={successURL} hidden />
      <input type="text" name="failure_url" value={failureURL} hidden />
      <input
        type="text"
        id="signed_field_names"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
        required
        hidden
      />
      <input hidden type="text" name="signature" value={signature} />
      <input type="submit" value="eSewa" />
    </form>
  );
}
