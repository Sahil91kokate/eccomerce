// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/EcommerceWebApp/rest/productapi',
    createProxyMiddleware({
      target: 'http://103.148.157.74:33178',
      changeOrigin: true,
    })
  );
};
