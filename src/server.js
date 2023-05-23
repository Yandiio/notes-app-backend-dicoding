const hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
  const server = hapi.server({
    host: 'localhost',
    port: 8000,
    routes: {
        cors: {
            origin: ['*'],
        },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};

init();