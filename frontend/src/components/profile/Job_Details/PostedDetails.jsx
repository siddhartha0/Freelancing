import React, { useState } from "react";
import css from "./Posted.module.css";
import ApplicantsPage from "./ApplicantsPage";

export default function PostedDetails({ selectedJobDetails }) {
  const [showapplicants, setShowapplicants] = useState(false);

  return (
    <div className={css.container}>
      <div
        className={css.containerBody}
        style={showapplicants ? { display: "none" } : {}}
      >
        <header>Job Title</header>
        <div className={css.titleDiv}>
          <article>{selectedJobDetails.postTitle}r</article>
        </div>
        <header>Skills Needed</header>
        <div className={css.skillDiv}>
          {selectedJobDetails.skills.map((skill) => (
            <article>{skill.skills}</article>
          ))}
          {/* <article>Css</article> */}
        </div>

        <header>Jobs Description</header>
        <div className={css.descriptionDiv}>
          <article>{selectedJobDetails.postDescription}</article>
        </div>

        <div className={css.btnDiv}>
          <button className={css.btn} onClick={() => setShowapplicants(true)}>
            View applicants
          </button>
          <button className={css.btn}>Edit</button>
          <button className={css.btn}>Delete</button>
        </div>
      </div>

      {showapplicants && (
        <div className={css.applicantsPage}>
          <ApplicantsPage
            setShowapplicants={setShowapplicants}
            jobId={selectedJobDetails._id}
            selectedJobDetails={selectedJobDetails}
          />
        </div>
      )}
    </div>
  );
}
