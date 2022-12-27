import { sendPayload } from "../helper/api";

export interface FormPayload {
  apiKey: string;
  projectIdentifier: string;
}

export interface ProjectData {
  description: string;
  projectIcon: string;
  projectName: string;
}

export interface Project {
  apiKey: string;
  projectIdentifier: string;
  mileStoneId: any;
  couponCode?: string;
}

export interface mileStoneDataType {
  title: string;
  status: string;
  mileStoneId: number;
  paymentStatus: string;
  description: string;
  doneRatio: number;
  dueDate: string;
  estimatedHours: number;
  issues: Array<number>;
  spentHours: number;
  demoLink?: string;
  filesLink?: string;
  projectData: ProjectData;
  milestones: any;
}

const makeMileStoneData = (obj: any) => {
  const arr = Array<mileStoneDataType>();
  const items = Object.keys(obj);
  if (items.length === 0) return null;
  items.forEach((title) => {
    arr.push({ title, ...obj[title] });
  });
  return arr.reverse();
};

export const useFormSubmitHook = () => {
  const submitForm = async (
    payload: FormPayload
  ): Promise<mileStoneDataType[] | null> => {
    try {
      const { data, status } = await sendPayload({
        endpoint: "/get-project",
        payload,
      });
      if (status === 200) {
        const { data: response } = data;
        return makeMileStoneData(response);
      }
      return null;
    } catch (e: any) {
      console.log(
        `Something went wrong while submitting form. Reason-${e.message}`
      );
      return null;
    }
  };
  return submitForm;
};
