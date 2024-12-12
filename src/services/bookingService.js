import axios from "../utils/axiosCustomize";

const getBookingToConfirm = (scheduleId) => {
    return axios.get(`/v1/api/bookings?scheduleId=${scheduleId}`)
}

const postBooking = (patientId, scheduleId, bookingFee, consultationFee, feePaid) => {
    return axios.post(`/v1/api/bookings?patientId=${patientId}`, {
        scheduleId,
        bookingFee,
        consultationFee,
        feePaid
    })
}

const getBookingHistory = (patientId) => {
    return axios.get(`/v1/api/history-bookings?patientId=${patientId}`)
}

const deleteCancelBooking = (patientId, bookingId) => {
    return axios.delete(`/v1/api/bookings?patientId=${patientId}&bookingId=${bookingId}`)
}

const getBookingMonthly = (year) => {
    return axios.get(`/v1/api/booking-monthly?year=${year}`)
}

const getBookingClinic = () => {
    return axios.get(`/v1/api/booking-clinic`)
}

const getBookingSpecialties = () => {
    return axios.get(`/v1/api/booking-specialties`)
}

const postCreatePaymentUrl = (amount, orderId, orderInfo) => {
    return axios.post(`/v1/api/create_payment_url`, {
        amount,
        orderId,
        orderInfo,
    })
}

const getAllBookings = () => {
    return axios.get(`/v1/api/all-bookings`)
}

const checkTimeBooking = (patientId, scheduleId) => {
    return axios.get(`/v1/api/checkTimeBooking?patientId=${patientId}&scheduleId=${scheduleId}`)
}

const checkDoctorBooking = (patientId, scheduleId) => {
    return axios.get(`/v1/api/checkDoctorBooking?patientId=${patientId}&scheduleId=${scheduleId}`)
}

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

export {
    getBookingToConfirm,
    postBooking,
    getBookingHistory,
    deleteCancelBooking,
    getBookingMonthly,
    getBookingClinic,
    getBookingSpecialties,
    postCreatePaymentUrl,
    getAllBookings,
    checkTimeBooking,
    checkDoctorBooking,
    postCreateBooking,
    getBookingByCalendarId,
    getAllBookingByUserrId,
    puUpdateBooking
}