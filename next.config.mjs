/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        serverActions: true,
    },
    // 添加 webpack 配置来优化构建输出
    webpack: (config, { isServer }) => {
        // 启用文件压缩
        config.optimization.minimize = true;

        // 分割代码块
        config.optimization.splitChunks = {
            chunks: 'all',
            maxInitialRequests: 25,
            minSize: 20000,
            maxSize: 24000000, // 24MB，略小于 25MB 限制
            cacheGroups: {
                default: false,
                vendors: false,
                // 库代码分割
                lib: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `${cacheGroupKey}.${packageName.replace('@', '')}`;
                    },
                    priority: 30,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
                // 共享组件分割
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    priority: 20,
                },
            },
        };

        return config;
    },
};

export default nextConfig;