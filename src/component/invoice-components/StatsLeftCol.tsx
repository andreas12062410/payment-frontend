import React from "react";
import { Props } from "../../helper";

const loadAndDrawQR = (pdfData: any) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    try {
      const ctx = document.createElement("canvas").getContext("2d");
      if (ctx !== null) {
        ctx.drawImage(img, 0, 0);
        ctx.getImageData(0, 0, 1, 1);
      }
    } catch (_) {
      console.log("Something went wrong while loading QR code");
    }
  };
  img.onerror = function(_) {
    console.log("Something went wrong while loading QR code");
  };

  let url: string = "";
  pdfData?.invoiceData?.custom_fields.forEach((item: any) =>
    item.name === "QR" ? (url = item?.value) : ""
  );

  img.src = url;
  return img;
}

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
          <img src={(() => {
            const img = loadAndDrawQR(pdfData);
            return img.src;
          })()}
            alt="QR">
          </img>
        </div>
      </div>
      <div className="terms-conditions">
        <div className="terms color-purple">Terms and Conditions</div>
        <ul className="list">
          <li className="list-items">
            The accepted official payment method is Stripe.
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
    </div >
  );
};

export default StatsLeftCol;
