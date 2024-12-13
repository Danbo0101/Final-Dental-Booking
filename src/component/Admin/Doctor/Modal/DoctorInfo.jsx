import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DoctorInfo = (props) => {
  const { open, doctor } = props;

  const handleClose = () => {
    if (reason !== "backdropClick") {
      onClose(event, reason);
    }
  };

  const resetData = () => {
    props.setDataView("");
    props.setOpen(false);
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth
    >
      {doctor ? (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              gap: "7px",
              alignItems: "center",
              m: 0,
              p: 2,
              fontSize: "20px",
              fontWeight: "500",
            }}
            id="customized-dialog-title"
          >
            Thông tin Bác Sĩ
            <div className="text-xl font-serif font-semibold">
              {doctor.fullName}
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <div className="mx-10 flex flex-col gap-5">
              <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Tên"
                value={doctor.fullName}
                disabled
              />
              <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
                value={doctor.email}
                disabled
              />
              {doctor.specialist_Id ? (
                <input
                  className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={doctor.specialist_Name}
                  disabled
                />
              ) : (
                <></>
              )}
              {/* <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="UserName"
                value={doctor.username}
                disabled
              /> */}
              {/* <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Password"
                value={doctor.password}
                disabled
              /> */}
              <div className="flex gap-2">
                <input
                  type="date"
                  value={doctor.birthday}
                  disabled
                  className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <select
                  id="gender"
                  name="gender"
                  value={doctor.gender}
                  disabled
                  className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>
                    Giới tính
                  </option>
                  <option value={true}>Nam</option>
                  <option value={false}>Nữ</option>
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                  type="text"
                  placeholder="Số điện thoại"
                  value={doctor.phone}
                  disabled
                />
                <input
                  className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                  type="text"
                  placeholder="Giá khám"
                  value={doctor.iD_Number}
                  disabled
                />
              </div>
              <div className="w-full flex justify-center outline-dotted outline-slate-200">
                <img src={`data:image/jpeg;base64,${doctor.image}`} className="w-32 h-32 p-2" />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => resetData()}
            >
              Đóng
            </Button>
          </DialogActions>
        </>
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </BootstrapDialog>
  );
};

export default DoctorInfo;
