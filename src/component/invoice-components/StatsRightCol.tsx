import React from "react";
import { currency_symbols, Props } from "../../helper";

const StatsRightCol = ({ pdfData }: Props) => {
  const getEarlyPayData = () => {
    let earlyPayData: any = {};
    pdfData.invoiceData?.custom_fields.forEach((item: any) => {
      if (item?.name === "Early Pay Date") earlyPayData["date"] = item?.value;
      if (item?.name === "Early Pay Discount")
        earlyPayData["discount"] = item?.value;
    });
    return earlyPayData;
  };

  const getTotal = (list: any | undefined) => {
    let sum: number = 0;
    if (list?.length) {
      list.forEach((item: any) => {
        sum = sum + parseInt(item?.price);
      });
    }
    return sum;
  };
  return (
    <div className="stats-sec-col2">
      <div className="amount-container">
        <div className="f-left">Total</div>
        <div className="f-right">
          {currency_symbols[pdfData?.invoiceData?.currency] +
            getTotal(pdfData?.invoiceData?.lines)}
        </div>
      </div>
      {pdfData?.invoiceData?.discount !== 0 && (
        <div className="amount-container flat-discount">
          <div className="f-left">
            Discount({pdfData?.invoiceData?.discount + "%"})
          </div>
          <div className="f-right">
            -
            {currency_symbols[pdfData?.invoiceData?.currency] +
              (
                Math.ceil(
                  (pdfData?.invoiceData?.amount / 100) *
                    pdfData?.invoiceData?.discount *
                    10
                ) / 10
              ).toFixed(2)}
          </div>
        </div>
      )}
      {pdfData?.invoiceData?.payments?.length !== 0 && (
        <div style={{ marginTop: "12px" }}>Payments</div>
      )}
      {pdfData?.invoiceData?.payments?.length !== 0 &&
        pdfData?.invoiceData?.payments.map((item: any, i: number) => {
          return (
            <React.Fragment key={i}>
              <div className="amount-container">
                <div className="f-left">
                  <span style={{ fontSize: "12px", fontStyle: "italic" }}>
                    {
                      new Date(item?.payment_date)
                        ?.toLocaleString()
                        ?.split(",")[0]
                    }
                  </span>
                </div>
                <div className="f-right">
                  -
                  {currency_symbols[pdfData?.invoiceData?.currency] +
                    item?.amount}
                </div>
              </div>
              <div style={{ fontSize: "12px", width: "75%" }}>
                {item?.description}
              </div>
            </React.Fragment>
          );
        })}

      <div className=" amount-container amount-total">
        <div className="f-left">Amount Due</div>
        <div className="f-right">
          <h3>
            {currency_symbols[pdfData?.invoiceData?.currency] +
              (
                pdfData?.invoiceData?.amount - pdfData?.invoiceData?.balance
              ).toFixed(2)}
          </h3>
        </div>
      </div>
      <div>
        {getEarlyPayData()?.discount && (
          <div className="early-pay">
            <div className="stat-row-red">
              <div className="col-1">
                <div>EarlyPay Discount</div>
                <div>If paid: {getEarlyPayData()?.date}</div>
              </div>
              <div className="col-2">
                -
                {currency_symbols[pdfData?.invoiceData?.currency] +
                  getEarlyPayData()?.discount}
              </div>
            </div>

            <div className="stat-row-black">
              <div>EarlyPay Amount</div>
              <div>
                {currency_symbols[pdfData?.invoiceData?.currency] +
                  (
                    pdfData?.invoiceData?.amount -
                    getEarlyPayData()?.discount -
                    pdfData?.invoiceData?.balance
                  ).toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsRightCol;
