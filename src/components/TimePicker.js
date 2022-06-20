import React from "react";
import { TextField } from "@mui/material";

const TimePicker = () => {
  return (
    <div
      style={{
        margin: "auto",
        display: "block",
        width: "fit-content",
      }}
    >
      <TextField
        defaultValue="12:00"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300,
        }}
      />
    </div>
  );
};

export default TimePicker;
