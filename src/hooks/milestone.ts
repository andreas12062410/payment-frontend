import { sendPayload } from "../helper/api";

export interface MileStonePayload {
  milestoneTitle: string;
  milestoneUnitAmount: string;
  milestoneImages?: Array<string>;
}

export const useCheckoutHook = () => {
  const checkoutStripe = async (payload: MileStonePayload) => {
    try {
      const { data, status } = await sendPayload({
        endpoint: "/checkout",
        payload,
      });
      if (status === 200) {
        return data;
      } else return null;
    } catch (error: any) {
      console.log(
        `Something went wrong while trying to stripe checkout:->${error.message}`
      );
    }
  };
  return checkoutStripe;
};
