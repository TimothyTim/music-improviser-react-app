const http = require('http');
const path = require('path');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');
const buildPath = path.resolve(__dirname, '../dist');
const serve = serveStatic(buildPath);

module.exports = (PORT) => {
    // Create server
    const server = http.createServer(function(req, res) {
        const done = finalhandler(req, res);
        serve(req, res, done);
    });

    // Listen
    server.listen(PORT, () => {
        console.log(`Serving from: ${buildPath}`);
        console.log(`Server runnings on port ${PORT}`);
    });
};
