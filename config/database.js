module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'thedivinemedspa-db.cn54kpapt4jy.us-west-1.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapiheadlessdb'),
        username: env('DATABASE_USERNAME', 'main'),
        password: env('DATABASE_PASSWORD', 'Xh~b`=Db7X9;XeVw'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
