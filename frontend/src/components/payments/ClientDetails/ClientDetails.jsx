import { useEffect, useState } from "react";
import css from "./Client.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Userapi from "../../api/Userapi";
import applicationapi from "../../api/applicationapi";

function ClientDetails() {
  const nav = useNavigate();
  const { id } = useParams();

  const [clientDetails, setClientDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const getapplication = await applicationapi.getMyapplication(id);
      const getUser = await Userapi.getById(getapplication.data.userId);
      setClientDetails(getUser.data.user);
    };
    fetchData();
  }, [id]);

  return (
    <div className={css.mainDiv}>
      <div className={css.topDiv}>
        <header
          style={{
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          Basic Details
        </header>
        <div className={css.infoDiv}>
          <div className={css.inputDiv}>
            <label>User Id</label>
            <span className={css.input}>{clientDetails?._id}</span>
          </div>

          <div className={css.inputDiv}>
            <label>User</label>
            <span className={css.input}>{clientDetails?.name}</span>
          </div>
        </div>
      </div>

      <div className={css.topDiv}>
        <header
          style={{
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          Personal Details
        </header>
        <div className={css.infoDiv}>
          <div className={css.inputDiv}>
            <label>Email</label>
            <span className={css.input}>{clientDetails?.email}</span>
          </div>

          <div className={css.inputDiv}>
            <label>addresss</label>
            <span className={css.input}>{clientDetails?.address}</span>
          </div>

          <div className={css.inputDiv}>
            <label>Contact</label>
            <span className={css.input}>{clientDetails?.contact}</span>
          </div>

          <div className={css.inputDiv}>
            <label>Skills</label>
            <span className={css.input}>
              {clientDetails?.skill.map((s) => s.skill + " ")}
            </span>
          </div>

          <div className={css.inputDiv}>
            <label>Jaagir Khoji Experience</label>
            <span className={css.input}>
              {clientDetails?.experience.map((e) => e + " ")}
            </span>
          </div>
        </div>
      </div>

      <button className={css.btn} onClick={() => nav("project")}>
        Next
      </button>
    </div>
  );
}

export default ClientDetails;
