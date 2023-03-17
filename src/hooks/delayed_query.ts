import { debounce } from "lodash";
import React from "react";
import { isValidResponse, toggleBtnProps } from "../component/form/utils";
import { showToaster } from "../helper/toast";
import { mileStoneDataType, ProjectData, useFormSubmitHook } from "./form";

export const useDelayedQueryHook = () => {
  const formSubmit = useFormSubmitHook();

  const debounceCallback = React.useRef(
    debounce(
      async (
        apiKey: string,
        projectIdentifier: string,
        setToggle: React.Dispatch<React.SetStateAction<toggleBtnProps>>,
        setProjectDetails: React.Dispatch<React.SetStateAction<ProjectData>>,
        setMileStone: React.Dispatch<React.SetStateAction<mileStoneDataType[]>>,
        setIsClickable: React.Dispatch<React.SetStateAction<boolean>>,
        setShowInvoice: React.Dispatch<React.SetStateAction<any>>
      ) => {
        if (apiKey.length <= 10)
          return showToaster("Enter valid API key", "error");
        if (!projectIdentifier && projectIdentifier.length === 0)
          return showToaster("Please enter project ID", "error");
        const handleFetchState = (value: boolean) => {
          setToggle((pre) => ({
            ...pre,
            isMilestoneFetch: value,
          }));
        };

        handleFetchState(true);
        const data = await formSubmit({
          apiKey,
          projectIdentifier,
        });
        if (data === null || data.length === 0) {
          handleFetchState(false);
          showToaster("Network Error", "error");
          return;
        }

        if (isValidResponse(data)) {
          setShowInvoice({
            projectIdentifier: projectIdentifier,
            isLoggedIn: true,
          });
          setToggle((pre) => ({
            ...pre,
            isDisableSelect: !pre.isDisableSelect,
            isDisabledProject: true,
            isDisabledSecret: true,
            isValidRelease: true,
          }));
          setProjectDetails({ ...data[0].projectData });
          const value: Array<mileStoneDataType> = Object.values(
            data[0].milestones
          );
          let tempArr: Array<mileStoneDataType> = [];
          value.forEach((item: mileStoneDataType, i) => {
            tempArr.push({ ...item, mileStoneId: i });
          });
          setMileStone([...tempArr]);
        } else {
          console.warn("📍No milestones found in the response📍");
        }
        handleFetchState(false);
        setIsClickable(false);
      },
      600
    )
  ).current;
  return { debounceCallback };
};
