import React from "react";

export default function IconLink(props) {
  return (
    <>
      <i className={`align-middle ${props.icon}`}></i>
      <span className="align-middle">{props.text}</span>
    </>
  );
}
