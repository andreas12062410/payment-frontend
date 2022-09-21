import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#20B2AA',
    }
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
}: Props) => {
  console.log(dueDate);
  return (
    <Box width="90%">
      <Typography>
        {title} ({status})
      </Typography>
      <Typography>
        Description: {description ? description : "N/A"} 
        <br />
        Delivering in {dueDate ? dueDate : "N/A"}
      </Typography>
      <ProgressBar value={doneRatio / issues.length} type="Progress" />
      <ProgressBars
        {...{
          estimatedHours: estimatedHours,
          spentTime: spentHours,
        }}
      />
    </Box>
  );
};

export default DropDown;

const ProgressBar = ({ value, type }: { value: number; type: string }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "70%", mr: 1 }}>
            <LinearProgress
              variant="buffer"
              value={value}
              valueBuffer={100}
            />
          </Box>
          <Box sx={{ minWidth: 35 }} width="30%">
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
}: {
  spentTime: number;
  estimatedHours: number;
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "70%", mr: 1 }}>
              <LinearProgress
                variant="buffer"
                value={(spentTime / estimatedHours) * 100}
                valueBuffer={estimatedHours}
                color={spentTime > estimatedHours ? "error" : "primary"}
              />
            </Box>
          <Box sx={{ minWidth: 35 }} width="30%">
            <Typography variant="body2" color="white" fontSize="12px">
              {`Estimated: ${Math.round(estimatedHours)}h Spent: ${Math.round(spentTime)}h `}
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
