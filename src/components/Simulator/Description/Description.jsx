import React from "react";

import "./styles.scss";

const Description = ({ description }) => {

  {description.text && (
      <div className="description-container">
        <span className="description-phase">{description?.phase}</span>
        <p className="description-text">{description?.text}</p>
      </div>
    );
  }
};

export default Description;
