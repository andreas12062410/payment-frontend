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
  return (
    <Box width="90%">
      <Typography>
        {title} ({status})
      </Typography>
      <Typography fontStyle="italic">
        {description ? description : "none"} ({dueDate ? dueDate : "none"})
      </Typography>
      <ProgressBar value={doneRatio / issues.length} type=" Done percentage" />
      <ProgressBars
        {...{
          value1: estimatedHours,
          value2: spentHours,
          type1: "Estimated time",
          type2: "Spent time",
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
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={value} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="white" fontSize="12px">
            {`${Math.round(value)}% `}( {type})
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const ProgressBars = ({
  value1,
  value2,
  type1,
  type2,
}: {
  value1: number;
  type1: string;
  value2: number;
  type2: string;
}) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={value1} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="white" fontSize="12px">
            {`${Math.round(value1)}h `}({type1})
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={value2} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="white" fontSize="12px">
            {`${Math.round(value2)}h `}({type2})
          </Typography>
        </Box>
      </Box>
    </>
  );
};
