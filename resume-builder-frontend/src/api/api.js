import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as per your backend setup

// User API calls
export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (userData) => axios.post(`${API_URL}/users`, userData);
export const updateUser = (userId, userData) => axios.put(`${API_URL}/users/${userId}`, userData);
export const deleteUser = (userId) => axios.delete(`${API_URL}/users/${userId}`);

// Resume API calls
export const getResumes = () => axios.get(`${API_URL}/resumes`);
export const getResumeById = (resumeId) => axios.get(`${API_URL}/resumes/${resumeId}`);
export const createResume = (resumeData) => axios.post(`${API_URL}/resumes`, resumeData);
export const updateResume = (resumeId, resumeData) => axios.put(`${API_URL}/resumes/${resumeId}`, resumeData);
export const deleteResume = (resumeId) => axios.delete(`${API_URL}/resumes/${resumeId}`);
