const isProd = process.env.NODE_ENV === 'production';

const config = {
    isProd,
    apiPrefix: isProd ? 'http://production-url' : 'http://localhost:1337'
}

export default config;