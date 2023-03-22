const config = {
    development: {
        username: 'postgres',
        password: 'root',
        database: 'moviesMGMT',
        host: 'localhost',
        dialect: 'postgres',
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
    },
    production: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
    },
};

export default config;