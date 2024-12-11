import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { formatCurrencyVND } from "../../../../utils/general";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ServiceInfo = (props) => {
  const { open, dataView } = props;

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
    <>
      {dataView ? (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }}
            id="customized-dialog-title"
          >
            Thông tin Chuyên Khoa {dataView.name}
          </DialogTitle>
          <DialogContent dividers>
            <div className="mx-10 flex flex-col gap-5">
              <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Tên"
                value={dataView.name}
                disabled
              />
              <textarea
                className="w-full h-20 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                type="text"
                placeholder="Mô tả"
                value={dataView.description}
                disabled
              />
              <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Tên"
                value={formatCurrencyVND(dataView.price)}
                disabled
              />
              <div className="w-full flex justify-center">
                <img src={`data:image/jpeg;base64,${dataView.image}`} className="w-52 h-48" />
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
        </BootstrapDialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default ServiceInfo;
