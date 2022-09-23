import { Button } from "@mui/material";
import Loader from "../loader/Loader";
import { formatCurrency } from "./utils";

function FormButton({
  handlePayNow,
  isBudgetFetch,
  isDisableBtn,
  amount,
  isClickable,
  onProceedClick,
}: Props) {
  return isBudgetFetch ? (
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
    </div>
  ) : (
    <div style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}>
      <Button
        fullWidth
        disabled={isDisableBtn}
        // style={isClickable ? { filter: "brightness(0.3)" } : {}}
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
  onProceedClick: () => void;
}
