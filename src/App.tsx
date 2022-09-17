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
    <Container style={{ height: "95vh", padding: "1rem " }}>
      <div className="full-height">
        <Heading />
        <Description />
        <Spacer height={50} />
        <ProjectDetailForm />
      </div>
      <Footer />
      <ToastContainer limit={3} />
    </Container>
  );
}

export default App;
