import axios from "axios";
import { ProjectData } from "../../hooks/form";

interface CurrencyProps {
  amount: number;
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
}

export const inputSX = {
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "#00a99d",
    },
  },
};

export const formatCurrency = ({
  amount,
  locale = "en-US",
  currency = "INR",
  minimumFractionDigits = 2,
}: CurrencyProps) => {
  if (isNaN(amount)) return amount;
  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
  });
};

export const iconProps = {
  color: "rgba(255,255,255,0.81)",
  size: 20,
};

export interface toggleBtnProps {
  isSecretVisible?: boolean;
  isDisableSelect?: boolean;
  isDisableBtn?: boolean;
  isMilestoneFetch: boolean;
  isBudgetFetch: boolean;
  isDisabledProject: boolean;
  isDisabledSecret: boolean;
  isValidRelease: boolean;
  isDownloadFiles: boolean;
  isCouponApplied: boolean;
  isShowFormButton: boolean;
}

export const initialToggleState: toggleBtnProps = {
  isSecretVisible: true,
  isDisableSelect: true,
  isDisableBtn: true,
  isBudgetFetch: false,
  isMilestoneFetch: false,
  isDisabledProject: false,
  isDisabledSecret: false,
  isValidRelease: false,
  isDownloadFiles: false,
  isCouponApplied: false,
  isShowFormButton: false,
};

export const initialFormState = {
  apiKey: "",
  projectIdentifier: "",
  mileStoneId: "",
};

export const isValidResponse = (data: any) => {
  if (data === null) return false;
  return Object.keys(data[0]?.milestones).length > 0;
};

export const initialProjectState: ProjectData = {
  description: "",
  projectIcon: "",
  projectName: "",
};

export interface SelectedOption {
  isPaid: boolean;
  demoLink?: string;
  filesLink?: string;
}

export interface ICouponDetails {
  originalBudget: string;
  budgetAfterAppliedCoupon: string;
}

export const currencyConverter = async () =>
  // amount: number,
  // from: "INR" | "USD" | "CAD" | "EUR" | "GBP" | "SBD",
  // convertTo: "INR" | "USD" | "CAD" | "EUR" | "GBP" | "SBD"
  {
    try {
      const {
        data: { rates },
      }: any = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/INR`
      );

      if (rates) {
        return {
          error: false,
          message: "Invalid currency type.",
          data: rates,
        };
      } else {
        return {
          error: true,
          message: "Invalid currency type.",
          data: null,
        };
      }
    } catch (error: any) {
      return {
        error: true,
        message: error?.message,
        data: null,
      };
    }
  };

export interface currencyConverterType {
  error: boolean;
  message: any;
  data: any;
}

export interface budgetInAllCurrency {
  INR: string;
  USD: string;
  CAD: string;
  EUR: string;
  GBP: string;
  SBD: string;
}
