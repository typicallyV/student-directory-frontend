 import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function LandingPage() {
  const [students, setStudents] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/api/students`);
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  }, [baseURL]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Student Profiles</h1>
      <div className="grid">
        {students.map((student) => (
          <div key={student._id} className="card">
            <img src={student.image} alt="Student" />
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.roll}</p>
            <p><strong>Class:</strong> {student.className}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <button className="delete" onClick={() => deleteStudent(student._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
