"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = async (inputPath, outputPath, width, height) => {
  await (0, sharp_1.default)(inputPath)
    .resize(width, height)
    .jpeg()
    .toFile(outputPath);
};
exports.resizeImage = resizeImage;
//# sourceMappingURL=resize.js.map
