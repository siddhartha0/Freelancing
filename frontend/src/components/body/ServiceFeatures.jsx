import React from "react";
import css from "./ServiceFeatures.module.css";
import backgroundTheme from "../../assets/rightService.png";
import serviceTheme from "../../assets/serviceTheme.png";
import levelup from "../../assets/levelup.png";
import learn from "../../assets/ideas.png";
import bestFit from "../../assets/bestFit.png";

function ServiceFeatures() {
  return (
    <div className={css.feature}>
      <div className={css.leftFeatures}>
        <img src={backgroundTheme} alt="" className={css.themePics} />
        <img src={serviceTheme} alt="" className={css.serviceTheme} />
      </div>

      <div className={css.rightFeatures}>
        <header>We Are here to help you with:</header>
        <div className={css.duoDiv}>
          <div className={css.backgroundDiv}>
            <img src={levelup} alt="" />
          </div>
          <header>Grow Your Career</header>
        </div>

        <div className={css.duoDiv}>
          <div className={css.secbackgroundDiv}>
            <img src={learn} alt="" />
          </div>
          <header>Learn From Exprets</header>
        </div>

        <div className={css.duoDiv}>
          <div className={css.thirdbackgroundDiv}>
            <img src={bestFit} alt="" />
          </div>
          <header>Find What Fits You</header>
        </div>
      </div>
    </div>
  );
}

export default ServiceFeatures;
