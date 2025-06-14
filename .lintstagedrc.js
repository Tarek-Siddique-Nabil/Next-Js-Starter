const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => JSON.stringify(path.relative(process.cwd(), f)))
    .join(" --file ")}`;

const prettierCommand = "prettier --write";

module.exports = {
  "*.{js,jsx,ts,tsx}": [prettierCommand, buildEslintCommand],
  "*.{json,css,md}": [prettierCommand],
};
