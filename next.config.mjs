import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: false, // 禁用分析器以减小构建大小
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 使用静态导出
    images: {
        unoptimized: true,
    },
    experimental: {
        serverActions: false, // 禁用服务器操作
    },
    webpack: (config, { isServer }) => {
        config.optimization.minimize = true;

        // 更激进的代码分割配置
        config.optimization.splitChunks = {
            chunks: 'all',
            maxInitialRequests: 25,
            minSize: 20000,
            maxSize: 2000000, // 降低到 2MB
            cacheGroups: {
                default: false,
                vendors: false,
                framework: {
                    chunks: 'all',
                    name: 'framework',
                    test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
                    priority: 40,
                    enforce: true,
                },
                lib: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module.identifier().split('/').reduceRight(item => item);
                        return `${cacheGroupKey}.${moduleFileName.replace(/[^a-zA-Z0-9]/g, '')}`;
                    },
                    priority: 30,
                    minChunks: 1,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    priority: 20
                }
            }
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