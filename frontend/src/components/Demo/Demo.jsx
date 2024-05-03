import React, { memo } from "react";
import SkillTaker from "./SkillTaker";
import { IoClose } from "react-icons/io5";

const Demo = ({ skill, setSkills, totalSkill, setTotalSkill }) => {
  const addField = (e) => {
    e.preventDefault();
    setTotalSkill((prev) => [...prev, skill]);
    setSkills("");
  };

  const removeSkills = (i) => {
    const remainingSkills = totalSkill.filter((skills, index) => index !== i);
    setTotalSkill(remainingSkills);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          borderRadius: 4,
        }}
      >
        {totalSkill &&
          totalSkill.map((skill, i) => (
            <div
              key={skill + i}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#DA5828",
                fontSize: 16,
                padding: 5,
                borderRadius: 5,
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <span key={skill + i}>{skill}</span>
              <IoClose
                style={{
                  cursor: "pointer",
                }}
                onClick={() => removeSkills(i)}
              />
            </div>
          ))}
      </div>
      <SkillTaker skill={skill} setSkills={setSkills} addField={addField} />
    </div>
  );
};

export default memo(Demo);
