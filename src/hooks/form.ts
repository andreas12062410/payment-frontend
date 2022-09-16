import { sendPayload } from "../helper/api";

export interface FormPayload {
  apiKey: string;
  projectIdentifier: string;
}

export const useFormSubmitHook = () => {
  const submitForm = async (payload: FormPayload) => {
    try {
      const { data, status } = await sendPayload({
        endpoint: "/milestones",
        payload,
      });
      if (status === 200) {
        console.log(data);
        return data;
      } else return null;
    } catch (error: any) {
      console.log(
        `Something went wrong while submitting form :->${error.message}`
      );
    }
  };
  return submitForm;
};
