import api from '../axios';

const API_URL = '/timesheets';

const getEmployeeTimesheets = async (month, year) => {
  const response = await api.get(API_URL, { 
    params: { month, year } 
  });
  return response.data;
};

const createTimesheet = async (timesheetData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const response = await api.post(API_URL, timesheetData, config);
  return response.data;
};

const getTimesheetById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

const getAllTimesheets = async (month, year) => {
  const response = await api.get(`${API_URL}/all`, {
    params: { month, year }
  });
  return response.data;
};

const updateTimesheetStatus = async (id, updateData) => {
  const response = await api.put(`${API_URL}/${id}/status`, updateData);
  return response.data;
};

export default {
  getEmployeeTimesheets,
  createTimesheet,
  getTimesheetById,
  getAllTimesheets,
  updateTimesheetStatus
};