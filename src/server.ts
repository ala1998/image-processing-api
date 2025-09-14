import express, { Application } from "express";
import imageProcessingRouter from "./routes/image-processing";

const app: Application = express();

app.use(express.json());

app.use("/api/process-image", imageProcessingRouter);

app.get("/", (req, res) => {
  res.status(200).send("Image Processing API is running successfully!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Invalid End-point" });
});

export default app;
