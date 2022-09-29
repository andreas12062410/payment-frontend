import { Button } from "@mui/material";
import Loader from "../loader/Loader";
import Spacer from "../spacer/Spacer";
import { formatCurrency } from "./utils";

function FormButton({
  handlePayNow,
  isBudgetFetch,
  isDisableBtn,
  isDownloadFiles,
  amount,
  onProceedClick,
  handleDownloadFiles,
  handleDownloadVideo,
}: Props) {
  return isDownloadFiles ? (
    <div style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}>
      <Button
        fullWidth
        disabled={!isDownloadFiles}
        onClick={handleDownloadFiles}
        variant="contained"
      >
        Download Files
      </Button>
      <Spacer height={10} />
      <Button
        fullWidth
        disabled={!isDownloadFiles}
        onClick={handleDownloadVideo}
        variant="contained"
      >
        Download Video
      </Button>
    </div>
  ) : isBudgetFetch ? (
    <div style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}>
      <Button disabled={isDisableBtn} fullWidth variant="contained">
        <Loader isLoading={true} type="spinner" />
      </Button>
    </div>
  ) : amount.length > 0 ? (
    <div style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}>
      <Button
        fullWidth
        onClick={handlePayNow}
        disabled={isDisableBtn}
        variant="contained"
      >
        Pay {formatCurrency({ amount: Number(amount) })}
      </Button>
      <Spacer height={10} />
      <Button fullWidth onClick={handleDownloadVideo} variant="contained">
        Download Video
      </Button>
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
  handlePayNow: () => Promise<void>;
  amount: string;
  isClickable: boolean;
  isDownloadFiles: boolean;
  onProceedClick: () => void;
  handleDownloadFiles: () => void;
  handleDownloadVideo: () => void;
}