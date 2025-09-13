export default {
  spec_dir: "src/tests",
  spec_files: [
    "**/*[sS]pec.ts"], // To deal with tests as typescript files
  helpers: [
    "helpers/**/*.?(m)js"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true
  }
}
