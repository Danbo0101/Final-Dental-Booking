import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { formatCurrencyVND } from "../../../utils/general";

const InformationConfirm = (props) => {
  const { name, cccd, gender, phone, email, priceService } = props;
  return (
    <div className="px-10 py-16 flex flex-col gap-7 w-3/4 rounded-xl bg-zinc-100 drop-shadow">
      <div className="font-semibold">
        <input type="radio" name="appointment_type" checked className="mr-2" />
        Gía đặt khám dịch vụ : {formatCurrencyVND(priceService)}
      </div>
      <div className="flex gap-8 justify-between">
        <TextField
          label="Họ và Tên"
          variant="outlined"
          defaultValue={name}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          disabled
        />
        <TextField
          label="CCCD"
          variant="outlined"
          defaultValue={cccd}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          disabled
        />
      </div>
      {gender === true
        ? (
          <div className="">
            <input
              type="radio"
              name="gender"
              id="male"
              className="mr-2"
              checked
              disabled
            />
            Nam
            <input
              type="radio"
              name="gender"
              id="female"
              className="mr-2 ml-4"
              disabled
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
              disabled
            />
            Nam
            <input
              type="radio"
              name="gender"
              id="female"
              className="mr-2 ml-4"
              checked
              disabled
            />
            Nữ
          </div>
        )}
      <div className="flex gap-8 justify-between">
        <TextField
          label="Số điện thoại"
          variant="outlined"
          defaultValue={phone}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          disabled
        />
        <TextField
          label="Email"
          variant="outlined"
          defaultValue={email}
          sx={{
            width: "400px",
            borderRadius: "10px",
          }}
          disabled
        />
      </div>
      <div>
        <div className="">
          <input
            type="radio"
            name="payment_method"
            value="offline"
            checked
            className="mr-2"
          />
          <label>Thanh toán tại bệnh viện</label>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between py-2">
          <span>Giá khám</span>
          <span>{formatCurrencyVND(priceService)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Phí đặt lịch</span>
          <span>0 VNĐ</span>
        </div>
        <div className="flex justify-between py-2 font-bold">
          <span>Tổng cộng</span>
          <span>{formatCurrencyVND(priceService)}</span>
        </div>
      </div>
      <div className="mb-4 bg-blue-100 p-4 rounded-lg">
        <p className="text-gray-700 font-semibold">LƯU Ý</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Vui lòng kiểm tra lại thông tin trước khi ấn "Đặt lịch"</li>
        </ul>
      </div>
    </div>
  );
};

export default InformationConfirm;
