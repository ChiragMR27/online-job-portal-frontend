import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs"; // Your Spring Boot API URL

export const fetchJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
