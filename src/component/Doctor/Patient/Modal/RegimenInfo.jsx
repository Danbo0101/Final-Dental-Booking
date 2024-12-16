import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { getAllBookingByUserrId } from "../../../../services/bookingService";
import { sortByStep } from "../../../../utils/general";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const RegimenInfo = (props) => {
  const { open, dataView, selectedUser } = props;

  // console.log(dataView)
  // console.log(selectedUser)

  const [steps, setSteps] = useState([]);
  const [regimentDetail, setRegimenDDetail] = useState([]);

  const fetchBookingByUser = async () => {
    let result = await getAllBookingByUserrId(selectedUser);
    if (result.success) {
      if (dataView && dataView.regimen_Services) {
        const rS_Ids = dataView.regimen_Services.map((service) => service.rS_Id);

        const updatedResult = result.data.map((item) => ({
          ...item,
          isBooking: rS_Ids.includes(item.rS_Id),
        }));
        setRegimenDDetail(updatedResult);
      }
    }
    else {
      console.log(result.message);
    }
  };

  useEffect(() => {
    fetchBookingByUser();
  }, [dataView, open]);

  useEffect(() => {
    if (dataView && regimentDetail.length > 0) {
      const bookingMap = regimentDetail.reduce((acc, item) => {
        acc[item.rS_Id] = item.isBooking;
        return acc;
      }, {});

      console.log(regimentDetail);

      const reversedServices = sortByStep(dataView.regimen_Services);

      const newSteps = reversedServices.map((service) => ({
        label: service.service_Name,
        description: service.note,
        isBooking: bookingMap[service.rS_Id] || false,
        rS_Id: service.rS_Id,
        regimen_Id: service.regimen_Id,
        service_Id: service.service_Id,
        user_Id: selectedUser
      }));
      setSteps(newSteps);
    }
  }, [regimentDetail, dataView]);


  const handleClose = () => {
    if (reason !== "backdropClick") {
      onClose(event, reason);
    }
  };

  const resetData = () => {
    props.setDataView("");
    props.setOpen(false);
  };

  const handleOpenCreateAppt = (data) => {
    props.setOpenCreateAppt(true);
    props.setDataCreateAppt(data);
    resetData();
  }
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth
    >
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

      </DialogTitle>
      <DialogContent dividers>
        <div className='flex justify-center items-center  text-2xl font-semibold p-5'>
          Thông tin liệu trình
        </div>
        <div className='flex justify-center gap-5 mt-10'>

          <Box sx={{
            maxWidth: 400,
            border: '1px dashed',
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#F9F9F9",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}>
            <Stepper orientation="vertical" nonLinear>
              {steps.map((step) => (
                <Step key={step.label} active>
                  <StepLabel>
                    {step.label}
                    <IconButton sx={{ marginLeft: 1 }} aria-label="calendar">
                      {step.isBooking ?
                        <></>
                        :
                        <PostAddOutlinedIcon
                          onClick={() => handleOpenCreateAppt(step)}
                        />
                      }

                    </IconButton>
                  </StepLabel>
                  <Typography sx={{ pl: 3, mt: 1 }}>{step.description}</Typography>
                </Step>
              ))}
            </Stepper>
          </Box>
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
  );
};

export default RegimenInfo;
