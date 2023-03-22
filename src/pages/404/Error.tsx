import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator("/");
  });
  return <div></div>;
};

export default Error;
