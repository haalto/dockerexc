require("dotenv").config();
const fetch = require("node-fetch");
const http = require("http");
const PORT = process.env.PORT || 5001;
const PORT_S2 = process.env.PORT_S2 || 5002;
http
  .createServer(async (req, res) => {
    try {
      const remoteAddress = req.client.remoteAddress;
      const remotePort = req.client.remotePort;
      const localAddress = req.client.localAddress;
      const localPort = req.client.localPort;

      const message = `Hello from ${remoteAddress}:${remotePort}\nto ${localAddress}:${localPort}\n`;
      const response = await fetch(`http://service2:${PORT_S2}`);

      const fullMessage = message.concat(await response.text());

      res.end(fullMessage);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end("Server error 500");
    }
  })
  .listen(PORT, () => {
    console.log(`Service 1 running on PORT: ${PORT}`);
  });
