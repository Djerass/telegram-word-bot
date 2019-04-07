const http = require("http");

const notFound = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  const message = `Route ${req.method}  ${req.url} not exist`;
  return res.end(JSON.stringify({ message }));
};

const methods = {
  GET: {},
  POST: {}
};

const callMethod = (req, res) => {
  const type = req.method;
  const url = req.url;
  if (methods[type][url]) {
    methods[type][url](req, res);
  } else {
    notFound(req, res);
  }
};

const server = http.createServer((req, res) => {
  callMethod(req, res);
});

module.exports = {
  start: port => {
    server.listen(port, () => {
      console.log(`Server run on http://localhost:${port}`);
    });
  },
  get: (route, callback) => {
    methods.GET[route] = callback;
  },
  post: (route, callback) => {
    methods.POST[route] = callback;
  }
};
