import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import Loader from "../loader/Loader";
import Spacer from "../spacer/Spacer";
import CouponField from "./CouponField";
import {
  budgetInAllCurrency,
  formatCurrency,
  ICouponDetails,
  SelectedOption,
} from "./utils";

function FormButton({
  selectedOption,
  handlePayNow,
  isBudgetFetch,
  isDisableBtn,
  isDownloadFiles,
  amount,
  onProceedClick,
  handleDownloadFiles,
  handleDownloadVideo,
  onCodeChange,
  onCodeApply,
  isCouponApplied,
  couponDetails,
  handleSelectCurrencyType,
  currencyType,
  budgetInAllCurrencyType,
  couponBudgetInAllCurrencyType,
}: Props) {
  return isDownloadFiles ? (
    <div
      className="download-btn-wrapper"
      style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}
    >
      {selectedOption.filesLink && (
        <Button
          fullWidth
          disabled={!isDownloadFiles}
          onClick={handleDownloadFiles}
          variant="contained"
        >
          Download Files
        </Button>
      )}
      {selectedOption.demoLink && (
        <>
          <Spacer height={10} />
          <Button fullWidth onClick={handleDownloadVideo} variant="contained">
            Download Demo
          </Button>
        </>
      )}
    </div>
  ) : isBudgetFetch ? (
    <div style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}>
      <Button disabled={isDisableBtn} fullWidth variant="contained">
        <Loader isLoading={true} type="spinner" />
      </Button>
    </div>
  ) : amount.length > 0 ? (
    <div style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}>
      <CouponField
        isCouponApplied={isCouponApplied}
        onApplyCode={onCodeApply}
        onCodeChange={onCodeChange}
      />
      <Spacer height={10} />
      <div className="currency-box">
        {isCouponApplied ? (
          <Button
            fullWidth
            onClick={handlePayNow}
            disabled={isDisableBtn}
            variant="contained"
          >
            <Typography marginRight="10px">
              Pay{" "}
              {formatCurrency({
                currency: currencyType,
                amount: Number(couponBudgetInAllCurrencyType[currencyType]),
              })}
            </Typography>
            <Typography
              style={{
                textDecoration: "line-through",
                color: "red",
              }}
            >
              (
              {formatCurrency({
                currency: currencyType,
                amount: Number(budgetInAllCurrencyType[currencyType]),
              })}
              )
            </Typography>
          </Button>
        ) : (
          <Button
            fullWidth
            onClick={handlePayNow}
            disabled={isDisableBtn}
            variant="contained"
          >
            {isCouponApplied}
            Pay{" "}
            {formatCurrency({
              currency: currencyType,
              amount: Number(budgetInAllCurrencyType[currencyType]),
            })}
          </Button>
        )}
        <Select
          disabled={isDisableBtn}
          sx={{
            outline: "none",
          }}
          onChange={handleSelectCurrencyType}
          value={currencyType}
          placeholder="Pay In"
        >
          {["INR", "USD", "CAD", "EUR", "GBP", "SBD"].map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      {selectedOption.demoLink && (
        <>
          <Spacer height={10} />
          <Button fullWidth onClick={handleDownloadVideo} variant="contained">
            Download Demo
          </Button>
        </>
      )}
    </div>
  ) : (
    <div style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}>
      <Button
        fullWidth
        disabled={isDisableBtn}
        onClick={onProceedClick}
        variant="contained"
      >
        Proceed
      </Button>
    </div>
  );
}

export default FormButton;

interface Props {
  isBudgetFetch: boolean;
  isDisableBtn?: boolean;
  isCouponApplied: boolean;
  handlePayNow: () => Promise<void>;
  amount: string;
  isClickable: boolean;
  isDownloadFiles: boolean;
  onProceedClick: () => void;
  handleDownloadFiles: () => void;
  handleDownloadVideo: () => void;
  onCodeApply: () => void;
  selectedOption: SelectedOption;
  onCodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  couponDetails: ICouponDetails;
  handleSelectCurrencyType: (data: SelectChangeEvent) => void;
  currencyType: "INR" | "USD" | "CAD" | "EUR" | "GBP" | "SBD";
  budgetInAllCurrencyType: budgetInAllCurrency;
  couponBudgetInAllCurrencyType: budgetInAllCurrency;
}
