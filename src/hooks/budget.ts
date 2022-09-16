import { sendPayload } from "../helper/api";

export interface BugetsProps {
  apiKey: string;
  milestoneIdentifier: string;
  projectIdentifier: string;
}
export const useGetBudgetHook = () => {
  const getBudget = async (payload: BugetsProps) => {
    try {
      const { data, status } = await sendPayload({
        endpoint: "/get-budget",
        payload,
      });
      if (status === 200) {
        console.log(data);
        return data;
      } else return null;
    } catch (error: any) {
      console.log(
        `Something went wrong while fetching budget:->${error.message}`
      );
    }
  };
  return getBudget;
};
