import { ICouponDetails } from "../component/form/utils";
import { sendPayload } from "../helper/api";
import { showToaster } from "../helper/toast";

interface ICouponCode {
  apiKey: string;
  issues: any;
  coupon: string;
  pid: string;
}

export const useCouponCodeHook = () => {
  const code = async (
    payload: ICouponCode
  ): Promise<ICouponDetails | undefined | null> => {
    try {
      const { data, status } = await sendPayload({
        endpoint: "/coupon",
        payload,
        readError: true,
      });
      if (status === 200) {
        showToaster(data.msg, "info");
        return data.data;
      }
      return null;
    } catch (e: any) {
      if (e.response.status === 400) {
        showToaster(e.response.data.msg, "error");
      }
      console.log(
        `Something went wrong while  applying coupon. Reason-${e.message}`
      );
    }
  };
  return code;
};
