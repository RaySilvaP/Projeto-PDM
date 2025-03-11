import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// CONFIGURAÇÃO PARA API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
//TRATAMENTO DE ERRO
api.interceptors.response.use((response) => response, (error) => {
  console.error('Erro na requisição:', error);
  return Promise.reject(error);
});

export default api;
