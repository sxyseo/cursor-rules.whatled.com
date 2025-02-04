/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // 禁用服务端特性
    experimental: {
        serverActions: false,
    }
};

export default nextConfig;