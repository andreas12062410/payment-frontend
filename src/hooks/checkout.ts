import { sendPayload } from "../helper/api";

export interface MileStonePayload {
  apiKey: string;
  milestoneTitle: string;
  projectIdentifier: string;
  milestoneUnitAmount: string;
  type: "INR" | "USD" | "CAD" | "EUR" | "GBP" | "SBD";
  milestoneImages?: Array<string>;
  couponCode?: string;
}

export const useCheckoutHook = () => {
  const checkoutStripe = async (payload: MileStonePayload) => {
    try {
      const { data, status } = await sendPayload({
        endpoint: "/checkout",
        payload,
      });
      if (status === 200) {
        return data.data;
      } else return null;
    } catch (error: any) {
      console.log(
        `Something went wrong while trying to stripe checkout.Reason-${error.message}`
      );
    }
  };
  return checkoutStripe;
};
