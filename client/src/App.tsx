import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const apiUrl = import.meta.env.PROD
      ? "/api/hello" // Production URL (same domain)
      : "http://localhost:3001/api/hello"; // Development URL

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="container">
      <h1>Vercel Full Stack POC</h1>
      <div className="card">
        <p>Message from backend: {message || "Loading..."}</p>
      </div>
    </div>
  );
}

export default App;
