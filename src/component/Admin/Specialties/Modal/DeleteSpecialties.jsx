
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { putUpdateSpecialties } from '../../../../services/specialtiesService';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteSpecialties = (props) => {
    const { open, dataDelete } = props;

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const resetData = () => {
        props.setDataDelete("");
        props.setOpen(false);
    }

    const handleDeleteSpecialties = async () => {

        let result = await putUpdateSpecialties(dataDelete.specialist_Id, dataDelete.name, dataDelete.description, null, false);
        if (result.success) {
            toast.success("Xoá chuyên khoa thành công");
            props.fetchListSpecialties();
            resetData();
        } else {
            toast.error(result.message);
            props.fetchListSpecialties();
            resetData()
        }

    };

    return (
        <>
            {dataDelete ?
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{`Vui lòng xác nhận xóa chuyên khoa ${dataDelete.name}?`}</DialogTitle>
                    <DialogActions
                    >
                        <Button onClick={resetData} variant='outlined' color='error'>Không</Button>
                        <Button onClick={handleDeleteSpecialties} variant='outlined' color='success'>Xác nhận</Button>
                    </DialogActions>
                </Dialog>
                :
                <></>
            }

        </>
    )
}


export default DeleteSpecialties;