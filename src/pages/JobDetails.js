import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/jobs/${id}`)
      .then(response => {
        setJob(response.data);
      })
      .catch(error => {
        console.error("Error fetching job details:", error);
      });
  }, [id]);

  if (!job) return <h2>Loading...</h2>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Salary:</strong> ₹{job.salary}</p>

      {/* Single Apply Now Button linking externally */}
      {job.applyLink ? (
        <div className="mt-6">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Apply Now
            </button>
          </a>
        </div>
      ) : (
        <p className="mt-6 text-red-500 font-medium">No apply link available for this job.</p>
      )}
    </div>
  );
};

export default JobDetails;
