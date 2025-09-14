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
describe("resize utility", () => {
  const input = path_1.default.resolve(
    __dirname,
    "../../assets/original/fjord.jpg",
  );
  const output = path_1.default.resolve(
    __dirname,
    "../../assets/processed/test_fjord_100x100.jpg",
  );
  afterAll(() => {
    if (fs_1.default.existsSync(output)) fs_1.default.unlinkSync(output);
  });
  it("creates a resized file", async () => {
    if (!fs_1.default.existsSync(path_1.default.dirname(output)))
      fs_1.default.mkdirSync(path_1.default.dirname(output), {
        recursive: true,
      });
    await (0, resize_1.resizeImage)(input, output, 100, 100);
    expect(fs_1.default.existsSync(output)).toBeTrue();
  });
});
//# sourceMappingURL=resizing.spec.js.map
