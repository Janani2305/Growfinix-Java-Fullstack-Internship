import { useState, useEffect } from 'react';
import axios from 'axios';
import './EnquiryDashboard.css';

const API_URL = 'http://localhost:8080/api/enquiries';

function EnquiryDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [form, setForm] = useState({
    customerName: '', email: '', phone: '', destination: '', message: '', status: 'New'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const response = await axios.get(API_URL);
    setEnquiries(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ customerName: '', email: '', phone: '', destination: '', message: '', status: 'New' });
    fetchEnquiries();
  };

  const handleEdit = (enquiry) => {
    setForm(enquiry);
    setEditingId(enquiry.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEnquiries();
  };

  return (
    <div className="dashboard-container">
      <h2>Tour Enquiry Management</h2>

      <form className="enquiry-form" onSubmit={handleSubmit}>
        <input name="customerName" placeholder="Customer Name" value={form.customerName} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} />
        <input name="message" placeholder="Message" value={form.message} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'} Enquiry</button>
      </form>

      <table className="enquiry-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Destination</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enq) => (
            <tr key={enq.id}>
              <td data-label="Name">{enq.customerName}</td>
              <td data-label="Email">{enq.email}</td>
              <td data-label="Phone">{enq.phone}</td>
              <td data-label="Destination">{enq.destination}</td>
              <td data-label="Status">
                <span className={`status-badge status-${enq.status?.toLowerCase()}`}>{enq.status}</span>
              </td>
              <td data-label="Actions" className="actions-cell">
                <button className="edit-btn" onClick={() => handleEdit(enq)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(enq.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnquiryDashboard;