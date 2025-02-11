import { createRequire } from "module";
import { fileURLToPath } from "node:url";

const require = createRequire(fileURLToPath(import.meta.url));
const createJiti = require("jiti")();

createJiti("./src/validation/env.ts");
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
