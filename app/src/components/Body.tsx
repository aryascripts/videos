import React from "react";
import "./Body.scss";

export const Body: React.FC = (props) => {
  return <div className="content">{props.children}</div>;
}
