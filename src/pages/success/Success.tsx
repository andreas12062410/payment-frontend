import { Grid, Paper, Typography } from "@mui/material";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Success() {
  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      height="100vh"
      minWidth="100%"
      container
    >
      <Grid lg={6} item>
        <Paper elevation={10} className="success-card">
          <AiOutlineCheckCircle size={100} color="#00a99d" />
          <Typography variant="h4">
            Transaction Completed Successfully
          </Typography>
          <Typography paragraph>Thank you for your billing!</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Success;
