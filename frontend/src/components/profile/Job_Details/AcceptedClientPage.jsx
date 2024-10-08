import React, { useEffect, useState } from "react";
import css from "./ClientPage.module.css";
import { IoChevronBack, IoMailOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPhone, FaLocationArrow } from "react-icons/fa6";
import profile from "../../../assets/noUser.jpg";
import ToDo from "./ToDo";
import { useNavigate, useParams } from "react-router";
import Jobapi from "../../api/Jobapi";
import { DragDropContext } from "react-beautiful-dnd";

function AcceptedClientPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [selectedJobDetails, setSelectedJobDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const job = await Jobapi.searchingJob(id);
      setSelectedJobDetails(job.data.details);
    };
    fetchData();
  }, [id]);

  return (
    <DragDropContext>
      <div className={css.mainDiv}>
        <div className={css.topDiv}>
          <IoChevronBack className={css.icon} onClick={() => nav("/notify")} />
          <article>Client Details</article>
        </div>

        <div className={css.bodyDiv}>
          <div className={css.bodyTopDiv}>
            <section className={css.profileContainer}>
              <div className={css.imgDiv}>
                <img src={profile} alt="profile" className={css.profilePics} />
              </div>

              <div className={css.informationDiv}>
                <div className={css.topRightDiv}></div>
                <header className={css.headDiv}>
                  <article>
                    {selectedJobDetails?.acceptedClientId?.jobTitle}
                  </article>
                </header>
                <container className={css.duoDiv}>
                  <FaUser className={css.logo} />
                  <article>
                    {selectedJobDetails?.acceptedClientId?.name}
                  </article>
                </container>
                <container className={css.duoDiv}>
                  <FaLocationArrow className={css.logo} />
                  <article>
                    {selectedJobDetails?.acceptedClientId?.address}
                  </article>
                </container>
                <container className={css.duoDiv}>
                  <IoMailOutline className={css.logo} />
                  <article>
                    {selectedJobDetails?.acceptedClientId?.email}
                  </article>
                </container>
                <container className={css.duoDiv}>
                  <FaPhone className={css.logo} />
                  <article>
                    {selectedJobDetails?.acceptedClientId?.contact}
                  </article>
                </container>
              </div>
            </section>

            <container className={css.profileContainer}>
              <div className={css.informationDiv}>
                <header className={css.headDiv}>
                  <article>
                    {selectedJobDetails?.acceptedClientId?.jobTitle}
                  </article>
                </header>
                <container className={css.duoDiv}>
                  <article>Project Duration</article>
                  <span>{selectedJobDetails?.projectDuration}</span>
                </container>
                <container className={css.duoDiv}>
                  <article>Total Salary</article>
                  <article>{selectedJobDetails?.salary}</article>
                </container>
                <container className={css.duoDiv}>
                  <article>Salary Frequency</article>
                  <article>{selectedJobDetails?.salaryStatus}</article>
                </container>
              </div>
            </container>
          </div>

          <ToDo
            selectedJobDetails={selectedJobDetails}
            setSelectedJobDetails={setSelectedJobDetails}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default AcceptedClientPage;
