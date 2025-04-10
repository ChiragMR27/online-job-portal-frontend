import React, { useState } from 'react';
import { createJob, deleteJob } from '../services/api';

const Dashboard = () => {
  const [job, setJob] = useState({ title: '', company: '' });

  const handleCreateJob = async (e) => {
    e.preventDefault();
    await createJob(job);
    alert('Job created!');
  };

  const handleDeleteJob = async (id) => {
    await deleteJob(id);
    alert('Job deleted!');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleCreateJob}>
        <input
          type="text"
          placeholder="Job Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default Dashboard;
