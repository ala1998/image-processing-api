import express, { Router } from "express";
import path from "path";
import fs from "fs";
import { resizeImage } from "../utils/resize";

const imageProcessingRouter: Router = express.Router();

const originalImages = path.resolve(__dirname, "../../assets/original");
const processedImages = path.resolve(__dirname, "../../assets/processed");

imageProcessingRouter.get("/", async (req, res) => {
  try {
    const filename = String(req.query.filename || "");
    const width = parseInt(String(req.query.width || ""));
    const height = parseInt(String(req.query.height || ""));

    if (!filename)
      return res.status(400).json({ error: "File name is required!" });

    if (
      !Number.isInteger(width) ||
      !Number.isInteger(height) ||
      width <= 0 ||
      height <= 0
    ) {
      return res
        .status(400)
        .json({ error: "Width & Height must be only positive numbers!" });
    }

    const input = path.join(originalImages, `${filename}.jpg`);
    if (!fs.existsSync(input)) {
      return res.status(404).json({ error: "Non-existent image file!" });
    }

    if (!fs.existsSync(processedImages)) {
      fs.mkdirSync(processedImages, { recursive: true });
    }
    const output = path.join(
      processedImages,
      `${filename}_${width}x${height}.jpg`,
    );

    if (!fs.existsSync(output)) {
      await resizeImage(input, output, width, height);
    }
    return res.status(200).sendFile(output);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default imageProcessingRouter;
