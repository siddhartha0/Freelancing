import React, { useEffect, useState } from "react";
import css from "./ClientPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getJobsPost, updateJob } from "../../slices/PostSlice";
import Jobapi from "../../api/Jobapi";

function ToDo({ selectedJobDetails, setSelectedJobDetails }) {
  const [newWork, setNewWork] = useState("");

  const dispatch = useDispatch();

  const addToDo = (e) => {
    e.preventDefault();

    if (selectedJobDetails) {
      const updateValue = {
        ...selectedJobDetails,
        newToDos: [...selectedJobDetails.newToDos, newWork],
      };
      setSelectedJobDetails(updateValue);
      dispatch(updateJob(updateValue));
    }
    setNewWork("");
  };

  return (
    <div className={css.toDoDiv}>
      <div className={css.addDiv}>
        <header>Add Work</header>
        <form className={css.inputDiv} onSubmit={addToDo}>
          <input
            type="text"
            className={css.input}
            placeholder="Enter the task..."
            value={newWork}
            onChange={(e) => setNewWork(e.target.value)}
          />
          <button className={css.btn} type="submit">
            Add
          </button>
        </form>

        <container className={css.showToDo}>
          {selectedJobDetails?.newToDos?.length > 0 ? (
            selectedJobDetails?.newToDos.map((toDo, i) => (
              <div className={css.showToDoDiv} key={i}>
                <article>{toDo}</article>

                <div className={css.buttonDiv}>
                  <button className={css.btn}>Edit</button>
                  <button className={css.btn}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <article
              style={{
                width: "90%",
                margin: "auto",
              }}
            >
              Create the task for your client
            </article>
          )}
        </container>
      </div>

      <div className={css.finishedDiv}>
        <header>Finished Work</header>
        {selectedJobDetails?.finishedToDos?.length > 0 ? (
          selectedJobDetails.finishedToDos.map((toDo, i) => (
            <article key={i}>{toDo}</article>
          ))
        ) : (
          <article
            style={{
              margin: "2rem",
              fontSize: "15px",
            }}
          >
            No Task has been completed yet..
          </article>
        )}
      </div>
    </div>
  );
}

export default ToDo;
