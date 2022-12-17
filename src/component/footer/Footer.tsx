import { Grid, Link } from "@mui/material";
import { kFooterLink } from "../../constant/footer";

function Footer() {
  return (
    <Grid className="footer-wrapper" justifyContent="center" container>
      <Grid item xs={12} sm={8} lg={8}>
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
      </Grid>
    </Grid>
  );
}

export default Footer;
