import React from "react";

interface Props {
  text: string;
  link: string;
}
const HyperLink = ({ link, text }: Props) => {
  return (
    <span
      onClick={() => window.open(link, "_blank")}
      style={{
        color: "#00a99d",
        cursor: "pointer",
      }}
    >
      &nbsp;{text}
    </span>
  );
};

export default HyperLink;
