const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/routes');
require('dotenv').config();



const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
    });

    // Daftarkan semua route ke server
    routes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init().catch((err) => {
    console.error(err);
    process.exit(1);
});
