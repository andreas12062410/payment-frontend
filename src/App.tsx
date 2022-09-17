import "./App.scss";
import { Container } from "@mui/material";
import {
  Description,
  Footer,
  Heading,
  ProjectDetailForm,
  Spacer,
} from "./component";

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
    </Container>
  );
}

export default App;
