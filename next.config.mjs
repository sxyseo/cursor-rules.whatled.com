import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: true, // 只在需要分析时设置为 true
});

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
            maxSize: 6000000, // 降低到 6MB
            cacheGroups: {
                default: false,
                vendors: false,
                // 库代码分割
                lib: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        // 添加安全检查
                        if (!module.context) {
                            return `${cacheGroupKey}.unknown`;
                        }
                        const matches = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        );
                        const packageName = matches ? matches[1] : 'unknown';
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
                // 样式分割
                styles: {
                    name: 'styles',
                    test: /\.(css|scss|sass)$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 40,
                },
                // React 相关库分割
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                    priority: 50,
                },
                // UI 组件库分割
                ui: {
                    test: /[\\/]node_modules[\\/](@radix-ui|@floating-ui|lucide-react)[\\/]/,
                    name: 'ui',
                    chunks: 'all',
                    priority: 45,
                },
            },
        };

        // 添加额外的优化
        if (!isServer) {
            // 移除不必要的 moment.js 语言包
            config.resolve.alias = {
                ...config.resolve.alias,
                moment$: 'moment/moment.js',
            };
        }

        // 启用模块连接
        config.optimization.concatenateModules = true;

        // 启用作用域提升
        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;

        return config;
    },
    // 添加输出配置
    poweredByHeader: false,
    compress: true,
};

export default withBundleAnalyzer(nextConfig);