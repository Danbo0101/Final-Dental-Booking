import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { getServices } from "../../../../services/specialtiesService";
import { postUpdateRegimen } from "../../../../services/regimen";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UpdateRegimen = (props) => {
  const { open, dataUpdate } = props;

  if (dataUpdate) {
    console.log(dataUpdate);
  }

  const handleClose = () => {
    if (reason !== "backdropClick") {
      onClose(event, reason);
    }
  };

  const resetData = () => {
    props.setDataUpdate("");
    props.setOpen(false);
  };

  // Updated service structure
  // const services = [
  //   { service_Id: "1", name: "Khám tổng quát", description: "test", price: 1234567, image: null, is_Deleted: false },
  //   { service_Id: "fH3vKsgYn0", name: "Dịch vụ 2", description: "test", price: 1234567, image: null, is_Deleted: false },
  //   { service_Id: "SzV1Ss1kfE", name: "Dịch vụ 1", description: "test", price: 1234567, image: null, is_Deleted: false }
  // ];

  const [services, setServices] = useState([]);

  const [steps, setSteps] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newStep, setNewStep] = useState({ label: "", description: "", service_Id: "" });
  const [submittedSteps, setSubmittedSteps] = useState(null);

  const fetchServiceOptions = async () => {
    let result = await getServices();
    if (result.success) {
      setServices(result.data);
      return;
    }
    else {
      console.log(result.message);
    }
  }

  useEffect(() => {
    if (dataUpdate) {
      const initialSteps = dataUpdate.regimen_Services.map((service, index) => ({
        label: service.service_Name,
        description: service.note,
        service_Id: service.service_Id,
      }));
      setSteps(initialSteps);
      fetchServiceOptions();
    }
  }, [dataUpdate, open]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      setSteps((prevSteps) =>
        prevSteps.map((step, i) =>
          i === index ? { ...step, [name]: value } : step
        )
      );
    } else {
      setNewStep((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceChange = (e, index) => {
    const { value } = e.target;
    const selectedService = services.find((service) => service.service_Id === value);

    if (index !== undefined) {
      setSteps((prevSteps) =>
        prevSteps.map((step, i) =>
          i === index ? { ...step, service_Id: value, label: selectedService.name } : step
        )
      );
    } else {
      setNewStep((prev) => ({ ...prev, service_Id: value, label: selectedService.name }));
    }
  };

  const handleAddStep = () => {
    if (newStep.label && newStep.description) {
      setSteps((prevSteps) => [
        ...prevSteps,
        { ...newStep },
      ]);
      setNewStep({ label: "", description: "", service_Id: "" });
    }
  };

  const handleDeleteStep = (index) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const handleEditStep = (index) => {
    setEditingIndex(index);
  };

  const handleSaveStep = () => {
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleSubmit = async () => {
    let stepCounter = 1;

    const transformedData = steps.map(service => ({
      step: `Step ${stepCounter++}`,
      service_Id: service.service_Id,
      note: service.description
    }));
    // setSubmittedSteps(transformedData);

    let result = await postUpdateRegimen(dataUpdate.regimen_Id, transformedData);
    if (result.success) {
      toast.success("Cập nhật liệu trình Thành Công");
      props.fetchRegimenByUser();
      resetData();
    }
    else {
      console.log(result.message)
      toast.error("Cập nhật liệu trình Thất Bại")
    }
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
        {/* Title */}
      </DialogTitle>
      <DialogContent dividers>
        <div className='flex justify-center items-center text-2xl font-semibold p-5'>
          Chỉnh sửa liệu trình {dataUpdate ? dataUpdate.name : <></>}
        </div>
        <Box sx={{
          maxWidth: 500,
          mx: "auto",
          my: 4,
          border: '1px dashed',
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#F9F9F9",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Stepper to display steps */}
          <Stepper orientation="vertical" nonLinear activeStep={steps.length - 1}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  {editingIndex === index ? (
                    <FormControl fullWidth>
                      <InputLabel>Service</InputLabel>
                      <Select
                        value={step.service_Id}
                        onChange={(e) => handleServiceChange(e, index)}
                        label="Service"
                        size="small"
                      >
                        {services.map((service) => (
                          <MenuItem key={service.service_Id} value={service.service_Id}>
                            {service.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    step.label
                  )}
                </StepLabel>
                <Box sx={{ pl: 3, mt: 1 }}>
                  {editingIndex === index ? (
                    <TextField
                      name="description"
                      value={step.description}
                      onChange={(e) => handleInputChange(e, index)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
                      sx={{ mb: 2 }}
                    />
                  ) : (
                    <Typography>{step.description}</Typography>
                  )}
                  <Box sx={{ mt: 2 }}>
                    {editingIndex === index ? (
                      <>
                        <IconButton onClick={handleSaveStep} sx={{ mr: 1 }}>
                          <SaveIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                          <CancelIcon color="error" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditStep(index)} sx={{ mr: 1 }}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteStep(index)} sx={{ mr: 1 }}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Box>
              </Step>
            ))}
          </Stepper>

          {/* Form to add new step */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add New Step
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Service</InputLabel>
              <Select
                value={newStep.service_Id}
                onChange={(e) => handleServiceChange(e)}
                label="Service"
                size="small"
              >
                {services.map((service) => (
                  <MenuItem key={service.service_Id} value={service.service_Id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Step Description"
              name="description"
              value={newStep.description}
              onChange={(e) => handleInputChange(e)}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStep}
              disabled={!newStep.label || !newStep.description}
            >
              Add Step
            </Button>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
              Submit Steps
            </Button>
          </Box>
        </Box>
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

export default UpdateRegimen;
