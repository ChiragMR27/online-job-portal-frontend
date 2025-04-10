import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApplyJob = () => {
  const { id } = useParams(); // Get job ID from URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/applications", {
        jobId: id,
        ...formData,
      });
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Resume Link:</label>
        <input type="text" name="resume" value={formData.resume} onChange={handleChange} required />

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
