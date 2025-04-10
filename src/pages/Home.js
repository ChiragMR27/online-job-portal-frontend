import React, { useEffect, useState } from 'react';
import { fetchJobs, applyJob } from '../services/api';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const response = await fetchJobs();
    setJobs(response.data);
  };

  const handleApply = async (jobId) => {
    await applyJob(jobId);
    alert('Application submitted!');
  };

  return (
    <div>
      <h1>Available Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong> - {job.company}
            <button onClick={() => handleApply(job.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
