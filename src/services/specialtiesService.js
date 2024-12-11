import axios from "../utils/axiosCustomize";

const getServices = () => {
  return axios.get(`api/Service/get-all`);
};

const getServiceById = (serviceId) => {
  return axios.get(`/api/Service/get/${serviceId}`);
};

const postCreateService = (name, description, price, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("price", price);
  data.append("image", image);
  return axios.post(`/api/Service/create`, data);
};

const putUpdateService = (serviceId, name, description, price, image, is_Deleted) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("price", price);
  data.append("image", image);
  data.append("is_Deleted", is_Deleted);
  return axios.put(`/api/Service/${serviceId}/update`, data);
};


const getSpecialties = () => {
  return axios.get(`/api/Specialist/get-all`);
};

const getSpecialtyById = (specialist_Id) => {
  return axios.get(`/api/Specialist/get/${specialist_Id}`);
}

const postCreateSpecialties = (name, description, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("image", image);
  data.append("service_Specialists", null);
  return axios.post("/api/Specialist/create", data);
};

const putUpdateSpecialties = (specialist_Id, name, description, image, is_Active) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("image", image);
  data.append("is_Active", is_Active);
  return axios.put(`/api/Specialist/${specialist_Id}/update`, data);
};

const AssignServices = (specialist_Id, data) => {
  return axios.post(`/api/Specialist/update-services-specialist/${specialist_Id}`, data);
}

const postUpdateAssignServices = (specialistId, serviceID) => {
  const data = new FormData();
  data.append("serviceID", serviceID);
  data.append("specialistId", specialistId);
  data.append("isDelete", true);
  return axios.post(`/api/ServiceSpecialist/update-status-service-specialist`, data);
}




export {
  getServices,
  postCreateService,
  putUpdateService,
  getSpecialties,
  postCreateSpecialties,
  putUpdateSpecialties,
  AssignServices,
  getSpecialtyById,
  postUpdateAssignServices,
  getServiceById
};
