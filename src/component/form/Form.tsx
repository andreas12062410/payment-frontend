import { Grid } from "@mui/material";
import { debounce } from "lodash";
import Spacer from "../spacer/Spacer";
import Loader from "../loader/Loader";
import { showToaster } from "../../helper/toast";
import React, { ChangeEvent, useState } from "react";
import { useGetBudgetHook } from "../../hooks/budget";
import { useCheckoutHook } from "../../hooks/checkout";
import ProjectDataComp from "../project-data/ProjectData";
import { mileStoneDataType, useFormSubmitHook } from "../../hooks/form";
import {
  initialFormState,
  initialProjectState,
  initialToggleState,
  isValidResponse,
  Project,
  ProjectData,
  SelectedOption,
  toggleBtnProps,
} from "./utils";
import CustomMenuItem from "./MenuItem";
import FormButton from "./FormButton";
import ProjectTitle from "./Title";
import FormInitialField from "./FormInitialField";

function Form() {
  const checkout = useCheckoutHook();
  const getBudget = useGetBudgetHook();
  const formSubmit = useFormSubmitHook();
  const [amount, setAmount] = useState<string>("");
  const [projectDetails, setProjectDetails] =
    useState<ProjectData>(initialProjectState);
  const [mileStone, setMileStone] = useState<Array<mileStoneDataType>>([]);
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
    },
    setToggle,
  ] = useState<toggleBtnProps>(initialToggleState);
  const [{ apiKey, projectIdentifier, mileStoneId }, setForm] =
    useState<Project>(initialFormState);
  const [isClickable, setIsClickable] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    isPaid: false,
    filesLink: "",
    demoLink: "",
  });

  const delayedQuery = React.useRef(
    debounce(async (value: any, projectIdentifier: string) => {
      if (!projectIdentifier) return;
      if (projectIdentifier.length > 0) {
        setToggle((pre) => ({
          ...pre,
          isMilestoneFetch: true,
        }));
        const data: any = await formSubmit({
          apiKey: value,
          projectIdentifier,
        });
        if (isValidResponse(data)) {
          setToggle((pre) => ({
            ...pre,
            isDisableSelect: !pre.isDisableSelect,
            isDisabledProject: true,
            isDisabledSecret: true,
            isValidRelease: true,
          }));

          setProjectDetails({ ...data[0].projectData });
          const key: Array<string> = Object.keys(data[0].milestones);
          const value: Array<mileStoneDataType> = Object.values(
            data[0].milestones
          );
          let tempArr: Array<mileStoneDataType> = [];
          value.forEach((item: mileStoneDataType, i) => {
            tempArr = [...tempArr, { ...item, mileStoneId: parseInt(key[i]) }];
          });

          const closeMilestone: any = [];
          const openMilestone: any = [];
          tempArr.forEach((item) => {
            if (item.status !== "closed") openMilestone.push(item);
            else closeMilestone.push(item);
          });
          setMileStone([...openMilestone, ...closeMilestone]);
        } else showToaster("Something went wrong", "error");
        setToggle((pre) => ({
          ...pre,
          isMilestoneFetch: false,
        }));
      } else showToaster("Please enter project ID", "error");
      setIsClickable(false);
    }, 600)
  ).current;

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
    if (name === "apiKey") {
      await delayedQuery(value, projectIdentifier);
    } else {
      if (apiKey?.length) {
        await delayedQuery(apiKey, value);
      }
    }
  };

  const handleSecretIcon = () => {
    setToggle((pre) => ({ ...pre, isSecretVisible: !pre.isSecretVisible }));
  };

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
    setForm((pre) => ({ ...pre, mileStoneId: parseInt(value) }));
    setToggle((pre) => ({
      ...pre,
      isBudgetFetch: true,
    }));

    let issues: Array<number> = [];
    let tempObj = { isPaid: false, filesLink: "", demoLink: "" };
    mileStone.forEach((item: any) => {
      if (value === item.mileStoneId) {
        issues = item.issues;
        if (item?.paymentStatus === "Due") {
          setSelectedOption({
            isPaid: true,
            demoLink: item.demoLink,
          });
          tempObj = {
            isPaid: true,
            demoLink: item.demoLink,
            filesLink: "",
          };
        } else {
          setSelectedOption({
            isPaid: true,
            demoLink: item.demoLink,
            filesLink: item.filesLink,
          });
          tempObj = {
            isPaid: true,
            demoLink: item.demoLink,
            filesLink: item.filesLink,
          };
        }
      }
    });
    if (tempObj.isPaid) {
      setToggle((prev) => {
        return {
          ...prev,
          isDownloadFiles: true,
        };
      });
    } else {
      const budget = await getBudget({
        apiKey,
        issues,
      });
      if (budget) {
        setAmount(`${budget}`);
        setToggle((pre) => ({
          ...pre,
          isDisableBtn: false,
        }));
      } else showToaster("Error in fetching budget", "error");
      setToggle((pre) => ({
        ...pre,
        isBudgetFetch: false,
      }));
    }
  };

  const handlePayNow = async () => {
    const data = mileStone.filter(({ mileStoneId: id }) => id === mileStoneId);
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
      projectIdentifier,
    });
    setToggle((pre) => ({
      ...pre,
      isDisableBtn: false,
    }));
    if (uri) {
      window.open(uri, "_blank");
    }
  };

  const handleProccessClick = () => {
    setIsClickable(true);
    delayedQuery(apiKey, projectIdentifier);
  };

  type ValueType = "files" | "videos";
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
          handlePayNow={handlePayNow}
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
