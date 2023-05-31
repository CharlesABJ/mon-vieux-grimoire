const http = require("http");
const app = require("./app");

const normalizePort = (val) => {
  const port = parseInt(port, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port > 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || 3000);

const server = http.createServer(app);
server.listen(port);
