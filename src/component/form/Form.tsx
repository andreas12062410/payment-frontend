import { Grid } from "@mui/material";
import Spacer from "../spacer/Spacer";
import Loader from "../loader/Loader";
import { showToaster } from "../../helper/toast";
import { ChangeEvent, useState } from "react";
import ProjectDataComp from "../project-data/ProjectData";
import { mileStoneDataType, Project, ProjectData } from "../../hooks/form";
import {
  initialFormState,
  initialProjectState,
  initialToggleState,
  SelectedOption,
  toggleBtnProps,
} from "./utils";
import CustomMenuItem from "./MenuItem";
import FormButton from "./FormButton";
import ProjectTitle from "./Title";
import FormInitialField from "./FormInitialField";
import { useDelayedQueryHook } from "../../hooks/delayed_query";
import { useGetBudgetFromIssues } from "../../hooks/issues_budget";
import { useApplyCouponHook } from "../../hooks/coupon";

function Form() {
  const [projectDetails, setProjectDetails] =
    useState<ProjectData>(initialProjectState);
  const applyCouponCode = useApplyCouponHook();
  const { debounceCallback } = useDelayedQueryHook();
  const [menuItemId, setMenuItemId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [mileStone, setMileStone] = useState<Array<mileStoneDataType>>([]);
  const { getBudgetFromMilestones, payNow } = useGetBudgetFromIssues();
  const [
    {
      isSecretVisible,
      isDisableSelect,
      isDisableBtn,
      isBudgetFetch,
      isMilestoneFetch,
      isDisabledProject,
      isDisabledSecret,
      isValidRelease,
      isDownloadFiles,
      isCouponApplied,
    },
    setToggle,
  ] = useState<toggleBtnProps>(initialToggleState);
  const [isClickable, setIsClickable] = useState(false);
  const [{ apiKey, projectIdentifier, mileStoneId, couponCode }, setForm] =
    useState<Project>(initialFormState);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    isPaid: false,
    filesLink: "",
    demoLink: "",
  });

  /**
   * input field handlre for API key, project Id
   */
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
    if (name === "apiKey") {
      await debounceCallback(
        value,
        projectIdentifier,
        setToggle,
        setProjectDetails,
        setMileStone,
        setIsClickable
      );
    } else {
      if (apiKey?.length) {
        await debounceCallback(
          apiKey,
          projectIdentifier,
          setToggle,
          setProjectDetails,
          setMileStone,
          setIsClickable
        );
      }
    }
  };

  /**
   * toggle API key input field visibility
   */
  const handleSecretIcon = () => {
    setToggle((pre) => ({ ...pre, isSecretVisible: !pre.isSecretVisible }));
  };

  /**
   * handler to select milestone from milestoned array
   */
  const handleSelectChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setToggle((prev) => {
      return {
        ...prev,
        isDownloadFiles: false,
      };
    });
    setSelectedOption({ isPaid: false, filesLink: "", demoLink: "" });
    const { value } = e.target;
    setMenuItemId(value);
    setForm((pre) => ({ ...pre, mileStoneId: parseInt(value) }));
    setToggle((pre) => ({
      ...pre,
      isBudgetFetch: true,
    }));
    // fetching budget and save locally for future use
    const budget = await getBudgetFromMilestones(
      mileStone,
      value,
      apiKey,
      setSelectedOption,
      setToggle
    );

    if (typeof budget === "string") {
      setAmount(budget);
    }
  };

  /**
   * button handler to pay now functionality
   * without any coupon code
   */
  const handlePayNowHandler = async () => {
    await payNow(
      mileStone,
      mileStoneId,
      setToggle,
      apiKey,
      projectIdentifier,
      amount
    );
  };

  const handleProccessClick = async () => {
    setIsClickable(true);

    await debounceCallback(
      apiKey,
      projectIdentifier,
      setToggle,
      setProjectDetails,
      setMileStone,
      setIsClickable
    );
  };

  type ValueType = "files" | "videos";

  /**
   *  file download functionality
   * or demo video download
   */
  const handleDownloadBtn = (value: ValueType) => {
    if (selectedOption.filesLink === null || selectedOption.demoLink === null) {
      showToaster("Something is worng", "error");
      return;
    }
    if (value === "files") {
      window.open(`${selectedOption.filesLink}?key=${apiKey}`);
    } else {
      window.open(`${selectedOption.demoLink}?key=${apiKey}`);
    }
  };

  // coupon onChange handler
  const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((pre) => ({ ...pre, couponCode: e.target.value }));
  };

  // apply code btn handler
  const handleApplyCoupon = async () => {
    if (couponCode !== undefined && couponCode.length > 0) {
      setToggle((pre) => {
        return { ...pre, isDisableBtn: true };
      });
      let amount: string | undefined | void | null = "";
      if (isCouponApplied) {
        amount = await getBudgetFromMilestones(
          mileStone,
          menuItemId,
          apiKey,
          setSelectedOption,
          setToggle
        );
      } else {
        amount = await applyCouponCode(
          mileStone,
          menuItemId,
          setSelectedOption,
          apiKey,
          couponCode,
          projectIdentifier
        );
      }
      if (amount) {
        setToggle((pre) => {
          return { ...pre, isCouponApplied: true };
        });
        setAmount(amount);
      }
      setToggle((pre) => {
        return { ...pre, isDisableBtn: false };
      });
    } else showToaster("Enter valid coupon code", "error");
  };

  return (
    <Grid justifyContent="center" container>
      <Grid sm={6} xs={12} lg={5} item>
        {!isValidRelease ? (
          <>
            <ProjectTitle />
            <Spacer isWidth={true} height={20} width="100%" />
            <FormInitialField
              apiKey={apiKey}
              handleInputChange={handleInputChange}
              handleSecretIcon={handleSecretIcon}
              isDisabledProject={isDisabledProject}
              isDisabledSecret={isDisabledSecret}
              isSecretVisible={isSecretVisible}
              projectIdentifier={projectIdentifier}
            />
          </>
        ) : (
          <ProjectDataComp {...projectDetails} />
        )}
        <CustomMenuItem
          handleSelectChange={handleSelectChange}
          isDisableSelect={isDisableSelect}
          mileStone={mileStone}
          mileStoneId={mileStoneId}
        />
        <Loader isLoading={isMilestoneFetch} type="loader" />
        <Spacer isWidth={true} height={15} width="100%" />
        <FormButton
          selectedOption={selectedOption}
          amount={amount}
          isCouponApplied={isCouponApplied}
          onCodeApply={handleApplyCoupon}
          handlePayNow={handlePayNowHandler}
          onCodeChange={handleCouponChange}
          isBudgetFetch={isBudgetFetch}
          isClickable={isClickable}
          isDisableBtn={isDisableBtn}
          isDownloadFiles={isDownloadFiles}
          onProceedClick={handleProccessClick}
          handleDownloadFiles={() => handleDownloadBtn("files")}
          handleDownloadVideo={() => handleDownloadBtn("videos")}
        />
      </Grid>
    </Grid>
  );
}

export default Form;
