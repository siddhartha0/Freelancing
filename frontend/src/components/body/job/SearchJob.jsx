import React, { useEffect, useState } from "react";
import css from "./SearchJob.module.css";
import { IoChevronBackOutline, IoSearchOutline } from "react-icons/io5";
import profile from "../../../assets/RightTheme.png";
import ShowJob from "./ShowJob";
import { useNavigate } from "react-router";
import Userapi from "../../api/Userapi";
import noUser from "../../../assets/noUser.png";

export default function SearchJob() {
  const nav = useNavigate();
  const [userDetails, setuserDetails] = useState();
  const [searchInput, setsearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const result = await Userapi.getById(userId);
      console.log(result.data);
      setuserDetails(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.leftDiv}>
        <IoChevronBackOutline className={css.icon} onClick={() => nav("/")} />
      </div>
      <div className={css.topDiv}>
        <div className={css.searchDiv}>
          <IoSearchOutline className={css.icon} />
          <input
            type="text"
            className={css.input}
            placeholder="Search the job you want"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
          />
        </div>
        <div className={css.rightDiv}>
          <div className={css.picsDiv}>
            {!userDetails ? (
              <img src={noUser} alt="" />
            ) : (
              <img src={profile} alt="profile" />
            )}
          </div>
          <div className={css.profileDiv}>
            <header>{!userDetails ? "Sign In" : userDetails.user.name}</header>
          </div>
        </div>
      </div>

      <div className={css.bodyDiv}>
        <ShowJob searchInput={searchInput} />
      </div>
    </div>
  );
}
