 import { useState } from 'react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    className: '',
    phone: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add student");

      alert("Student added successfully!");
      setFormData({ name: '', roll: '', className: '', phone: '', image: '' });
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Error adding student!");
    }
  };

  return (
    <div className="container">
      <h1 className="header">Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="roll" placeholder="Roll Number" value={formData.roll} onChange={handleChange} />
        <input name="className" placeholder="Class" value={formData.className} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
