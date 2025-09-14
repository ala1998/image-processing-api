"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// Unit Testing
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resize_1 = require("../utils/resize");
describe("Resize Functionality", () => {
  const input = path_1.default.resolve(
    __dirname,
    "../../assets/original/santamonica.jpg",
  );
  const output = path_1.default.resolve(
    __dirname,
    "../../assets/processed/santamonica_150x150.jpg",
  );
  afterAll(() => {
    if (fs_1.default.existsSync(output)) fs_1.default.unlinkSync(output); // To remove the file
  });
  it("should create a resized image", async () => {
    const dir = path_1.default.dirname(output);
    if (!fs_1.default.existsSync(dir)) {
      fs_1.default.mkdirSync(path_1.default.dirname(output), {
        recursive: true,
      });
    }
    await (0, resize_1.resizeImage)(input, output, 150, 150);
    expect(fs_1.default.existsSync(output)).toBe(true);
  });
});
//# sourceMappingURL=resize.spec.js.map
