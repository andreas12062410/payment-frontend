import "./App.scss";
import { Container } from "@mui/material";
import { Footer } from "./component";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Error, HomePage, Invoice, SuccessPage } from "./pages";
import { useState } from "react";

function App() {
  const [showInvoice, setShowInvoice] = useState({
    projectIdentifier: "",
    isLoggedIn: false,
    apiKey: "",
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
          {showInvoice.isLoggedIn && showInvoice.projectIdentifier && (
            <Route
              path="/invoice"
              element={<Invoice {...{ showInvoice, setShowInvoice }} />}
            />
          )}
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer limit={3} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
