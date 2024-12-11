import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
// import { getDoctorSchedule, getTimeType, postCreateDoctorSchedule } from '../../../../services/scheduleService';
import { toast } from 'react-toastify';
import { getListDoctorSchedule, getTimeType, postCreateListDoctorSchedule } from '../../../../services/scheduleService';
import { select } from '@material-tailwind/react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
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

const CreateDoctorSchedule = (props) => {

    const { open, doctorId } = props;

    const handleClose = () => {
        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }
        props.setOpen(false);
    };



    const [dateSelected, setDateSelected] = useState(dayjs().add(1, 'day'));
    const [maxNumber, setMaxNumber] = useState("");
    const [timeOptions, setTimeOptions] = useState([]);
    const [timeSelected, setTimeSelected] = useState([]);
    const [checked, setChecked] = useState([]);

    const fetchTimeOptions = async () => {
        let formattedDate = dateSelected.format('YYYY-MM-DD');
        let resultDoctorSchedule = await getListDoctorSchedule(doctorId, formattedDate);
        let resultTime = await getTimeType();
        let filteredTimeOptions = [];

        if (resultDoctorSchedule.success && resultDoctorSchedule.data.length > 0) {
            let scheduleDoctor = resultDoctorSchedule.data.map(item => item.time_Id);
            console.log(scheduleDoctor);

            filteredTimeOptions = resultTime
                .filter(({ time_Id }) => !scheduleDoctor.includes(time_Id))
                .map(({ time_Id, time_Book }) => ({
                    time_Id,
                    time_Book,
                }));
        } else {
            filteredTimeOptions = resultTime.map(({ time_Id, time_Book }) => ({
                time_Id,
                time_Book,
            }));
        }

        filteredTimeOptions.sort((a, b) => {
            return parseInt(a.time_Id) - parseInt(b.time_Id);
        });

        console.log(filteredTimeOptions)

        setTimeOptions(filteredTimeOptions);
    };


    useEffect(() => {
        fetchTimeOptions();
    }, [dateSelected]);

    const leftChecked = intersection(checked, timeOptions);
    const rightChecked = intersection(checked, timeSelected);


    const handleToggle = (item) => () => {
        const currentIndex = checked.findIndex((checkedItem) => checkedItem.time_Id === item.time_Id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(item);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };


    const handleCheckedRight = () => {
        setTimeSelected(timeSelected.concat(leftChecked));
        setTimeOptions(not(timeOptions, leftChecked));
        setChecked(not(checked, leftChecked));
    };


    const handleCheckedLeft = () => {
        setTimeOptions(timeOptions.concat(rightChecked));
        setTimeSelected(not(timeSelected, rightChecked));
        setChecked(not(checked, rightChecked));
    };


    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
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
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((item) => {
                    const labelId = `transfer-list-item-${item.time_Id}-label`;

                    return (
                        <ListItemButton
                            key={item.time_Id}
                            role="listitem"
                            onClick={handleToggle(item)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.some((checkedItem) => checkedItem.time_Id === item.time_Id)} // Kiểm tra nếu item có trong checked
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.time_Book} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );


    const handleCreateDoctorSchedule = async () => {
        if (!dateSelected) {
            toast.warn("Vui lòng chọn ngày");
            return;
        }
        if (!maxNumber) {
            toast.warn("Vui lòng nhập số lượng bệnh nhân");
            return;
        }

        const formattedDate = dateSelected.format('YYYY-MM-DD');

        const scheduleData = timeSelected.map(time => ({
            date: formattedDate,
            note: "string",
            doctor_Id: doctorId,
            max_Customer: maxNumber.toString(),
            status_Id: "1",
            time_Id: time.time_Id
        }));

        let result = await postCreateListDoctorSchedule(doctorId, scheduleData);
        if (result) {
            toast.success("Đăng ký lịch làm thành công");
            resetData();
        } else {
            console.log(result.message)
        }

    };


    const resetData = () => {
        setDateSelected(dayjs().add(1, 'day'));
        setMaxNumber("");
        setChecked([]);
        setTimeOptions([]);
        setTimeSelected([]);
        props.setOpen(false);
    }


    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{
                fontSize: "20px",
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 30px",
            }} id="customized-dialog-title">
                Đăng ký lịch làm
            </DialogTitle>
            <DialogContent dividers>
                <div className='flex justify-center mb-10 gap-5'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Ngày"
                                value={dateSelected}
                                onChange={(newDateSelected) => setDateSelected(newDateSelected)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <input
                        className="w-1/3 px-8 h-14 mt-auto rounded-lg font-mediu border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Số lượng bệnh nhân tối đa"
                        value={maxNumber}
                        onChange={(e) => setMaxNumber(e.target.value)}
                    />

                </div>
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <Grid item>{customList('Available Times', timeOptions)}</Grid>
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
                    <Grid item>{customList('Selected Times', timeSelected)}</Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => resetData()}>Huỷ</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleCreateDoctorSchedule();
                    }}
                >
                    Đăng ký
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}

export default CreateDoctorSchedule;