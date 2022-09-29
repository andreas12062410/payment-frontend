import Spacer from "../spacer/Spacer";
import { Typography, Box } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import ProjectStatus from "../project-status/ProjectStatus";
import Badge from "../badge/Badge";

const DropDown = ({
  title,
  status,
  description,
  doneRatio,
  dueDate,
  issues,
  index,
  paymentStatus,
}: Props) => {
  const dueInString = (): string => {
    if (dueDate == null || dueDate === undefined) return "";
    const due = new Date(dueDate);
    const today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / 86400000);
    if (diff === 1) return `${diff} day`;
    else return `${diff} days`;
  };

  return (
    <Box width="90%">
      <ProjectStatus index={index} status={status} title={title} />
      <Badge title={paymentStatus} isDelivered={status === "closed"} />
      <Typography fontSize="12px">{description ? description : ""}</Typography>
      <Spacer height={5} />
      <Typography fontSize="12px">
        {status === "closed"
          ? "Delievered"
          : dueDate && <> Delivering in {dueDate && dueInString()}</>}
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
  paymentStatus: string;
}
