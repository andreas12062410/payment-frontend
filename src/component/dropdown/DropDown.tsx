import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckCircle from '@mui/icons-material/CheckCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
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
  description,
  doneRatio,
  dueDate,
  issues,
  index,
}: Props) => {
  const dueIn = () => {
    const due = new Date(dueDate);
    const today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  };
  return (
      <Box width="90%">
             {status === "open" ? (
              index === 0 ? (
                <Typography> {title} </Typography> 
              ) : (
                <div style={{ display: "flex"}}> <Typography marginRight="5px"> {title} </Typography> <RemoveCircle /> </div>
              )
            ) : (
                <div style={{ display: "flex"}}> <Typography marginRight="5px"> {title} </Typography> <CheckCircle sx={{ fill: "#20B2AA !important"}} /> </div>
            )}

        <Typography fontSize="12px" >
          {description ? description : ""}
        </Typography>
        <Spacer height={5} />
        <Typography fontSize="12px">
          {status === "closed" ? "Delievered" : dueDate && <> Delivering in {dueDate ? dueIn() === 1 ? dueIn() + " day" : dueIn() + " days" : "" }</>}
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
