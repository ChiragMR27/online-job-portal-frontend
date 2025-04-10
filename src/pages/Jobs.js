import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/jobs")
      .then(response => {
        console.log("Fetched jobs:", response.data);  // Debugging: Log fetched data
        setJobs(response.data);
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div>
      <h1>Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <Link to={`/jobs/${job.id}`}>
                {job.title} - {job.company} - <strong>Rs:{job.salary}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Jobs;
