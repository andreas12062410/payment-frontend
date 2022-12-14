import { SelectedOption, toggleBtnProps } from "../component/form/utils";
import { showToaster } from "../helper/toast";
import { useGetBudgetHook } from "./budget";
import { mileStoneDataType } from "./form";
import { usePayNowHook } from "./paynow";

export const useGetBudgetFromIssues = () => {
  const getBudget = useGetBudgetHook();
  const payNowCallback = usePayNowHook();

  const getBudgetFromMilestones = async (
    milestones: mileStoneDataType[],
    menuId: string,
    apiKey: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption>>,
    setToggle: React.Dispatch<React.SetStateAction<toggleBtnProps>>
  ) => {
    if (milestones.length === 0) return; // no milestone
    if (apiKey.length === 0) return; // invalid API
    const { issues, tempObj } = getPaymentStatusFromMilestone(
      milestones,
      menuId,
      setSelectedOption
    );
    if (tempObj.isPaid) {
      setToggle((prev) => {
        return {
          ...prev,
          isDownloadFiles: true,
        };
      });
    } else {
      if (issues.length === 0) {
        console.log(issues);
        setToggle((pre) => ({
          ...pre,
          isBudgetFetch: false,
        }));
        return showToaster("Error during fetching budget", "error");
      }

      const budget = await getBudget({
        apiKey,
        issues,
      });
      if (budget) {
        setToggle((pre) => ({
          ...pre,
          isDisableBtn: false,
          isBudgetFetch: false,
        }));
        return `${budget}`;
      }
      setToggle((pre) => ({
        ...pre,
        isBudgetFetch: false,
      }));
      showToaster("Error during fetching budget", "error");
      setToggle((pre) => ({
        ...pre,
        isBudgetFetch: false,
      }));
    }
  };

  const payNow = async (
    milestones: mileStoneDataType[],
    milestoneId: number,
    setToggle: React.Dispatch<React.SetStateAction<toggleBtnProps>>,
    apiKey: string,
    projectIdentifier: string,
    amount: string
  ) => {
    if (amount.length === 0) {
      setToggle((pre) => ({
        ...pre,
        isBudgetFetch: false,
      }));
      return showToaster("Error during payment initiation", "error");
    }
    await payNowCallback(
      milestones,
      milestoneId,
      setToggle,
      amount,
      apiKey,
      projectIdentifier
    );
  };

  return { getBudgetFromMilestones, payNow };
};

interface IPaidDueResult {
  isPaid: boolean;
  filesLink?: string;
  demoLink?: string;
}

export const getPaymentStatusFromMilestone = (
  milestones: mileStoneDataType[],
  menuId: string,
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption>>
) => {
  let issues: number[] = [];
  let tempObj: IPaidDueResult = {
    isPaid: false,
    filesLink: "",
    demoLink: "",
  };
  milestones.forEach((item: mileStoneDataType) => {
    if (Number.isInteger(menuId)) {
      const selectedMenuId = parseInt(menuId);
      if (selectedMenuId === item.mileStoneId) {
        issues = item.issues;
        if (item?.paymentStatus === "Due") {
          setSelectedOption({
            isPaid: false,
            demoLink: item.demoLink,
          });
          tempObj["isPaid"] = false;
          tempObj["demoLink"] = item.demoLink;
          tempObj["filesLink"] = undefined;
        } else {
          setSelectedOption({
            isPaid: true,
            demoLink: item.demoLink,
            filesLink: item.filesLink,
          });
          tempObj["isPaid"] = true;
          tempObj["demoLink"] = item.demoLink;
          tempObj["filesLink"] = item.filesLink;
        }
      }
    }
  });
  return { issues, tempObj };
};
