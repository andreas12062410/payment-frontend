import "./App.scss";
import { Container } from "@mui/material";
import { Footer } from "./component";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { HomePage, Invoice, SuccessPage } from "./pages";
import { useState } from "react";

function App() {
  const [showInvoice, setShowInvoice] = useState({
    projectIdentifier: "",
    isLoggedIn: false,
  });
  return (
    <div className="payment-root">
      <Container className="payment-container">
        <Routes>
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/"
            element={<HomePage {...{ showInvoice, setShowInvoice }} />}
          />
          {showInvoice.isLoggedIn && (
            <Route
              path="/invoice"
              element={<Invoice {...{ showInvoice, setShowInvoice }} />}
            />
          )}
        </Routes>
        <ToastContainer limit={3} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
