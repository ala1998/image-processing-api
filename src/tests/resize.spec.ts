// Unit Testing
import fs from "fs";
import path from "path";
import { resizeImage } from "../utils/resize";

describe("Resize Functionality", () => {
  const input = path.resolve(
    __dirname,
    "../../assets/original/santamonica.jpg",
  );
  const output = path.resolve(
    __dirname,
    "../../assets/processed/santamonica_150x150.jpg",
  );

  afterAll(() => {
    if (fs.existsSync(output)) fs.unlinkSync(output); // To remove the file
  });

  it("should create a resized image", async () => {
    const dir = path.dirname(output);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(path.dirname(output), { recursive: true });
    }
    await resizeImage(input, output, 150, 150);
    expect(fs.existsSync(output)).toBe(true);
  });
});
