import "./App.css";
import {
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import { Spacer } from "./component";
import { SyntheticEvent, useState } from "react";
import { FormPayload, useFormSubmitHook } from "./hooks/form";

function App() {
  const formSubmit = useFormSubmitHook();
  const [form, setForm] = useState<FormPayload>({
    apiKey: "",
    projectIdentifier: "",
  });

  const handleSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    await formSubmit(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <Container>
      <Paper>
        <Grid
          minHeight="50vh"
          style={{ padding: "20px" }}
          container
          justifyContent="center"
          alignContent="center"
        >
          <Grid item lg={6} sm={12}>
            <Typography textAlign="center" variant="h5">
              Enter Details
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
              component="form"
              onSubmit={handleSubmitForm}
              noValidate
            >
              <TextField
                label="Project ID"
                name="projectIdentifier"
                onChange={handleChange}
                value={form.projectIdentifier}
                required
              />
              <Spacer height={20} />
              <TextField
                onChange={handleChange}
                label="API key"
                name="apiKey"
                value={form.apiKey}
                required
              />
              <Spacer height={20} />
              <Button type="submit" size="medium" variant="outlined">
                Fetch Milestone
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
