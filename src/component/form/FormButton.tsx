import { Button } from "@mui/material";
import { ChangeEvent } from "react";
import Loader from "../loader/Loader";
import Spacer from "../spacer/Spacer";
import CouponField from "./CouponField";
import { formatCurrency, SelectedOption } from "./utils";

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
      <Button
        fullWidth
        onClick={handlePayNow}
        disabled={isDisableBtn}
        variant="contained"
      >
        Pay {formatCurrency({ amount: Number(amount) })}
      </Button>
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
}
