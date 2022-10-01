import { Typography } from "@mui/material";

function Description() {
  return (
    <Typography
    // Removing from here and adding in app.scss
      paragraph
      className="payment-description"
    >
      We at Koders truly appreciate your business, and we're so grateful for the
      trust you've placed in us.<br/> We sincerely hope you are satisfied with your
      purchase.
    </Typography>
  );
}

export default Description;
