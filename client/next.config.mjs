/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgs.search.brave.com'],
  },
  env: {
    OCR_API_KEY: "K83747338588957",
    CLOUDINARY_PRESET_KEY: "yykpflgd",
    CLOUDINARY_CLOUD_NAME: "ds8bolg2f",
    PARAPHRASE_API: "https://inkquill.onrender.com/api/paraphrase",
    SUMMARIZE_API: "https://inkquill.onrender.com/api/summarize",
    OCR_API: "https://api.ocr.space/parse/image"
  },
};

export default nextConfig;
