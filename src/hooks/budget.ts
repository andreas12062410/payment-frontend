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
        return data.data;
      } else return null;
    } catch (e: any) {
      console.log(
        `Something went wrong while fetching budget:->${e.message}`
      );
    }
  };
  return getBudget;
};
