import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable CORS in development only
if (process.env.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(cors());
  console.log("CORS enabled in development mode");
}

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// For Vercel serverless deployment
export default app;
