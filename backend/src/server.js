import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
// app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );
