/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["img.clerk.com", "gzuhescriqzrazgvorsc.supabase.co", process.env.SUPABASE_DOMAIN],
  },
};

export default nextConfig;
