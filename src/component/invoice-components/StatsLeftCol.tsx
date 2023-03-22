import React from "react";
import { Props } from "../../helper";

const StatsLeftCol = ({ pdfData }: Props) => {
  return (
    <div className="stats-sec-col1">
      <div className="main-card-container">
        <div className="main-card bg-purple">
          <div className="color-purple">Bank Details</div>
          <div className="bank-detail">
            <div>Account Holder Name</div>
            <div>Koders Korp LLP</div>
          </div>
          <div className="bank-detail">
            <div>Account Number</div>
            <div>740205000381</div>
          </div>
          <div className="bank-detail">
            <div>IFSC</div>
            <div>ICIC0007402</div>
          </div>
          <div className="bank-detail">
            <div>Account Type </div>
            <div>Current</div>
          </div>
          <div className="bank-detail">
            <div>Bank</div>
            <div>ICICI</div>
          </div>
        </div>
        <div className="qr-cont">
          <div>Scan to Pay</div>
          <img
            // src={qr}
            src={(() => {
              let url: string = "";
              pdfData?.invoiceData?.custom_fields.forEach((item: any) =>
                item.name === "QR" ? (url = item?.value) : ""
              );
              console.log(url);
              return url;
            })()}
            alt=""
          />
        </div>
      </div>
      <div className="terms-conditions">
        <div className="terms color-purple">Terms and Conditions</div>
        <ul className="list">
          <li className="list-items">
            The accepted official payment method is Stripe.
          </li>
          <li className="list-items">
            10% discount applied for new customers. Discount applies for the
            first project only.
          </li>
          {(() => {
            let tandc: any = pdfData?.invoiceData?.custom_fields.filter(
              (item: any) => item.name === "Terms & Condition"
            );
            if (tandc)
              return tandc[0]?.value?.split(",").map(
                (item: string, i: number) =>
                  item && (
                    <li className="list-items" key={i}>
                      {item}
                    </li>
                  )
              );
          })()}
        </ul>
      </div>
    </div>
  );
};

export default StatsLeftCol;
