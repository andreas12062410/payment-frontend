import "./App.scss";
import { Container } from "@mui/material";
import { Footer } from "./component";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { HomePage, SuccessPage } from "./pages";

function App() {
  return (
    <Container className="payment-container">
      <Routes>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <div className="payment-footer">
        <Footer />
      </div>
      <ToastContainer limit={3} />
    </Container>
  );
}

export default App;
