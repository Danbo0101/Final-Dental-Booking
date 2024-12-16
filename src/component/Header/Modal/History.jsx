import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getAllBookingByUserrId, puUpdateBooking } from '../../../services/bookingService';
import { toast } from 'react-toastify';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import IconButton from '@mui/material/IconButton';
import { getDoctorScheduleDetail, getTimeType } from '../../../services/scheduleService';
import { getUserById } from '../../../services/userService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const History = (props) => {
    const { open } = props;

    const printRefs = useRef([]);

    const handleClose = () => {
        props.setOpen(false);
    }

    const id = useSelector(state => state.user.account.id);

    const [listBookingHistory, setListBookingHistory] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState('date');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchHistoryBooking = async () => {
        let result = await getAllBookingByUserrId(id);
        if (result.success) {
            const bookings = result.data;
            const times = await getTimeType();
            const promises = bookings
                .filter((booking) => booking.calendar_Id)
                .map(async (booking) => {
                    const calendarId = booking.calendar_Id;
                    const scheduleDetail = await getDoctorScheduleDetail(calendarId);
                    const scheduleData = scheduleDetail.data.data;
                    let doctorInfo = { fullName: null, specialist_Name: null };
                    if (scheduleData.doctor_Id) {
                        const doctorDetail = await getUserById(scheduleData.doctor_Id);
                        doctorInfo = doctorDetail.data;
                    }
                    const timeInfo = times.find(time => time.time_Id === scheduleData.time_Id);
                    const time_Book = timeInfo ? timeInfo.time_Book : null;
                    return {
                        booking_Id: booking.booking_Id,
                        total_Price: booking.total_Price,
                        note: booking.note,
                        user_Id: booking.user_Id,
                        calendar_Id: booking.calendar_Id,
                        rS_Id: booking.rS_Id,
                        status_Id: booking.status_Id,
                        status_Name: booking.status_Name,
                        date: scheduleData.date,
                        time_Id: scheduleData.time_Id,
                        time_Book: time_Book,
                        doctor_FullName: doctorInfo.fullName,
                        specialist_Name: doctorInfo.specialist_Name,
                    };
                });


            const enrichedBookings = await Promise.all(promises);

            setListBookingHistory(enrichedBookings)
            // console.log("Final enriched bookings:", enrichedBookings);
            // return enrichedBookings;
        } else {
            console.log(result.message);
            return [];
        }
    };


    useEffect(() => {
        fetchHistoryBooking();
    }, [open])

    const pageCount = Math.ceil(listBookingHistory.length / itemsPerPage);
    const currentData = listBookingHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
    };
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const sortedData = [...currentData].sort((a, b) => {
        const dateA = parseDate(a[sortColumn]);
        const dateB = parseDate(b[sortColumn]);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const hanldeCancelBooking = async (booking) => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn hủy lịch hẹn ngày ${booking.date} của bác sĩ ${booking.doctorName} không?`);

        if (userConfirmed) {
            let dataUpdate = {
                total_Price: booking.total_Price,
                note: booking.note,
                user_Id: booking.user_Id,
                status_Id: "4",
                calendar_Id: booking.calendar_Id,
                rS_Id: booking.rS_Id
            }
            let result = await puUpdateBooking(booking.booking_Id, dataUpdate);
            if (result.success) {
                handleClose();
                toast.success('Hủy lịch hẹn thành công');
                fetchHistoryBooking();
            } else {
                toast.error('Hủy lịch hẹn thất bại');
            }

        } else {
        }
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>STT</TableCell>
                            <TableCell align="center">Ca khám bệnh</TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortColumn === 'date'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('date')}
                                >
                                    Ngày đặt
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Tên bác sĩ</TableCell>
                            <TableCell align="center">Chuyên khoa khám</TableCell>
                            <TableCell align="center">Trạng thái lịch hẹn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((booking, index) => (
                            <TableRow
                                key={booking.bookingId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{booking.time_Book}</TableCell>
                                <TableCell align="center">{booking.date}</TableCell>
                                <TableCell align="center">{booking.doctor_FullName}</TableCell>
                                <TableCell align="center">{booking.specialist_Name}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        disabled={new Date() > new Date(booking.date.split('/').reverse().join('-')) || booking.status_Id === "4"}
                                        onClick={() => hanldeCancelBooking(booking)}
                                    >
                                        {booking.status_Name}
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

                {sortedData.length > 0 ?
                    <div className=' flex items-center justify-center p-8'>
                        <Pagination
                            count={pageCount}
                            variant="outlined"
                            color="primary"
                            page={currentPage}
                            onChange={(e, value) => setCurrentPage(value)}
                        />
                    </div>
                    :
                    <div className="flex justify-center py-5 text-red-400">Không tìm thấy lịch hẹn</div>
                }

            </DialogContent>
        </Dialog >
    )
}

export default History;