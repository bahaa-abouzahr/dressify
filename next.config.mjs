/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['ounyoarjnuaqqyrtwkuh.supabase.co', 'lh3.googleusercontent.com'],
    },
    experimental: {
      serverActions: { bodySizeLimit: "5mb" },
    },

};

export default nextConfig;
