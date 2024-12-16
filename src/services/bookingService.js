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

const postCreateBookingByRegimenId = (regimen_Id, data) => {
    return axios.post(`/api/Booking/create-by-regimen-id/${regimen_Id}`, data);
}

export {
    postCreateBooking,
    getBookingByCalendarId,
    getAllBookingByUserrId,
    puUpdateBooking,
    postCreateBookingByRegimenId
}