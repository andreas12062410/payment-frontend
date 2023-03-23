import React from "react";
import { Props } from "../../helper";
import logo from "../../assets/Images/logo1.png";

const Header = ({ pdfData }: Props) => {
  return (
    <div className="header">
      <div className="info-header">
        <h1 className="color-purple">
          {pdfData?.contactDetails?.first_name +
            " " +
            pdfData?.contactDetails?.middle_name +
            " " +
            pdfData?.contactDetails?.last_name}
        </h1>
        <div>
          <span className="color-gray">
            {((pdfData?.invoiceData?.status?.name !== "Estimate") || (pdfData?.invoiceData?.status?.name !== "Draft"))
              ? "Invoice"
              : "Quotation"}{" "}
            No #&nbsp;&nbsp;&nbsp;
          </span>
          <span>{pdfData?.invoiceData?.number}</span>
        </div>
        <div>
          <span className="color-gray">
            {((pdfData?.invoiceData?.status?.name !== "Estimate") || (pdfData?.invoiceData?.status?.name !== "Draft"))
              ? "Invoice"
              : "Quotation"}{" "}
            Date&nbsp;&nbsp;&nbsp;
          </span>
          <span>{pdfData?.invoiceData?.invoice_date}</span>
        </div>
      </div>
      <div className="text-header">
        {((pdfData?.invoiceData?.status?.name !== "Estimate") || (pdfData?.invoiceData?.status?.name !== "Draft"))
          ? "Invoice"
          : "Quotation"}
      </div>
      <div className="logo-header" style={{ height: "100%" }}>
        <img src={logo} alt="koders" style={{ width: "70%" }} />
      </div>
    </div>
  );
};

export default Header;
