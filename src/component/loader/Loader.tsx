import React from "react";
import Spacer from "../spacer/Spacer";
import { CircularProgress, Stack } from "@mui/material";

function Loader({ isLoading, type }: Props) {
  return isLoading ? (
    type === "spinner" ? (
      <React.Fragment>
        <Stack direction="row" justifyContent="center">
          <CircularProgress
            size={25}
            style={{ color: "#ffffff", margin: "auto" }}
          />
        </Stack>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Spacer isWidth={true} height={15} width="100%" />
        <div className="loader-text">
          <p>Fetching releases</p>
          <span></span>
          <span></span> <span></span>
        </div>
      </React.Fragment>
    )
  ) : null;
}

export default Loader;

type loaderType = "spinner" | "loader";

interface Props {
  isLoading: boolean;
  type: loaderType;
}
