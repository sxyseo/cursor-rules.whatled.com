import { next } from '@cloudflare/next';

// 配置 Next.js 运行时选项
const nextConfig = {
    experimental: {
        serverActions: true, // 启用服务端操作
    },
    images: {
        unoptimized: false, // 启用图片优化
        domains: [], // 添加你需要的图片域名
    },
};

// 创建中间件处理程序
const middleware = [
    // 添加自定义响应头
    async({ request, next: nextHandler }) => {
        const response = await nextHandler();
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        return response;
    },
];

// 导出 Cloudflare Worker 处理函数
export default next({
    config: nextConfig,
    middleware,
    // 可选：配置缓存策略
    cacheControl: {
        // 静态资源缓存时间
        browserTTL: 60 * 60 * 24, // 1 天
        edgeTTL: 60 * 60 * 24 * 365, // 1 年
        // API 路由缓存时间
        apiTTL: 60 * 5, // 5 分钟
    },
});