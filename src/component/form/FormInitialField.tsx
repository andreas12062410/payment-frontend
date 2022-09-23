import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Spacer from "../spacer/Spacer";
import { iconProps, inputSX } from "./utils";

function FormInitialField({
  handleInputChange,
  isDisabledProject,
  projectIdentifier,
  isSecretVisible,
  apiKey,
  isDisabledSecret,
  handleSecretIcon,
}: Props) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default FormInitialField;

interface Props {
  projectIdentifier: string;
  isDisabledProject: boolean;
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isSecretVisible?: boolean;
  apiKey: string;
  isDisabledSecret: boolean;
  handleSecretIcon: () => void;
}
