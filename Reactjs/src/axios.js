import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080/api', // Đọc từ biến môi trường
});

export default instance; // Export mặc định
