import {
  Grid,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Spacer from "../spacer/Spacer";
import Loader from "../loader/Loader";
import React, { ChangeEvent, useState } from "react";
import { useGetBudgetHook } from "../../hooks/budget";
import { useCheckoutHook } from "../../hooks/checkout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { mileStoneDataType, useFormSubmitHook } from "../../hooks/form";

const inputSX = {
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "#00a99d",
    },
  },
};

const formatCurrency = (amount: number, locale = 'en-US', currency = 'INR', minimumFractionDigits = 2) => {
  if (isNaN(amount)) {
    return amount;
  }
  return amount.toLocaleString(locale, {style: 'currency', currency, minimumFractionDigits});
};

interface Project {
  apiKey: string;
  projectIdentifier: string;
  mileStoneId: any;
}

const iconProps = {
  color: "rgba(255,255,255,0.81)",
  size: 20,
};

interface toggleBtnProps {
  isSecretVisible?: boolean;
  isDisableSelect?: boolean;
  isDisableBtn?: boolean;
  isMilestoneFetch: boolean;
  isBudgetFetch: boolean;
  isDisabledProject: boolean;
  isDisabledSecret: boolean;
}

function Form() {
  const formSubmit = useFormSubmitHook();
  const getBudget = useGetBudgetHook();
  const checkout = useCheckoutHook();
  const [amount, setAmount] = useState<string>("");
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
    },
    setToggle,
  ] = useState<toggleBtnProps>({
    isSecretVisible: true,
    isDisableSelect: true,
    isDisableBtn: true,
    isBudgetFetch: false,
    isMilestoneFetch: false,
    isDisabledProject: false,
    isDisabledSecret: false,
  });
  const [{ apiKey, projectIdentifier, mileStoneId }, setForm] =
    useState<Project>({
      apiKey: "",
      projectIdentifier: "",
      mileStoneId: "",
    });

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
    if (name === "apiKey") {
      if (projectIdentifier.length > 0) {
        setToggle((pre) => ({
          ...pre,
          isMilestoneFetch: true,
        }));
        const data = await formSubmit({ apiKey: value, projectIdentifier });
        if (data !== undefined && data !== null) {
          setToggle((pre) => ({
            ...pre,
            isDisableSelect: !pre.isDisableSelect,
            isDisabledProject: true,
            isDisabledSecret: true,
          }));
          setMileStone(data);
        }
        setToggle((pre) => ({
          ...pre,
          isMilestoneFetch: false,
        }));
      }
    }
  };

  const handleSecretIcon = () => {
    setToggle((pre) => ({ ...pre, isSecretVisible: !pre.isSecretVisible }));
  };

  const handleSelectChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((pre) => ({ ...pre, mileStoneId: parseInt(value) }));
    setToggle((pre) => ({
      ...pre,
      isBudgetFetch: true,
    }));
    const budget = await getBudget({
      apiKey,
      projectIdentifier,
      milestoneIdentifier: value,
    });

    if (budget) {
      setAmount(`${budget}`);
      setToggle((pre) => ({
        ...pre,
        isDisableBtn: false,
      }));
    }
    setToggle((pre) => ({
      ...pre,
      isBudgetFetch: false,
    }));
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

  return (
    <Grid justifyContent="center" container>
      <Grid sm={6} xs={12} lg={4} item>
        <Typography
          fontSize="24px"
          color="rgba(255,255,255,0.81)"
          variant="h2"
          textAlign="center"
        >
          Enter your project details
        </Typography>
        <Spacer isWidth={true} height={20} width="100%" />
        <TextField
          fullWidth
          label="Project ID"
          name="projectIdentifier"
          value={projectIdentifier}
          onChange={handleInputChange}
          sx={{ ...inputSX }}
          disabled={isDisabledProject}
        />
        <Spacer isWidth={true} height={15} width="100%" />
        <TextField
          fullWidth
          label="Project Secret"
          type={isSecretVisible ? "password" : "text"}
          name="apiKey"
          value={apiKey}
          disabled={isDisabledSecret}
          onChange={handleInputChange}
          sx={{ ...inputSX }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSecretIcon}>
                  {isSecretVisible ? (
                    <AiFillEye {...iconProps} />
                  ) : (
                    <AiFillEyeInvisible {...iconProps} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!isDisableSelect && (
          <React.Fragment>
            <Spacer isWidth={true} height={15} width="100%" />
            <TextField
              select
              fullWidth
              label="Releases"
              value={mileStoneId}
              sx={{ ...inputSX }}
              onChange={handleSelectChange}
            >
              {mileStone.map(({ mileStoneId, status, title }) => (
                <MenuItem
                  disabled={status !== "open"}
                  key={mileStoneId}
                  value={mileStoneId}
                  style={{ fontStyle: status !== "open" ? "italic" : "unset" }}
                >
                  {title}
                  {"\t"}
                  {status !== "open" ? "(Completed)" : ""}
                </MenuItem>
              ))}
            </TextField>
          </React.Fragment>
        )}
        <Loader isLoading={isMilestoneFetch} type="loader" />
        <Spacer isWidth={true} height={15} width="100%" />
        {isBudgetFetch ? (
          <Button disabled={isDisableBtn} fullWidth variant="contained">
            <Loader isLoading={true} type="spinner" />
          </Button>
        ) : (
          <div
            style={{ cursor: `${isDisableBtn ? "not-allowed" : "default"}` }}
          >
            <Button
              onClick={handlePayNow}
              disabled={isDisableBtn}
              fullWidth
              variant="contained"
            >
              {amount.length > 0 ? `Pay ${formatCurrency(Number(amount))}` : `Pay now`}
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default Form;
