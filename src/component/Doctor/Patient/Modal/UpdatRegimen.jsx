import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Sample service data for the dropdown
const services = [
    { id: "1", name: "Khám tổng quát" },
    { id: "2", name: "Xét nghiệm máu" },
];

const regimenData = {
    regimen_Services: [
        {
            rS_Id: "lsC3NgxOb0",
            regimen_Id: "TOecfvpCo0",
            step: "Step 1",
            service_Id: "1",
            service_Name: "Khám tổng quát",
            note: "Khám bệnh",
        },
        {
            rS_Id: "lmD2NgxZb9",
            regimen_Id: "TOecfvpCo0",
            step: "Step 2",
            service_Id: "2",
            service_Name: "Xét nghiệm máu",
            note: "Phân tích các chỉ số máu",
        },
    ],
};

export default function EditableStepper() {
    const [steps, setSteps] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newStep, setNewStep] = useState({ label: "", description: "", service_Id: "" });
    const [submittedSteps, setSubmittedSteps] = useState(null);

    // Load initial steps from regimenData
    useEffect(() => {
        const initialSteps = regimenData.regimen_Services.map((service, index) => ({
            label: service.service_Name,
            description: service.note,
            service_Id: service.service_Id, // Store the service id for reference
        }));
        setSteps(initialSteps);
    }, []);

    // Handle input change for new step or edit
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        if (index !== undefined) {
            // Editing an existing step
            setSteps((prevSteps) =>
                prevSteps.map((step, i) =>
                    i === index ? { ...step, [name]: value } : step
                )
            );
        } else {
            // Adding a new step
            setNewStep((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle select change for service
    const handleServiceChange = (e, index) => {
        const { value } = e.target;
        const selectedService = services.find((service) => service.id === value);

        if (index !== undefined) {
            // Update existing step with selected service
            setSteps((prevSteps) =>
                prevSteps.map((step, i) =>
                    i === index ? { ...step, service_Id: value, label: selectedService.name } : step
                )
            );
        } else {
            // Update new step with selected service
            setNewStep((prev) => ({ ...prev, service_Id: value, label: selectedService.name }));
        }
    };

    // Add new step (automatically create step number)
    const handleAddStep = () => {
        if (newStep.label && newStep.description) {
            setSteps((prevSteps) => [
                ...prevSteps,
                { ...newStep }, // Automatically set step number
            ]);
            setNewStep({ label: "", description: "", service_Id: "" });
        }
    };

    // Delete step
    const handleDeleteStep = (index) => {
        setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
    };

    // Start editing
    const handleEditStep = (index) => {
        setEditingIndex(index);
    };

    // Save changes
    const handleSaveStep = () => {
        setEditingIndex(null); // Exit editing mode
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingIndex(null); // Exit editing mode
    };

    // Submit steps
    const handleSubmit = () => {
        setSubmittedSteps(steps); // Store the current steps
        console.log("Submitted Steps:", steps); // Log to the console for debugging
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", my: 4 }}>
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
                                            <MenuItem key={service.id} value={service.id}>
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
                            <MenuItem key={service.id} value={service.id}>
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

            {/* Submit Button */}
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Submit Steps
                </Button>
            </Box>

            {/* Display submitted steps */}
            {submittedSteps && (
                <Box sx={{ mt: 4, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
                    <Typography variant="h6">Submitted Steps:</Typography>
                    <pre>{JSON.stringify(submittedSteps, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
}
