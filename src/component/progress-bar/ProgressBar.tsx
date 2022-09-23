import { paymentTheme } from "../../constant/theme";
import { Box, LinearProgress, ThemeProvider, Typography } from "@mui/material";

function ProgressBar({ value, type, status, index }: Props) {
  return (
    <>
      <ThemeProvider theme={paymentTheme}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            {status === "open" ? (
              index !== 0 ? (
                <LinearProgress variant="determinate" value={value} />
              ) : (
                <LinearProgress
                  variant="buffer"
                  value={value}
                  valueBuffer={value}
                />
              )
            ) : (
              <LinearProgress variant="determinate" value={value} />
            )}
          </Box>
          <Box sx={{ minWidth: 35 }} width="11%">
            <Typography variant="body2" color="white" fontSize="12px">
              {type}: {`${Math.round(value)}% `}
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default ProgressBar;

interface Props {
  value: number;
  type: string;
  status: string;
  index: number;
}
