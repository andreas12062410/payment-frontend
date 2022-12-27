import { TextField, Button } from "@mui/material";
import { ChangeEvent } from "react";
import Spacer from "../spacer/Spacer";
import { inputSX } from "./utils";

export default function CouponField({
  onCodeChange,
  onApplyCode,
  isCouponApplied,
}: ICouponField) {
  return (
    <div className="coupon-container">
      <TextField
        sx={{ ...inputSX }}
        name="couponCode"
        type="text"
        fullWidth
        onChange={onCodeChange}
        placeholder="Enter coupon code (optional)"
      />
      <Spacer width={20} isWidth />
      <Button onClick={onApplyCode} variant="contained">
        {isCouponApplied ? "Remove" : "Apply"}
      </Button>
    </div>
  );
}

interface ICouponField {
  onCodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onApplyCode: () => void;
  isCouponApplied: boolean;
}
