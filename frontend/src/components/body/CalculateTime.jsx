import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

const CalculateTime = ({ time }) => {
  let showTime = "";

  if (time) {
    const newDate = parseISO(time);
    const difference = formatDistanceToNow(newDate);
    showTime = `${difference} ago`;
  }

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          marginTop: 15,
          marginLeft: 15,
        }}
      >
        posted {showTime}
      </p>
    </div>
  );
};

export default CalculateTime;
