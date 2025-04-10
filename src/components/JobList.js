import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const API_BASE_URL = "http://localhost:8080/api";

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}/jobs`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleFilter = () => {
    let filtered = [...jobs];
    if (filterLocation) filtered = filtered.filter(job => job.location?.toLowerCase().includes(filterLocation.toLowerCase()));
    if (filterJobType) filtered = filtered.filter(job => job.type?.toLowerCase() === filterJobType.toLowerCase());
    if (minSalary) filtered = filtered.filter(job => job.salary >= Number(minSalary));
    if (maxSalary) filtered = filtered.filter(job => job.salary <= Number(maxSalary));
    setFilteredJobs(filtered);
  };

  const resetFilters = () => {
    setFilterLocation("");
    setFilterJobType("");
    setMinSalary("");
    setMaxSalary("");
    setFilteredJobs(jobs);
  };

  const handleApply = async (jobId) => {
    try {
      const token = getToken();
      if (!token) return alert("Please login to apply.");
      await axios.post(`${API_BASE_URL}/jobs/${jobId}/apply`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Job application submitted successfully!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response?.data?.message || "An error occurred while applying.");
    }
  };

  const handleHostJob = async () => {
    try {
      const token = getToken();
      if (!token) return alert("Please login to host a job.");
      if (!title || !company || !location || !jobType || !applyLink) return alert("All fields are required.");

      await axios.post(
        `${API_BASE_URL}/jobs/host`,
        { title, company, location, type: jobType, salary, applyLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job hosted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error hosting job:", error);
      alert(error.response?.data?.message || "An error occurred while hosting the job.");
    }
  };

  return (
    <div className="job-list-container">
      <div className="sidebar">
        <h3>Filters</h3>
        <input type="text" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} placeholder="Search by location" />
        <select value={filterJobType} onChange={(e) => setFilterJobType(e.target.value)}>
          <option value="">All</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
        </select>
        <input type="number" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} placeholder="Min Salary" />
        <input type="number" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} placeholder="Max Salary" />
        <div className="btns">
          <button onClick={handleFilter}>Apply Filters</button>
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>

      {localStorage.getItem("role") === "RECRUITER" && (
        <div className="job-hosting">
          <h3>Host a Job</h3>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input type="text" placeholder="Job Type" value={jobType} onChange={(e) => setJobType(e.target.value)} />
          <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
          <input type="text" placeholder="Apply Link" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} />
          <button onClick={handleHostJob}>Host Job</button>
        </div>
      )}

      <div className="job-list">
        <h2>Job Listings</h2>
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <p>💼 Salary: Rs.{job.salary}</p>
            {job.applyLink && <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Here</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
