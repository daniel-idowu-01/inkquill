/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["imgs.search.brave.com", "encrypted-tbn0.gstatic.com"],
  },
  env: {
    OCR_API_KEY: process.env.OCR_API_KEY,
    OCR_API: process.env.OCR_API,
    CLOUDINARY_PRESET_KEY: process.env.CLOUDINARY_PRESET_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    PARAPHRASE_API: process.env.PARAPHRASE_API,
    SUMMARIZE_API: process.env.SUMMARIZE_API,
  },
};

export default nextConfig;
