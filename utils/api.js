import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const get = async (resource, data) => {
  const response = await api.get(
    resource,
    data
      ? {
          params: { q: data },
        }
      : null
  );
  return response.data;
};

export const createRecord = async (resource, params) => {
  const response = await api.post(`${resource}`, params);
  return response.data;
};

export const updateRecord = async (resource, params) => {
  const response = await api.put(`${resource}`, params);
  return response.data;
};

export const deleteRecord = async (resource) => {
  const response = await api.delete(`${resource}`);
  return response.data;
};
