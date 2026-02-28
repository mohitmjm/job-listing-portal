import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("https://job-listing-portal-0qq0.onrender.com/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>🚀 Job Listing Portal</h1>

      <h2>Available Jobs</h2>

      {jobs.map((job, index) => (
        <div key={index}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;