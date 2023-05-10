import axios from 'axios';

const baseUrl = process.env['NX_SCHEMA_PATH'];

export const getProjectList = async () => {
  const { data } = await axios.get(`${baseUrl}/all_projects`);
  return data;
};

export const createProject = async (data: { project_name: string }) => {
  const res = await axios.post(`${baseUrl}/create_project`, data);
  return res;
};

export const uploadExcel = async (data: { project_name: string; excel_file: string | Blob }) => {
  const res = await axios.post(`${baseUrl}/upload_excel`, data);
  return res;
};

export const validateExcel = async (data: { project_name: string }) => {
  const res = await axios.post(`${baseUrl}/validate_excel`, data);
  return res;
};

export const migrateExcel = (data: { project_name: string }) => {
  const res = axios({
    url: `${baseUrl}/migrate_data`,
    method: 'POST',
    responseType: 'blob',
    data,
  });
  return res;
};

export const getProjectStatus = async ({ project_name }: { project_name: string }) => {
  const res = await axios.get(`${baseUrl}/project_status?project_name=${project_name}`);
  return res;
};
