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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const RegimenInfo = (props) => {
  const { open, dataView } = props;

  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (dataView) {
      const newSteps = dataView.regimen_Services.map((service) => ({
        label: service.service_Name,
        description: service.note,
      }));
      setSteps(newSteps);
    }
  }, [dataView, open]);

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
                  <StepLabel>{step.label}</StepLabel>
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
