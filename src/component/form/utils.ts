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

export interface ProjectData {
  description: string;
  projectIcon: string;
  projectName: string;
}

export interface Project {
  apiKey: string;
  projectIdentifier: string;
  mileStoneId: any;
}

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
};

export const initialFormState = {
  apiKey: "",
  projectIdentifier: "",
  mileStoneId: "",
};

export const isValidResponse = (data: any) => {
  return Object.keys(data[0]?.milestones).length > 0;
};

export const initialProjectState: ProjectData = {
  description: "",
  projectIcon: "",
  projectName: "",
};
