import "./App.scss";
import { Container } from "@mui/material";
import { Footer } from "./component";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { HomePage, SuccessPage } from "./pages";

function App() {
  return (
    <div className="payment-root">
      <Container className="payment-container">
        <Routes>
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <ToastContainer limit={3} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
