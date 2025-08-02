 import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getStudents = async () => {
  const res = await axios.get(`${API_BASE}/students`);
  return res.data;
};

export const addStudent = async (student) => {
  const res = await axios.post(`${API_BASE}/students`, student);
  return res.data;
};
