import axios from 'axios';

import { store } from '../redux/store';

const baseUrl = process.env['NX_SCHEMA_PATH'];

const AUTH_API = axios.create({ baseURL: baseUrl });

AUTH_API.interceptors.request.use((req) => {
  req.headers.slug = 'myra-prod';
  return req;
});

export const setAuth = async (data: { username: string; password: string }) => {
  const res = await AUTH_API.post(`${baseUrl}/login`, data);
  return res;
};

const API = axios.create({ baseURL: baseUrl });

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${store.getState().auth.token}`;
  req.headers.slug = 'myra-prod';
  return req;
});

export const getProjectList = async () => {
  const { data } = await API.get(`${baseUrl}/all_projects`);
  return data;
};

export const createProject = async (data: { project_name: string }) => {
  const res = await API.post(`${baseUrl}/create_project`, data);
  return res;
};

export const uploadExcel = async (data: { project_name: string; excel_file: string | Blob }) => {
  const res = await API.post(`${baseUrl}/upload_excel`, data);
  return res;
};

export const validateExcel = async (data: { project_name: string }) => {
  const res = await API.post(`${baseUrl}/validate_excel`, data);
  return res;
};

export const migrateExcel = (data: { project_name: string }) => {
  const res = API({
    url: `${baseUrl}/migrate_data`,
    method: 'POST',
    responseType: 'blob',
    data,
  });
  return res;
};

export const getProjectStatus = async ({ project_name }: { project_name: string }) => {
  const res = await API.get(`${baseUrl}/project_status?project_name=${project_name}`);
  return res;
};
