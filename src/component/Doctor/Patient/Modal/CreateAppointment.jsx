import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getListDoctorSchedule, getTimeDoctorSchedule } from '../../../../services/scheduleService';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { convertTo12HourFormat } from '../../../../utils/general';
import { postCreateBookingByDoctor } from '../../../../services/bookingService';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Item = styled(Paper)(({ theme, active, selected }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    cursor: !active ? 'default' : 'pointer',
    backgroundColor: selected
        ? 'rgba(0, 106, 255, 0.54)'
        : !active ? 'rgba(93, 93, 93, 0.4)' : 'rgba(255, 255, 255, 0.4)',
    color: selected ? 'white' : 'black',
    padding: "10px 0 10px 0",
    borderRadius: "10px",
    boxShadow: "0 0 10 0",
    fontSize: "14px",
    fontWeight: "bold",
    ...(!active
        ? {}
        : {
            ":hover": {
                backgroundColor: 'rgba(224, 224, 224, 0.4)',
                color: 'rgba(255, 255, 255, 0.8)',
            },
        }),
}));


const CreateAppointment = (props) => {

    const { open, dataCreateAppt } = props;

    const doctorId = useSelector(state => state.user.account.id);

    const [dateSelected, setDateSelected] = useState(dayjs());
    const [selectedId, setSelectedId] = useState(null);
    const [calendarId, setCalendarId] = useState("");
    const [listTime, setListTime] = useState([]);

    const resetData = () => {
        props.setDataCreateAppt([])
        props.setOpen(false);
    };

    const fetchListTimeBySchedule = async () => {
        let formattedDate = dateSelected.format('YYYY-MM-DD');
        let result = await getTimeDoctorSchedule(doctorId, formattedDate);
        if (result.success && result.data) {
            setListTime(result.data.timeBookings);
            return;
        }
        else {
            setListTime([]);
            console.log(result.message);
        }
    }

    const fetchCalendarId = async () => {
        let formattedDate = dateSelected.format('YYYY-MM-DD');
        let result = await getListDoctorSchedule(doctorId, formattedDate);
        if (result.success) {
            let schedule = result.data;
            let findCalendarId = schedule.find((item) => item.time_Id === selectedId);
            setCalendarId(findCalendarId.calendar_Id);
        }
        else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        fetchListTimeBySchedule();
    }, [dateSelected])

    useEffect(() => {
        fetchCalendarId();
    }, [dateSelected, selectedId])

    const handleCreateAppt = async () => {
        let dataCreate = [{
            total_Price: 0,
            note: dataCreateAppt.description,
            user_Id: dataCreateAppt.user_Id,
            status_Id: "7",
            calendar_Id: calendarId,
            rS_Id: dataCreateAppt.rS_Id,
            service_Id: dataCreateAppt.service_Id
        }]

        // console.log(dataCreate)
        // console.log(dataCreateAppt)

        let result = await postCreateBookingByDoctor(0, dataCreateAppt.description, dataCreateAppt.user_Id, 7, calendarId, dataCreateAppt.rS_Id, dataCreateAppt.service_Id)
        if (result.success) {
            toast.success("Đặt lịch thành công");
            props.fetchRegimenByUser();
            resetData();
        }
        else {
            toast.error(result.message);
        }
    }


    return (
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                fontSize: '20px',
                fontWeight: '500',
            }} id="customized-dialog-title">
                Đặt lịch tái khám {dataCreateAppt ? dataCreateAppt.label : <></>}
                <Tooltip title="Chọn thời gian">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Ngày"
                                value={dateSelected}
                                onChange={(newDateSelected) => setDateSelected(newDateSelected)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Tooltip>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    width: '100%',
                    padding: '10px 100px',

                }}>
                    <Grid container rowSpacing={4} columnSpacing={5}>
                        {listTime && listTime.length > 0
                            ?
                            listTime.map((item, index) => {
                                return (
                                    <Grid size={6} key={item.time_Id}>
                                        <Item
                                            active={item.available === true}
                                            selected={selectedId === item.time_Id}
                                            onClick={() => {
                                                if (item.available === true) {
                                                    setSelectedId(item.time_Id);
                                                }
                                            }}
                                        >
                                            {convertTo12HourFormat(item.time_Book)}

                                        </Item>
                                    </Grid>
                                )
                            })
                            :
                            <>
                                <div className='ml-48 bg-slate-400 text-base font-semibold font-serif px-10 py-5 rounded-lg shadow-sm '>
                                    Chưa có lịch làm
                                </div>
                            </>
                        }
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => resetData()}>
                    Đóng
                </Button>
                <Button
                    autoFocus
                    variant="contained"
                    onClick={() => handleCreateAppt()}>
                    Đặt lịch tái khám
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default CreateAppointment;