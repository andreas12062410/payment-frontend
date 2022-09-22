import { Typography } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import RemoveCircle from "@mui/icons-material/RemoveCircle";

interface Props {
  status: string;
  title: string;
  index: number;
}

function ProjectStatus({ status, title, index }: Props) {
  return status === "open" ? (
    index === 0 ? (
      <Typography> {title} </Typography>
    ) : (
      <div style={{ display: "flex" }}>
        {" "}
        <Typography marginRight="5px">
          {" "}
          {title}{" "}
        </Typography> <RemoveCircle />{" "}
      </div>
    )
  ) : (
    <div style={{ display: "flex" }}>
      {" "}
      <Typography marginRight="5px"> {title} </Typography>{" "}
      <CheckCircle sx={{ fill: "#20B2AA !important" }} />{" "}
    </div>
  );
}

export default ProjectStatus;
