import { Backdrop, CircularProgress } from "@mui/material";

function Spinner() {
  return (
    <Backdrop
      sx={{
        color: "#000",
      }}
      open
    >
      <CircularProgress
        size={50}
        style={{ color: "#ffffff", margin: "auto" }}
      />
    </Backdrop>
  );
}

export default Spinner;
