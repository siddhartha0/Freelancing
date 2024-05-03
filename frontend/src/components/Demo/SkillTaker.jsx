import React from "react";

const SkillTaker = (data) => {
  return (
    <div>
      <form action="submit" onSubmit={data.addField}>
        <input
          type="text"
          value={data.skill}
          onChange={(e) => data.setSkills(e.target.value)}
          placeholder="skills..."
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            width: "100%",
            borderRadius: " 4px",
            fontSize: "18px",
            color: " #000",
            outline: "none",
            border: "0.2px solid #86848418",
          }}
        />
      </form>
    </div>
  );
};

export default SkillTaker;
