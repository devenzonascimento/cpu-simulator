import React from "react";

import "./styles.scss";

const Description = ({ description }) => {

  if (description.text) {
    return (
      <div className="description-container">
        <span className="description-phase">{description?.phase}</span>
        <p className="description-text">{description?.text}</p>
      </div>
    );
  } else return <></>;
};

export default Description;
