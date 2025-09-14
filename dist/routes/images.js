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
const imagesRouter = express_1.default.Router();
const originalDir = path_1.default.resolve(__dirname, "../../assets/original");
const processedDir = path_1.default.resolve(
  __dirname,
  "../../assets/processed",
);
imagesRouter.get("/", async (req, res) => {
  try {
    const filenameRaw = String(req.query.filename || "");
    const widthRaw = String(req.query.width || "");
    const heightRaw = String(req.query.height || "");
    if (!filenameRaw)
      return res.status(400).json({ error: "filename is required" });
    // sanitize filename (allow letters, numbers, -, _)
    const safeName = path_1.default
      .basename(filenameRaw)
      .replace(/[^a-zA-Z0-9-_]/g, "");
    if (!safeName) return res.status(400).json({ error: "invalid filename" });
    const width = parseInt(widthRaw, 10);
    const height = parseInt(heightRaw, 10);
    if (
      Number.isNaN(width) ||
      Number.isNaN(height) ||
      width <= 0 ||
      height <= 0
    ) {
      return res
        .status(400)
        .json({ error: "width and height must be positive integers" });
    }
    const inputPath = path_1.default.join(originalDir, `${safeName}.jpg`);
    if (!fs_1.default.existsSync(inputPath)) {
      return res.status(404).json({ error: "source image not found" });
    }
    const outputName = `${safeName}_${width}x${height}.jpg`;
    const outputPath = path_1.default.join(processedDir, outputName);
    // if cached, send immediately
    if (fs_1.default.existsSync(outputPath)) {
      return res.sendFile(outputPath);
    }
    // ensure thumb dir exists
    if (!fs_1.default.existsSync(processedDir))
      fs_1.default.mkdirSync(processedDir, { recursive: true });
    // resize (async)
    await (0, resize_1.resizeImage)(inputPath, outputPath, width, height);
    return res.sendFile(outputPath);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
});
exports.default = imagesRouter;
//# sourceMappingURL=images.js.map
