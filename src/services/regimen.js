import axios from "../utils/axiosCustomize";

const getRegimenByUserId = (userId) => {
    return axios.get(`/api/Regimen/get-regimen-by-userId?userId=${userId}`)
}


const postUpdateRegimen = (regimenId, data) => {
    return axios.post(`/api/Regimen/update-range-regimen-service?regimenId=${regimenId}`, data)
}

export {
    getRegimenByUserId,
    postUpdateRegimen
}