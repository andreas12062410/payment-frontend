import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

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
  const dueIn = () => {
    let due = new Date(dueDate);
    let today = new Date();
    const diff = Math.round((due.getTime() - today.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  };
  return (
    <Box width="90%">
      <Typography>
        {title} ({status})
      </Typography>
      <Typography fontStyle="italic">
        description:{description ? description : "none"} (
        {`Due in ${dueIn()} days`})
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
            className="changeProgressbarColor"
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
            className="changeProgressbarColor"
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
