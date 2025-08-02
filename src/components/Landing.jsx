 import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LandingPage() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/api/students');
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
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
