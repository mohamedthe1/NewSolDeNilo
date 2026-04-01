/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true, // 🔥 تعطيل Image Optimization لمنع 402 من Vercel

    domains: [
      "dxpbyrcbklqrjlytmkum.supabase.co", // دومين Supabase الأول
      "pqeliprhapbghcczgyru.supabase.co", // دومين Supabase الثاني
    ],
  },
};

export default nextConfig;
