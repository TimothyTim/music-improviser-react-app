const devServer = require('./tools/devServer');
const prodServer = require('./tools/server');

const PORT = process.env.PORT || 3000;
const PROD = process.env.NODE_ENV === "production";

if (PROD) {
  prodServer(PORT);
} else {
  devServer();
}
