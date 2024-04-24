import React from "react";

import "./styles.scss";

const Description = ({ description }) => {
  return (
    <>
      {description.text && (
        <section className="description-container">
          <span className="description-phase">{description?.phase}</span>
          <p className="description-text">{description?.text}</p>
        </section>
      )}
    </>
  );
};
export default Description;
