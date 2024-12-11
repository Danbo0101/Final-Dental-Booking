import axios from "../utils/axiosCustomize";


const getAllDoctor = () => {
  return axios.get(`/v1/api/doctors`);
};

const getAllDoctorNotMarkToday = () => {
  return axios.get(`/v1/api/mark-attendance`);
};

const getDoctorInfoDetail = (id) => {
  return axios.get(`/v1/api/doctor-clinic-specialties?doctorId=${id}`);
};

const postCreateNewDoctor = (
  fullName,
  email,
  userName,
  password,
  birthday,
  gender,
  phone,
  iD_Number,
  role_Id,
  image,
  specialist_Id
) => {
  console.log(fullName,
    email,
    userName,
    password,
    birthday,
    gender,
    phone,
    iD_Number,
    role_Id,
    image,
    specialist_Id)
  const data = new FormData();
  data.append("fullName", fullName);
  data.append("email", email);
  data.append("username", userName);
  data.append("password", password);
  data.append("birthday", birthday);
  data.append("gender", gender);
  data.append("phone", phone);
  data.append("iD_Number", iD_Number);
  data.append("role_Id", role_Id);
  data.append("image", image);
  data.append("specialist_Id", specialist_Id);
  return axios.post("/api/User/create", data);
};

const putUpdateDoctor = (
  userId,
  fullName,
  email,
  userName,
  password,
  birthday,
  gender,
  phone,
  iD_Number,
  role_Id,
  image,
  specialist_Id,
  Is_Active
) => {
  const data = new FormData();
  data.append("fullName", fullName);
  data.append("email", email);
  data.append("username", userName);
  data.append("password", password);
  data.append("birthday", birthday);
  data.append("gender", gender);
  data.append("phone", phone);
  data.append("iD_Number", iD_Number);
  data.append("role_Id", role_Id);
  data.append("image", image);
  data.append("specialist_Id", specialist_Id);
  data.append("Is_Active", Is_Active);
  return axios.put(`api/User/${userId}/update`, data);
};

const postAssignDoctor = (doctorId, clinicId, specialtiesId) => {
  const data = new FormData();
  data.append("doctorId", doctorId);
  data.append("clinicId", clinicId);
  data.append("specialtiesId", specialtiesId);
  return axios.post("/v1/api/assign-doctor", data);
};

const getSpecialtiesDoctor = (specialistId, roleId) => {
  return axios.get(`/api/User/get-users-by-specialist-and-role?specialistId=${specialistId}&roleId=${roleId}`);
}

const getListDoctorSerrvice = (serviceId) => {
  return axios.get(`/api/User/get-by-serviceId?serviceId=${serviceId}`);
}



const deleteDoctor = (id) => {
  return axios.delete(`/v1/api/doctors?id=${id}`);
};

const getAssignDoctor = (id) => {
  return axios.get(`/v1/api/assign-doctor?doctorId=${id}`);
};

const putUpdateAssignDoctor = (id, clinicId, specialtiesId) => {
  const data = new FormData();
  data.append("clinicId", clinicId);
  data.append("specialtiesId", specialtiesId);
  return axios.put(`/v1/api/assign-doctor?doctorId=${id}`, data);
};

export {
  getAllDoctor,
  postCreateNewDoctor,
  getDoctorInfoDetail,
  postAssignDoctor,
  deleteDoctor,
  putUpdateDoctor,
  getAssignDoctor,
  putUpdateAssignDoctor,
  getAllDoctorNotMarkToday,
  getSpecialtiesDoctor,
  getListDoctorSerrvice,

};
