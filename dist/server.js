"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_processing_1 = __importDefault(
  require("./routes/image-processing"),
);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/process-image", image_processing_1.default);
app.get("/", (req, res) => {
  res.status(200).send("Image Processing API is running successfully!");
});
app.use((req, res) => {
  res.status(404).json({ error: "Invalid End-point" });
});
exports.default = app;
//# sourceMappingURL=server.js.map
