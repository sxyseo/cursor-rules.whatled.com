import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: false, // 禁用分析器以减小构建大小
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        serverActions: false, // 禁用服务器操作
    },
    webpack: (config, { isServer }) => {
        // 禁用持久化缓存
        config.cache = false;

        config.optimization = {
            ...config.optimization,
            minimize: true,
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: 25,
                minSize: 20000,
                maxSize: 1000000, // 1MB
                cacheGroups: {
                    default: false,
                    vendors: false,
                    framework: {
                        name: 'framework',
                        test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                        priority: 40,
                        enforce: true,
                    },
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: 20,
                        reuseExistingChunk: true,
                    }
                }
            },
            runtimeChunk: false
        };

        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                moment$: 'moment/moment.js',
            };
        }

        // 启用更多优化选项
        config.optimization.concatenateModules = true;
        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;
        config.optimization.providedExports = true;
        config.optimization.innerGraph = true;

        return config;
    },
    // 添加输出配置
    poweredByHeader: false,
    compress: true,
};

export default withBundleAnalyzer(nextConfig);