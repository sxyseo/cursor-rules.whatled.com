/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // 服务端特性
    experimental: {
        serverActions: true,
    }
};

export default nextConfig;