import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React from "react";
import { toast } from "react-toastify";
import { putUpdateDoctor } from "../../../../services/doctorService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteDoctor = (props) => {
  const { open, dataDelete } = props;

  const handleClose = () => {
    if (reason !== "backdropClick") {
      onClose(event, reason);
    }
  };

  const resetData = () => {
    props.setDataDelete("");
    props.setOpen(false);
  };

  console.log(dataDelete);

  const handleDeleteDoctor = async () => {
    let reult = await putUpdateDoctor(
      dataDelete.user_Id,
      dataDelete.fullName,
      dataDelete.email,
      dataDelete.userName,
      dataDelete.password,
      dataDelete.birthday,
      dataDelete.gender,
      dataDelete.phone,
      dataDelete.iD_Number,
      dataDelete.role_Id,
      dataDelete.image,
      dataDelete.specialist_Id,
      false
    );

    if (reult.success) {
      toast.success("Xóa Bác Sĩ Thành Công");
      props.fetchDoctorList();
      resetData();
    } else toast.error("Xóa Bác Sĩ Thất Bại");
  };

  return (
    <>
      {dataDelete ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`Vui lòng xác nhận xóa bác sĩ ${dataDelete.fullName} ?`}</DialogTitle>

          <DialogActions>
            <Button onClick={resetData} variant="outlined" color="error">
              Không
            </Button>
            <Button
              onClick={handleDeleteDoctor}
              variant="outlined"
              color="success"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteDoctor;
