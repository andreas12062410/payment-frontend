import React, { useState } from "react";
import HyperLink from "../hyper-link/HyperLink";
import { Checkbox, checkboxClasses } from "@mui/material";
import Spacer from "../spacer/Spacer";

interface Props {
  handleCheck: (data: any) => Promise<void>;
  handleClose: () => void;
}
const Modal = ({ handleCheck, handleClose }: Props) => {
  const [isDisable, setIsDisable] = useState(true);
  return (
    <div onClick={handleClose} className="dialog-modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex-disp text-white dialog-child"
      >
        <div className="modal-heading">Terms and Conditions</div>
        <Spacer height={30} />
        <div className="flex-disp justify-center">
          <Checkbox
            sx={{
              [`&, &.${checkboxClasses.checked}`]: {
                color: "rgba(0, 169, 157, 0.8)",
              },
              color: "pink",
            }}
            onChange={(e: any) => setIsDisable(!e.target.checked)}
          />
          <div>
            I agree to the
            <HyperLink link="https://koders.in/terms-of-service" text="terms" />
            ,
            <HyperLink link="https://koders.in/cancellation" text="refund" />
            &nbsp;and
            <HyperLink
              link="https://koders.in/cancellation"
              text="cancellation"
            />
            &nbsp;policies.
          </div>
        </div>
        <div className="modal-btns">
          <button onClick={handleClose}>Cancel</button>
          <button
            style={
              isDisable
                ? { cursor: "not-allowed", opacity: "0.8" }
                : { cursor: "pointer" }
            }
            onClick={async () => {
              if (isDisable) return;
              setIsDisable(true);
              await handleCheck(true);
              handleClose();
            }}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
