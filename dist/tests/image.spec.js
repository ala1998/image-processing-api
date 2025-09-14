"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const exampleImage = "santamonica";
describe("GET /api/images", () => {
  it("Successfully resized image with status 200", async () => {
    const res = await request
      .get("/api/process_image")
      .query({ filename: exampleImage, width: 150, height: 150 })
      .expect(200);
    expect(res.headers["content-type"]).toMatch(/image\/jpg/);
  });
  it("Returns 404 due to Non-existent image file", async () => {
    await request
      .get("/api/process_image")
      .query({ filename: "jenin", width: 150, height: 150 })
      .expect(404);
  });
});
//# sourceMappingURL=image.spec.js.map
