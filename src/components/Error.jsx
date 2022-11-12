import React from "react";

const Error = (props) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="alert alert-dark w-25 text-center fst-italic fw-bold text-secondary" role="alert">
        {props.info}
      </div>
    </div>
  );
};

export default Error;
