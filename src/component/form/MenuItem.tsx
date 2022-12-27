import { TextField, MenuItem } from "@mui/material";
import React, { ChangeEvent } from "react";
import { mileStoneDataType } from "../../hooks/form";
import Spacer from "../spacer/Spacer";
import { inputSX } from "./utils";
import { Dropdown } from "..";

interface Props {
  isDisableSelect?: boolean;
  mileStoneId: any;
  handleSelectChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  mileStone: Array<mileStoneDataType>;
}

function CustomMenuItem({
  handleSelectChange,
  isDisableSelect,
  mileStoneId,
  mileStone,
}: Props) {
  return !isDisableSelect ? (
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
        {mileStone.map((item: mileStoneDataType, i: number) => (
          <MenuItem
            key={item.mileStoneId}
            value={item.mileStoneId}
            focusRipple
            style={{
              fontStyle: item.status !== "open" ? "italic" : "unset",
              width: "100%",
            }}
          >
            <Dropdown {...item} index={i} />
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  ) : null;
}

export default CustomMenuItem;
