import { Stack, Grid, Link } from "@mui/material";
import { kFooterLink } from "../../constant/footer";

function Footer() {
  return (
    <Grid justifyContent="center" container>
      <Grid item xs={12} sm={8} lg={8}>
        <Stack
          className="footer-wrapper"
          justifyContent="space-between"
          flexWrap="wrap"
          direction="row"
        >
          {kFooterLink.map(({ title, link }) => (
            <div className="footer-link" key={title}>
              <Link
                margin="5px 0"
                href={link}
                fontWeight="400"
                fontSize="14px"
                underline="none"
                color="rgba(255,255,255,0.5)"
                sx={{
                  ":hover": {
                    color: "#ffffff",
                  },
                }}
              >
                {title}
              </Link>
              <div className="footer-fill" />
            </div>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Footer;
