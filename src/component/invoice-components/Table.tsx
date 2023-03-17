import React from "react";
import { currency_symbols, Props } from "../../helper";

const Table = ({ pdfData }: Props) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div>S.No</div>
        <div>Item</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Amount</div>
      </div>
      {pdfData?.invoiceData?.lines.map((item: any, i: number) => (
        <div className="table-row" key={i}>
          <div>
            <span>{i + 1}</span>
          </div>
          <div>
            <span>{item?.description}</span>
          </div>
          <div>
            <span>x{item?.quantity}</span>
          </div>
          <div>
            <span>
              {currency_symbols[pdfData?.invoiceData?.currency] + item?.price}
            </span>
          </div>
          <div>
            <span>
              {currency_symbols[pdfData?.invoiceData?.currency] + item?.total}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
