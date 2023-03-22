import html2pdf from "html2pdf.js";
import { useEffect, useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";

import { Spacer } from "../../component";
import { fetchData } from "../../helper";
import Cards from "../../component/invoice-components/Cards";
import Table from "../../component/invoice-components/Table";
import Header from "../../component/invoice-components/Header";
import StatsLeftCol from "../../component/invoice-components/StatsLeftCol";
import StatsRightCol from "../../component/invoice-components/StatsRightCol";

import "../../App.scss";
import { showToaster } from "../../helper/toast";
import { useNavigate } from "react-router-dom";

interface Props {
  showInvoice: {
    projectIdentifier: string;
    isLoggedIn: boolean;
    apiKey: string;
  };
  setShowInvoice: (data: {
    projectIdentifier: string;
    isLoggedIn: boolean;
    apiKey: string;
  }) => void;
}
const Invoice = ({ setShowInvoice, showInvoice }: Props) => {
  const [pdfData, setPdfData] = useState<any>(null);
  const [isClicked, setIsClicked] = useState<any>(false);
  const pdfRef: any = useRef();

  const navigator = useNavigate();

  const generatePDF = async () => {
    setIsClicked(true);
    const pdfRe = pdfRef.current;
    const options = {
      filename: "invoice.pdf",
      pagesplit: true,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "p", margin: 10 },
    };
    await html2pdf().set(options).from(pdfRe).save();
    setIsClicked(false);
  };
  useEffect(() => {
    if (pdfData === null && showInvoice.projectIdentifier && showInvoice.apiKey)
      (async () => {
        const res = await fetchData(
          showInvoice.projectIdentifier,
          showInvoice.apiKey
        );
        if (res) setPdfData(res);
        else {
          showToaster("Unable to load data", "error");
          navigator("/");
        }
      })();
  }, [pdfData, showInvoice.projectIdentifier, showInvoice.apiKey]);
  console.log(pdfData);
  if (pdfData === null)
    return (
      <div className="loader-container">
        <CircularProgress />
      </div>
    );
  else
    return (
      <div className="invoice">
        <div ref={pdfRef}>
          <Main {...pdfData} />
        </div>
        <Spacer isWidth={true} height={15} width="100%" />
        <div>
          <Button
            disabled={isClicked}
            style={{
              display: "block",
              margin: "0 auto",
              width: "13rem",
            }}
            onClick={generatePDF}
            variant="contained"
          >
            {isClicked ? "Loading..." : "Download Now"}
          </Button>
        </div>
      </div>
    );
};

function Main(pdfData: any) {
  return (
    <div className="main">
      <Header {...{ pdfData }} />
      <Cards {...{ pdfData }} />
      <Table {...{ pdfData }} />
      <div className="stats-sec">
        <StatsLeftCol {...{ pdfData }} />
        <StatsRightCol {...{ pdfData }} />
      </div>
    </div>
  );
}

export default Invoice;
