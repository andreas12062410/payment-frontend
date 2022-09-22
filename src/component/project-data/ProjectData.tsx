import Spacer from "../spacer/Spacer";
import { Avatar, Typography } from "@mui/material";

const ProjectData = ({ projectIcon, projectName, description }: Props) => {
  return (
    <>
      <div
        style={{
          border: "2px solid rgba(0, 169, 157, 0.8)",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          margin: "0 auto",
        }}
      >
        <Avatar
          style={{ height: "100%", width: "100%" }}
          alt="pIcon"
          src={projectIcon}
        />
      </div>
      <Spacer height={25} />
      <Typography
        fontSize="22px"
        color="rgba(255,255,255,0.81)"
        variant="h2"
        textAlign="center"
      >
        {projectName}
      </Typography>
      <Spacer height={15} />
      <Typography
        fontSize="18px"
        fontStyle="italic"
        color="rgba(255,255,255,0.81)"
        variant="h2"
        textAlign="center"
      >
        {description}
      </Typography>
      <Spacer height={15} />
    </>
  );
};

export default ProjectData;

interface Props {
  description: string;
  projectIcon: string;
  projectName: string;
}
