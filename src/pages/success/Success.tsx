import { Grid, Paper, Typography } from "@mui/material";
import { AnimatedTicker } from "../../component";

function Success() {
  return (
    <Grid className="success-container" container>
      <Grid lg={6} item>
        <Paper elevation={10} className="success-card">
          <AnimatedTicker />
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
