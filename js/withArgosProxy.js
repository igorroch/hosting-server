
const httpProxy = require('http-proxy');
const servers = require('../servers.json');

const proxy = httpProxy.createProxyServer({});

const withArgosProxy = function (req, res, host) {
  servers.forEach(server => {
    if (host.indexOf(server.domain) > -1) {
      const options = {
        target: `${server.protocol || ''}//${server.host || '127.0.0.1'}:${server.port}`,
        secure: true,
        changeOrigin: true,
      };

      try {
        proxy.web(req, res, options, (e) => console.log(e));
      } catch (e) {
        console.log(e);
      }

      return true;
    }
  });

  return false;
};

export default { withArgosProxy }