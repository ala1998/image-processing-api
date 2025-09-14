"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resize_1 = require("../utils/resize");
const imageProcessingRouter = express_1.default.Router();
const originalImages = path_1.default.resolve(
  __dirname,
  "../../assets/original",
);
const processedImages = path_1.default.resolve(
  __dirname,
  "../../assets/processed",
);
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
    const inputPath = path_1.default.join(originalImages, `${filename}.jpg`);
    if (!fs_1.default.existsSync(inputPath)) {
      return res.status(404).json({ error: "Non-existent image file!" });
    }
    if (!fs_1.default.existsSync(processedImages)) {
      fs_1.default.mkdirSync(processedImages, { recursive: true });
    }
    const outputPath = path_1.default.join(
      processedImages,
      `${filename}_${width}x${height}.jpg`,
    );
    if (!fs_1.default.existsSync(outputPath)) {
      await (0, resize_1.resizeImage)(inputPath, outputPath, width, height);
    }
    return res.status(200).sendFile(outputPath);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
exports.default = imageProcessingRouter;
//# sourceMappingURL=image_processing.js.map
