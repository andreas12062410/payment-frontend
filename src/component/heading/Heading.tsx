import { Typography } from "@mui/material";

function Heading() {
  return (
    <Typography fontSize="60px" textAlign="center" variant="h1" color="#ffffff">
      Thank you for choosing{" "}
      <Typography
        fontWeight="500"
        display="inline"
        fontSize="60px"
        color="#00A99D"
      >
        Koders
      </Typography>
    </Typography>
  );
}

export default Heading;
