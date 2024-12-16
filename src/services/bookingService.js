import axios from "../utils/axiosCustomize";


const postCreateBooking = (calendar_Id, user_Id, note) => {
    const data = new FormData();
    data.append("calendar_Id", calendar_Id);
    data.append("user_Id", user_Id);
    data.append("note", note);
    return axios.post(`/api/Booking/create-booking-by-customer`, data);
}

const getBookingByCalendarId = (calendar_Id) => {
    return axios.get(`/api/Booking/get-all-by-calendar-id/${calendar_Id}`);
}

const getAllBookingByUserrId = (user_Id) => {
    return axios.get(`/api/Booking/get-all-by-user-id/${user_Id}`);
}

const puUpdateBooking = (booking_Id, data) => {
    return axios.put(`/api/Booking/update/${booking_Id}`, data);
}

const postCreateBookingByDoctor = (total_Price, note, user_Id, status_Id, calendar_Id, rS_Id) => {
    const data = new FormData();
    data.append("total_Price", total_Price);
    data.append("note", note);
    data.append("user_Id", user_Id);
    data.append("status_Id", status_Id);
    data.append("calendar_Id", calendar_Id);
    data.append("rS_Id", rS_Id);
    return axios.post(`/api/Booking/create`, data);
}

export {
    postCreateBooking,
    getBookingByCalendarId,
    getAllBookingByUserrId,
    puUpdateBooking,
    postCreateBookingByDoctor
}