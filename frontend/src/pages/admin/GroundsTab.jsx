import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminTabs.css";

const GroundsTab = () => {
  const [grounds, setGrounds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: "",
    price_per_hour: "",
    facilities: "",
    image: null,
    existingImage: null, // to show current image
  });

  const fetchGrounds = async () => {
    try {
      const res = await API.get("/grounds");
      setGrounds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("location", form.location);
      formData.append("rating", form.rating || 0);
      formData.append("price_per_hour", form.price_per_hour);
      formData.append("facilities", form.facilities.split(",").map(f => f.trim()));
      if (form.image) formData.append("image", form.image);

      if (editId) {
        await API.put(`/grounds/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/grounds", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        name: "",
        location: "",
        rating: "",
        price_per_hour: "",
        facilities: "",
        image: null,
        existingImage: null,
      });
      setEditId(null);
      setModalOpen(false);
      fetchGrounds();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding/updating ground");
    }
  };

  const handleEdit = (g) => {
    setEditId(g.id);
    setForm({
      name: g.name,
      location: g.location,
      rating: g.rating,
      price_per_hour: g.price_per_hour,
      facilities: g.facilities?.join(", ") || "",
      image: null,
      existingImage: g.image, // store current image
    });
    setModalOpen(true);
  };

  const handleDeleteGround = async (id) => {
  if (!window.confirm("Are you sure you want to delete this ground?")) return;

  try {
    await API.delete(`/grounds/${id}`);
    alert("Ground deleted successfully!");
    fetchGrounds(); // Refresh table after deletion
  } catch (err) {
    alert(err.response?.data?.message || "Failed to delete ground");
  }
};

  return (
    <div className="tab-section">
      <h2>Grounds</h2>
      <button className="btn-add" onClick={() => setModalOpen(true)}>Add Ground</button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price/hr</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grounds.map((g) => (
            <tr key={g.id}>
              <td>{g.name}</td>
              <td>{g.location}</td>
              <td>NPR {g.price_per_hour}</td>
              <td>{g.rating}</td>
              <td>
                {g.image ? <img src={`http://localhost:5001${g.image}`} alt={g.name} width={80} /> : "No Image"}
              </td>
              <td>
  <button className="btn-edit" onClick={() => handleEdit(g)}>Edit</button>
  <button className="btn-cancel" onClick={() => handleDeleteGround(g.id)}>Delete</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal large-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editId ? "Edit Ground" : "Add Ground"}</h3>
            <form className="admin-form" onSubmit={handleSubmit}>
              <input name="name" placeholder="Ground Name" value={form.name} onChange={handleChange} required />
              <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
              <input
                type="number"
                name="rating"
                placeholder="Rating (e.g., 4.5)"
                value={form.rating}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price_per_hour"
                placeholder="Price per hour"
                value={form.price_per_hour}
                onChange={handleChange}
                required
              />
              <input
                name="facilities"
                placeholder="Facilities (comma-separated)"
                value={form.facilities}
                onChange={handleChange}
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
              {form.image && <p>Selected Image: {form.image.name}</p>}
              {!form.image && form.existingImage && (
                <p>Current Image: <img src={`http://localhost:5001${form.existingImage}`} alt="Current" width={80} /></p>
              )}
              <button type="submit">{editId ? "Update Ground" : "Add Ground"}</button>
            </form>
            <button className="btn-close" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroundsTab;