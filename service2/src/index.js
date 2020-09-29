require("dotenv").config();
const http = require("http");

const PORT = process.env.PORT || 5000;

http
  .createServer(async (req, res) => {
    const remoteAddress = req.client.remoteAddress;
    const remotePort = req.client.remotePort;
    const localAddress = req.client.localAddress;
    const localPort = req.client.localPort;

    res.end(
      `Hello from ${remoteAddress}:${remotePort}\nto ${localAddress}:${localPort}\n`
    );
  })
  .listen(PORT, () => {
    console.log(`Service 2 running on PORT: ${PORT}`);
  });
