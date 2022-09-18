import "./App.scss";
import { Container } from "@mui/material";
import {
  Description,
  Footer,
  Heading,
  ProjectDetailForm,
  Spacer,
} from "./component";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Container className="payment-container">
      <div>
        <Heading />
        <Description />
        <Spacer height={50} />
        <ProjectDetailForm />
      </div>
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
      <ToastContainer limit={3} />
    </Container>
  );
}

export default App;
