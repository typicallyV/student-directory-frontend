 import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [className, setClassName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !roll || !className || !phone || !image) {
      alert('Please fill all fields');
      return;
    }
    const newStudent = { name, roll, className, phone, image };
    const baseURL = import.meta.env.VITE_API_URL;
await axios.post(`${baseURL}/api/students`, newStudent);

    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="header">Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Roll Number" value={roll} onChange={(e) => setRoll(e.target.value)} />
        <input placeholder="Class" value={className} onChange={(e) => setClassName(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}