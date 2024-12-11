import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import { TableVirtuoso } from 'react-virtuoso';
import * as React from 'react';
import { getBookingByCalendarId } from '../../../../services/bookingService';
import { convertTo12HourFormat } from '../../../../utils/general';
import { getUserById } from '../../../../services/userService';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ViewDoctorSchedule = (props) => {

    const navigate = useNavigate();

    const { open, dataView, onClose } = props;

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }
    };

    const [timeTypeName, setTimeTypeName] = useState("");
    const [maxNumber, setMaxNumber] = useState("");
    const [date, setDate] = useState("");
    const [patientList, setPatientList] = useState([]);

    const resetData = () => {
        setTimeTypeName("");
        setMaxNumber("");
        setDate("");
        setPatientList([]);
        props.setDataView("");
        props.setOpen(false);
    };

    const fetchDoctorScheduleInfoDetail = async () => {
        let resultBooking = await getBookingByCalendarId(dataView.calendar_Id);
        if (resultBooking.success) {
            // const bookings = resultBooking.data;
            // const userIds = [...new Set(bookings.map(booking => booking.user_Id))];
            // const userPromises = userIds.map(userId => getUserById(userId));
            // const userResponses = await Promise.all(userPromises);
            // const users = userResponses.map(response => response.data);
            // setPatientList(users);
            const bookings = resultBooking.data;
            const userStatusMap = bookings.reduce((acc, booking) => {
                if (!acc[booking.user_Id]) {
                    acc[booking.user_Id] = booking.status_Name;
                }
                return acc;
            }, {});

            const userIds = Object.keys(userStatusMap);
            const userPromises = userIds.map(userId => getUserById(userId));
            const userResponses = await Promise.all(userPromises);
            const users = userResponses.map(response => response.data);
            const enrichedUsers = users.map(user => {
                const status = userStatusMap[user.user_Id];
                if (!status) {
                    console.warn(`Không tìm thấy status_Name cho userId: ${user.id}`);
                }
                return {
                    ...user,
                    statuBooking: status
                };
            });

            // console.log(enrichedUsers)

            setPatientList(enrichedUsers);


        }
        else {
            console.log(resultBooking.message);
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (dataView) {
                setTimeTypeName(dataView.time_Booking);
                setMaxNumber(dataView.max_Customer);
            }
        }
        fetchData();
        fetchDoctorScheduleInfoDetail();
    }, [dataView]);

    const createData = (index, patientName, patientGender, patientPhone, bookingStatus, id) => {
        return { index, patientName, patientGender, patientPhone, bookingStatus, id };
    };

    const rows = patientList.map((patient, index) =>
        createData(index, patient.fullName, patient.gender ? "Nam" : "Nữ", patient.phone, patient.statuBooking, patient.user_Id
        )
    );

    const columns = [
        {
            width: 50,
            label: 'ID',
            dataKey: 'index',
        },
        {
            width: 200,
            label: 'Tên bệnh nhân',
            dataKey: 'patientName',
        },
        {
            width: 200,
            label: 'Gender',
            dataKey: 'patientGender',
        },
        {
            width: 150,
            label: 'Số điện thoại',
            dataKey: 'patientPhone',
        },
        {
            width: 150,
            label: 'Trạng thái',
            dataKey: 'bookingStatus',
        },
    ];

    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
        TableRow,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };

    const fixedHeaderContent = () => {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align="center"
                        style={{ width: column.width }}
                        sx={{
                            backgroundColor: 'background.paper',
                        }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    };

    const rowContent = (_index, row) => {
        return (
            <React.Fragment>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align="center"
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
                <TableCell align="center">
                    <IconButton
                        onClick={() => navigate(`patients`, { state: { userId: row.id } })}
                    >
                        <PersonSearchOutlinedIcon />
                    </IconButton>
                </TableCell>
            </React.Fragment>
        );
    };






    return (

        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >

            <DialogContent dividers>
                <div >
                    <div className='flex justify-center items-center  text-2xl font-semibold p-5'>
                        Thông tin ca làm {convertTo12HourFormat(timeTypeName)}
                    </div>
                    <div className="mx-10 mt-5 flex flex-col gap-10">
                        <div className='w-full flex gap-32 justify-center'>
                            <div className="flex flex-col gap-2 items-center">
                                <label htmlFor="password">Số lượng người đặt tối đa</label>
                                <input
                                    className="w-full px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Max Number"
                                    value={maxNumber}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 mt-10'>
                        <div className='flex justify-between'>
                            Thông tin bệnh nhân đặt lịch
                        </div>


                        <Paper style={{ height: "300px", width: '100%' }}>
                            <TableVirtuoso
                                data={rows}
                                components={VirtuosoTableComponents}
                                fixedHeaderContent={fixedHeaderContent}
                                itemContent={rowContent}
                            />
                        </Paper>
                    </div>
                    {/* <button onClick={handlePrint} className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">Print</button> */}
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='inherit'
                    onClick={() => resetData()}
                >
                    Đóng
                </Button>

            </DialogActions>
        </BootstrapDialog>

    )
}

export default ViewDoctorSchedule;