import { toggleBtnProps } from "../component/form/utils";
import { useCheckoutHook } from "./checkout";
import { mileStoneDataType } from "./form";

export const usePayNowHook = () => {
  const checkout = useCheckoutHook();
  const payNow = async (
    milestone: mileStoneDataType[],
    milestoneId: number,
    setToggle: React.Dispatch<React.SetStateAction<toggleBtnProps>>,
    amount: string,
    apiKey: string,
    projectIdentifier: string,
    type: "INR" | "USD" | "CAD" | "EUR" | "GBP" | "SBD",
    couponCode?: string
  ) => {
    const data = milestone.filter(({ mileStoneId: id }) => id === milestoneId);
    if (data.length === 0) return;
    setToggle((pre) => ({
      ...pre,
      isDisableBtn: true,
    }));
    const [{ title }] = data;
    const uri = await checkout({
      milestoneUnitAmount: amount,
      milestoneImages: [],
      milestoneTitle: title,
      apiKey,
      type,
      projectIdentifier,
      couponCode: couponCode,
    });
    setToggle((pre) => ({
      ...pre,
      isDisableBtn: false,
    }));
    if (uri) {
      window.open(uri, "_blank");
    }
  };
  return payNow;
};
