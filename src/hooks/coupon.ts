import { mileStoneDataType } from "./form";
import { useCouponCodeHook } from "./coupon_code";
import { SelectedOption } from "../component/form/utils";
import { getPaymentStatusFromMilestone } from "./issues_budget";

export const useApplyCouponHook = () => {
  const applyCoupon = useCouponCodeHook();
  const applyCode = async (
    milestones: mileStoneDataType[],
    menuItemId: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption>>,
    apiKey: string,
    couponCode: string
  ) => {
    if (milestones.length === 0) return; // no milestone
    if (apiKey.length === 0) return;
    const { issues } = getPaymentStatusFromMilestone(
      milestones,
      menuItemId,
      setSelectedOption
    );
    const response = await applyCoupon({ apiKey, coupon: couponCode, issues });
    if (response === null && response === undefined) return null;
    return response?.toString();
  };
  return applyCode;
};
