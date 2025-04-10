import React, { useState, useEffect } from "react";
import axios from "axios";

const RecruiterDashboard = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    applyLink: "",
    description: "",
    experience: "",
    criteria: ""
  });

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/jobs/host",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job posted successfully!");
      setJobs([...jobs, response.data]); // Add the created job from response
      setJobData({
        title: "",
        company: "",
        location: "",
        jobType: "",
        salary: "",
        applyLink: "",
        description: "",
        experience: "",
        criteria: ""
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please check your authorization.");
    }
  };

  return (
    <div className="recruiter-dashboard">
      <h2>Recruiter Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" value={jobData.title} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company" value={jobData.company} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={jobData.location} onChange={handleChange} required />
        <input type="text" name="jobType" placeholder="Job Type" value={jobData.jobType} onChange={handleChange} required />
        <input type="text" name="salary" placeholder="Salary" value={jobData.salary} onChange={handleChange} required />
        <input type="text" name="applyLink" placeholder="Apply Link" value={jobData.applyLink} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={jobData.description} onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Experience (e.g. 2 years)" value={jobData.experience} onChange={handleChange} required />
        <input type="text" name="criteria" placeholder="Minimum Criteria (e.g. B.Tech, 60%)" value={jobData.criteria} onChange={handleChange} />
        <button type="submit">Host Job</button>
      </form>

      <h3>Hosted Jobs</h3>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <strong>{job.title}</strong> at {job.company} – {job.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;
