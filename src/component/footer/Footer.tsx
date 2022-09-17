import { Stack, Grid, Link } from "@mui/material";
import { kFooterLink } from "../../constant/footer";

function Footer() {
  return (
    <Grid justifyContent="center" container>
      <Grid item xs={12} sm={8} lg={8}>
        <Stack justifyContent="space-between" flexWrap="wrap" direction="row">
          {kFooterLink.map(({ title, link }, i) => (
            <Link
              href={link}
              fontWeight="400"
              fontSize="15px"
              underline="hover"
              color="rgba(255,255,255,0.5)"
              sx={{
                ":hover": {
                  color: "#ffffff",
                },
              }}
              key={title}
            >
              {title}
            </Link>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Footer;
