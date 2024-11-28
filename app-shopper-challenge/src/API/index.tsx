import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      Swal.fire({
        icon: 'error',
        title: 'Erro na solicitação',
        text: error.response.data?.error_description || 'Ocorreu um erro inesperado.',
      });
      console.error('Erro de resposta:', error.response.data);
    } else if (error.request) {
      Swal.fire({
        icon: 'error',
        title: 'Erro na Conexão',
        text: 'Não foi possível conectar ao servidor. Verifique sua internet.',
      });
      console.error('Erro na requisição:', error.request);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro Desconhecido',
        text: error.message,
      });
      console.error('Erro desconhecido:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
