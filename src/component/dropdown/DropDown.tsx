import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Spacer from "../spacer/Spacer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#20B2AA",
    },
  },
});

interface Props {
  title: string;
  status: string;
  mileStoneId: number;

  description: string;
  doneRatio: number;

  dueDate: string;
  estimatedHours: number;
  issues: Array<number>;
  spentHours: number;
  index: number;
}

const DropDown = ({
  title,
  status,
  mileStoneId,
  description,
  doneRatio,
  dueDate,
  estimatedHours,
  issues,
  spentHours,
  index,
}: Props) => {
  const dueIn = () => {
    let due = new Date(dueDate);
    let today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  };
  return (
    <Box width="90%">
      <Typography>{title}</Typography>
      <Typography fontSize="12px">{description ? description : ""}</Typography>
      <Spacer height={5} />
      <Typography fontSize="12px">
        {status === "closed"
          ? "Delievered"
          : dueDate && (
              <>
                {" "}
                Delivering in{" "}
                {dueDate
                  ? dueIn() === 1
                    ? dueIn() + " day"
                    : dueIn() + " days"
                  : ""}
              </>
            )}
      </Typography>
      <ProgressBar
        value={status !== "open" ? 100 : doneRatio / issues.length}
        type="Progress"
        status={status}
        index={index}
      />
    </Box>
  );
};

export default DropDown;

const ProgressBar = ({
  value,
  type,
  status,
  index,
}: {
  value: number;
  type: string;
  status: string;
  index: number;
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            {status === "open" ? (
              index !== 0 ? (
                <LinearProgress variant="determinate" value={value} />
              ) : (
                <LinearProgress
                  variant="buffer"
                  value={value}
                  valueBuffer={value}
                />
              )
            ) : (
              <LinearProgress variant="determinate" value={value} />
            )}
          </Box>
          <Box sx={{ minWidth: 35 }} width="11%">
            <Typography variant="body2" color="white" fontSize="12px">
              {type}: {`${Math.round(value)}% `}
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

const ProgressBars = ({
  spentTime,
  estimatedHours,
  status,
}: {
  spentTime: number;
  estimatedHours: number;
  status: string;
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "70%", mr: 1 }}>
            <LinearProgress
              variant="buffer"
              value={
                status !== "open" ? 100 : (spentTime / estimatedHours) * 100
              }
              valueBuffer={estimatedHours}
              color={spentTime > estimatedHours ? "error" : "primary"}
            />
          </Box>
          <Box sx={{ minWidth: 35 }} width="30%">
            <Typography variant="body2" color="white" fontSize="12px">
              {`Estimated: ${Math.round(estimatedHours)}h Spent: ${Math.round(
                spentTime
              )}h `}
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
