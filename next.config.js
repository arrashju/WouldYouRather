/** @type {import('next').NextConfig} */

module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ["image/webp"],
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
