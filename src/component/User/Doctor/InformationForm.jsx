import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

const InformationForm = (props) => {
  const { name, cccd, gender, phone, email } = props;

  return (
    <div className="px-10 py-16 flex flex-col gap-7 w-3/4 rounded-xl bg-slate-100 drop-shadow">
      <div className=" flex gap-8 justify-between">
        <TextField
          label="Họ và Tên"
          variant="outlined"
          defaultValue={name}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          onChange={(e) => props.setName(e.target.value)}
        />
        <TextField
          label="CCCD"
          variant="outlined"
          defaultValue={cccd}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          onChange={(e) => props.setCCCD(e.target.value)}
        />
      </div>
      {gender === "male" ? (
        <div className="">
          <input
            type="radio"
            name="gender"
            id="male"
            className="mr-2"
            checked
            onChange={(e) => props.setGender("male")}
          />
          Nam
          <input
            type="radio"
            name="gender"
            id="female"
            className="mr-2 ml-4"
            onChange={(e) => props.setGender("female")}
          // disabled
          />
          Nữ
        </div>
      ) : (
        <div className="">
          <input
            type="radio"
            name="gender"
            id="male"
            className="mr-2"
            onChange={(e) => props.setGender("male")}
          // disabled
          />
          Nam
          <input
            type="radio"
            name="gender"
            id="female"
            className="mr-2 ml-4"
            checked
            onChange={(e) => props.setGender("female")}
          // disabled
          />
          Nữ
        </div>
      )}
      <div className=" flex gap-8 justify-between">
        <TextField
          label="Số điện thoại"
          variant="outlined"
          defaultValue={phone}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          onChange={(e) => props.setPhone(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          defaultValue={email}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          onChange={(e) => props.setEmail(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InformationForm;
