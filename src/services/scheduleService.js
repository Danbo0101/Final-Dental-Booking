import axios from "../utils/axiosCustomize";


const getListDoctorSchedule = (doctorId, date) => {
    return axios.get(`/api/Calendar/get-calendar-by-doctor/${doctorId}?date=${date}`);
}

const getTimeDoctorSchedule = (doctorId, date) => {
    return axios.get(`/api/Calendar/get-time-list-by-doctor/${doctorId}?date=${date}`);
}

const postCreateListDoctorSchedule = (doctorId, data) => {
    return axios.post(`/api/Calendar/create-list-calendar-by-doctor-id/${doctorId}`, data);
}

const getDoctorScheduleBooking = (date, doctorId) => {
    return axios.get(`/v1/api/schedules-booking?date=${date}&doctorId=${doctorId}`);
}



const putUpdateDoctorSchedule = (id, statusId, maxNumber) => {
    const data = new FormData();
    data.append('statusId', statusId);
    data.append('maxNumber', maxNumber);
    return axios.put(`/v1/api/schedules?scheduleId=${id}`, data);
}

const getDoctorScheduleDetail = (id) => {
    return axios.get(`/v1/api/schedules-detail?scheduleId=${id}`);
}

const getTimeType = () => {
    return axios.get(`/api/Calendar/get-all-defaul-time`);
}

const postCreateDoctorSchedule = (doctoId, timeTypeId, date, maxNumber, bookedNumber) => {
    return axios.post(`/ v1 / api / schedules ? doctorId = ${doctoId}`, {
        timeTypeId,
        date,
        maxNumber,
        bookedNumber
    });
}


export {
    getListDoctorSchedule,
    putUpdateDoctorSchedule,
    getDoctorScheduleDetail,
    getTimeType,
    postCreateDoctorSchedule,
    getDoctorScheduleBooking,
    postCreateListDoctorSchedule,
    getTimeDoctorSchedule
}