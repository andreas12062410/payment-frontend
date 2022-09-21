import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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
      <Typography fontStyle="italic">
        description:{description ? description : "none"} (
        {dueDate ? dueDate : "none"})
      </Typography>
      <ProgressBar value={doneRatio / issues.length} type=" Done percentage" />
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "70%", mr: 1 }}>
          <LinearProgress
            variant="buffer"
            value={value}
            valueBuffer={value + 10}
          />
        </Box>
        <Box sx={{ minWidth: 35 }} width="30%">
          <Typography variant="body2" color="white" fontSize="12px">
            {`${Math.round(value)}% `}( {type})
          </Typography>
        </Box>
      </Box>
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
            {`${Math.round(spentTime)}h `}(Estimated vs spent time)
          </Typography>
        </Box>
      </Box>
    </>
  );
};
