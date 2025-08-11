import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

export const getOutlookAuthUrl = () => {
  if(import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL + '/microsoft/auth/outlook';
  }
  return '/api/microsoft/auth/outlook';
};

export const checkOutlookAuthStatus = async () => {
  const { data } = await api.get('/microsoft/status');
  return data;
};

export const getClientRequest = async () => {
  const { data } = await api.get('/client-request');
  return data;
};

export const draftEmail = async (formData) => {
  const { data } = await api.post('/microsoft/draft-email', formData);
  return data;
};

export const sendEmail = async (emailData) => {
  const { data } = await api.post('/microsoft/send-email', emailData);
  return data;
}; 

export const chatWithGemini = async (prompt) => {
  const { data } = await api.post('/gemini/chat', { prompt });
  return data;
};

export const getOneDriveFiles = async () => {
  const { data } = await api.get('/microsoft/onedrive/files');
  return data;
};

export const getOneDriveFileById = async (id) => {
  const { data } = await api.get(`/microsoft/onedrive/files/${id}`);
  return data;
};

export const getOneDriveFileContent = async (id) => {
  const { data } = await api.get(`/microsoft/onedrive/files/${id}/content`);
  return data;
};
