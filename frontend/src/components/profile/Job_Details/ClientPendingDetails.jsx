import React, { useEffect, useState } from "react";
import css from "./ClientPending.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { updateJob } from "../../slices/PostSlice";

import Userapi from "../../api/Userapi";
import Jobapi from "../../api/Jobapi";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";

function ClientPendingDetails() {
  const { id } = useParams();

  const [myJob, setMyJob] = useState();
  const [bossDetails, setBossDetails] = useState({});
  const [completedTasks, setCompletedTasks] = useState();
  const [toDoTasks, setToDoTasks] = useState();

  useEffect(() => {
    const post = async () => {
      const job = await Jobapi.searchingJob(id);

      setMyJob(job.data.details);
      setToDoTasks(job.data.details.newToDos);

      setCompletedTasks(job.data.details.finishedToDos);
      const boss = job.data.details.ownerId;
      const BossDetailResponse = await Userapi.getById(boss);
      setBossDetails(BossDetailResponse.data.user);
    };
    post();
  }, [id]);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const markComplete = (task) => {
    console.log(myJob);
    const removeFinished = myJob.newToDos.filter((todo) => todo !== task);
    const newUpdatedCompleteToDos = {
      ...myJob,
      finishedToDos: [...myJob.finishedToDos, task],
      newToDos: removeFinished,
    };
    setMyJob(newUpdatedCompleteToDos);
    dispatch(updateJob(newUpdatedCompleteToDos));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add,
      finished = completedTasks,
      remaining = toDoTasks;

    if (source.droppableId === "completedDiv") {
      add = finished[source.index];
      finished.splice(source.index, 1);
    } else {
      add = remaining[source.index];
      remaining.splice(source.index, 1);
    }

    if (destination.droppableId === "completedDiv") {
      finished.splice(destination.index, 0, add);
    } else {
      remaining.splice(destination.index, 0, add);
    }

    setCompletedTasks(finished);
    setToDoTasks(remaining);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={css.startDiv}>
        <div className={css.topDiv}>
          <IoIosArrowBack className={css.icon} onClick={() => nav("/notify")} />
          <header>{myJob?.postTitle}</header>
        </div>

        <div className={css.bodyStartDiv}>
          <Droppable droppableId="completedDiv">
            {(provide) => (
              <div
                className={css.completedDiv}
                ref={provide.innerRef}
                {...provide.droppableProps}
              >
                <header>Completed Task</header>
                <hr />

                {completedTasks?.length > 0 ? (
                  completedTasks?.map((todo, i) => (
                    <Draggable draggableId={todo} index={i}>
                      {(provide) => (
                        <article
                          key={i}
                          ref={provide.innerRef}
                          {...provide.draggableProps}
                          {...provide.dragHandleProps}
                        >
                          {todo}
                        </article>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <article
                    style={{
                      color: "orange",
                      display: "flex",
                      width: "90%",
                      margin: "auto",
                    }}
                  >
                    No task has been completed yet
                  </article>
                )}

                {provide.placeholder}
              </div>
            )}
          </Droppable>

          <div className={css.profileDiv}>
            <article style={{}}>{myJob?.postDescription}</article>
            <hr />
            <div className={css.duoDiv}>
              <header>Started Date : </header>
              <article>{myJob?.postedDate.toString().substring(0, 10)}</article>
            </div>

            <div className={css.duoDiv}>
              <header style={{ color: "red" }}>DeadLine :</header>
              <article>{myJob?.deadlineDate}</article>
            </div>
            <div className={css.duoDiv}>
              <header>Owner Name : </header>
              <article
                style={{
                  textTransform: "uppercase",
                  color: "rgb(133, 120, 150)",
                }}
              >
                {bossDetails.name}
              </article>
            </div>

            <div className={css.duoDiv}>
              <header>Owner Email : </header>
              <article
                style={{
                  textTransform: "lowercase",
                  color: "rgb(133, 120, 150)",
                }}
              >
                {bossDetails.email}
              </article>
            </div>

            <div className={css.duoDiv}>
              <header>Owner Contact : </header>
              <article
                style={{
                  textTransform: "uppercase",
                  color: "rgb(133, 120, 150)",
                }}
              >
                {bossDetails.contact}
              </article>
            </div>
            <div className={css.duoDiv}>
              <header>Salary : </header>
              <article style={{ color: "rgb(30, 175, 30)" }}>
                $ {myJob?.salary}
              </article>
            </div>
            <div className={css.duoDiv}>
              <header>Salary Status : </header>
              <article style={{ color: "#ee1f04de" }}>
                {myJob?.salaryStatus}
              </article>
            </div>

            {/* <header>Job Title</header>
          <div className={css.duoDiv}>
            <RiAccountBoxFill className={css.icon} />
            <article>Owner Name</article> */}
            {/* </div> */}
          </div>
        </div>

        <Droppable droppableId="dueTaskDiv">
          {(provide) => (
            <div
              className={css.mainBodyDiv}
              ref={provide.innerRef}
              {...provide.droppableProps}
            >
              <article>Due Task</article>

              <div className={css.detailBodyDiv}>
                {toDoTasks?.length > 0 ? (
                  toDoTasks?.map((job, i) => (
                    <Draggable index={i} draggableId={job}>
                      {(provide) => (
                        <div
                          className={css.actionDiv}
                          key={i}
                          ref={provide.innerRef}
                          {...provide.dragHandleProps}
                          {...provide.draggableProps}
                        >
                          <article>{job}</article>
                          <button
                            className={css.btn}
                            onClick={() => markComplete(job)}
                          >
                            Mark as Complete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <article>Please wait while your client add the task</article>
                )}
              </div>

              {provide.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default ClientPendingDetails;
