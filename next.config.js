/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    webpack: (config) => {
        // Ensure config.externals exists and is properly handled
        if (!config.externals) {
            config.externals = [];
        }

        // Handle different types of externals configuration
        if (Array.isArray(config.externals)) {
            config.externals.push({
                'react-three-fiber': 'react-three-fiber',
                'three': 'three',
            });
        } else {
            config.externals = [
                config.externals,
                {
                    'react-three-fiber': 'react-three-fiber',
                    'three': 'three',
                }
            ];
        }
        return config;
    },
};

module.exports = nextConfig; 