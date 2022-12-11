import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.PRESENTATION;

const presentationApi = {
  checkPresentationCode: (code) => {
    return axiosClient.get(`${endpoint}/check-code`, { params: { code } });
  },
  deletePresentation: (id) => {
    return axiosClient.delete(`${endpoint}/${id}`);
  },
  postCreateNewTicket: (form) => {
    return axiosClient.post(`${endpoint}/new`, form);
  },
  putUpdatePresentation: (query, fields) => {
    return axiosClient.put(`${endpoint}/update`, { query, fields });
  }
};

export default presentationApi;
