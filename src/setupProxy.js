const { createProxyMiddleware } = require("http-proxy-middleware");

console.log(createProxyMiddleware);

module.exports = function (app) {
  app.use(
    "/.netlify",
    createProxyMiddleware({
      target: "http://localhost:9999",
      changeOrigin: true,
      pathRewrite: {
        "^/.netlify": "/.netlify",
      },
    })
  );
};
