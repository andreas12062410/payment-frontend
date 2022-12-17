import { Grid, Paper, Typography } from "@mui/material";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Success() {
  return (
    <Grid className="success-container" container>
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
