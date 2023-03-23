import React from "react";
import { Props } from "../../helper";

const Cards = ({ pdfData }: Props) => {
  return (
    <div className="card-container">
      <div className="card bg-purple">
        <h2 className="color-purple">Billed By</h2>
        <h4>Koders</h4>
        <div>Pream Nagar, Dehradun</div>
        <div>Uttrakhand, India</div>
        <div style={{ marginTop: "5px" }}>
          <span style={{ fontWeight: 700, color: "black" }}>Email: </span>
          support@koders.in
        </div>
        <div style={{ marginTop: "5px" }}>
          <span style={{ fontWeight: 700, color: "black" }}>Phone: </span>
          0135-3504103
        </div>
      </div>
      <div className="card bg-purple">
        <h2 className="color-purple">Billed To</h2>
        <h4>
          {pdfData?.contactDetails?.first_name +
            " " +
            pdfData?.contactDetails?.middle_name +
            " " +
            pdfData?.contactDetails?.last_name}
        </h4>
        <div>
          {pdfData?.contactDetails?.address?.full_address?.full_address}
        </div>
        <div style={{ marginTop: "5px" }}>
          <span style={{ fontWeight: 700, color: "black" }}>Email: </span>
          {pdfData?.contactDetails?.emails[0]?.address}
        </div>
        {pdfData?.contactDetails?.phones[0]?.number && (
          <div style={{ marginTop: "5px" }}>
            <span style={{ fontWeight: 700, color: "black" }}>Phone: </span>
            {pdfData?.contactDetails?.phones[0]?.number}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
