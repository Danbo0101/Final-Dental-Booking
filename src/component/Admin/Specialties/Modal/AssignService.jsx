import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { AssignServices, getServices, getSpecialtyById } from "../../../../services/specialtiesService";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const not = (a, b) => {
    return a.filter((value) => !b.includes(value));
}

const intersection = (a, b) => {
    return a.filter((value) => b.includes(value));
}

const union = (a, b) => {
    return [...a, ...not(b, a)];
}

const AssignService = (props) => {
    const { open, dataAssign } = props;

    const handleClose = () => {
        if (reason !== "backdropClick") {
            onClose(event, reason);
        }
    };

    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            let result = await getSpecialtyById(dataAssign.specialistId);
            if (result.success) {
                let serviceSpecialty = result.data.data.service_Specialists
                let resultSerivce = await getServices();
                if (resultSerivce.success) {
                    let services = resultSerivce.data
                    let filteredServices = services.map((service) => ({
                        id: service.service_Id,
                        name: service.name,
                    }));
                    if (!serviceSpecialty) {
                        setLeft(filteredServices);
                        return;
                    }
                    const filteredLeft = filteredServices.filter(
                        (item) => !serviceSpecialty.some((service) => service.service_Id === item.id)
                    );
                    setLeft(filteredLeft);
                } else (console.log(resultSerivce.message))
            }
            else {
                console.log(result.message)
            }

        };

        fetchServices();
    }, [open]);


    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.findIndex((item) => item.id === value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) =>
        intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            numberOfChecked(items) === items.length && items.length !== 0
                        }
                        indeterminate={
                            numberOfChecked(items) !== items.length &&
                            numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 300,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value.id}-label`;

                    return (
                        <ListItemButton
                            key={value.id}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.some((item) => item.id === value.id)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    const resetData = () => {
        setChecked([]);
        setLeft([]);
        setRight([]);
        props.setDataAssign("");
        props.setOpen(false);
    };

    const handleAssignService = async () => {
        const services = right.map((service) => ({
            service_Id: service.id
        }));

        let result = await AssignServices(dataAssign.specialistId, services);
        if (result.success) {
            toast.success(`Gán dịch vụ cho chuyên khoa ${dataAssign.name} thành công`);
            props.fetchListSpecialties();
            resetData();
        }
        else {
            toast.error(result.message);
        }

    }

    return (
        <>
            {dataAssign ? (
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
                        Gán dịch vụ cho chuyên khoa {dataAssign.name}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid
                            container
                            spacing={2}
                            sx={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Grid item>{customList('Choices', left)}</Grid>
                            <Grid item>
                                <Grid container direction="column" sx={{ alignItems: 'center' }}>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>{customList('Chosen', right)}</Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => resetData()}
                        >
                            Đóng
                        </Button>
                        <Button
                            variant="outlined"
                            color='primary'
                            onClick={() => handleAssignService()}
                        >
                            Gán Dịch Vụ
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            ) : (
                <></>
            )}
        </>
    );
};
export default AssignService;