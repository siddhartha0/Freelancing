import axios from "axios";
import React from "react";

function Khalti(total) {
  const khalti = async () => {
    console.log(total);
    const response = await axios.get(
      `http://localhost:3333/khalti/${total.total}`
    );
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
