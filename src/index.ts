import net from "net";
import tls from "tls";
import fs from "fs";
import path from "path";

import { getImages } from "./getImages";

const imgDir = "src/imgs/";

fs.readdir(imgDir, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(imgDir, file), (err) => {
      if (err) throw err;
    });
  }
});

const httpsSocket = async (url) => {
  const httpsPort = 443;
  const httpsAddress = url;
  let options = {
    key: fs.readFileSync("private-key.pem"),
    cert: fs.readFileSync("public-cert.pem"),
    rejectUnauthorized: false,
  };
  let data = "";

  const client = tls.connect(httpsPort, httpsAddress, options, () => {
    client.write(`GET / HTTP/1.1\r\nHost: ${url}\r\nContent-Type: text/html; charset=UTF-8\r\nAccept: */*\r\nAccept-Encoding: gzip, deflate, br\r\nConnection: Keep-Alive\r\nReferer: ${url}/\r\n\r\n`);
  });

  client.on("data", async (res) => {
    data += await res;

    client.end();
  });

  client.on("close", async () => {
    await getImages(data, { isHttps: true });
    console.log("Connection closed");
  });

  client.on("error", (err) => console.log(err));
};

const httpSocket = async (url) => {
  const port = 80;
  const socket: net.Socket = new net.Socket();
  const address = url;
  let data = "";

  const client = socket
    .connect(port, address, () => {
      console.log(`Connected to socket ${address}:${port}`);
    })
    .setMaxListeners(40);

  client.write(`GET / HTTP/1.1
Host: me.utm.md
Connection: Keep-Alive
Keep-Alive: timeout=10, max=50 
Content-Type: text/html; charset=UTF-8
Access-Control-Allow-Origin: me.utm.md
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Content-Type, x-requested-with

`);

  client.on("data", async (res) => {
    data += await res;
  });

  
  client.on("end", async () => {
    // await getImages(data, socket);

    console.log("end");
  });

  

  client.on("close", async () => {
    console.log("Closing connection");

    await getImages(data);
    
  });
};

const getHTML = (url, options) => {
  if (options.isHttps) {
    httpsSocket(url);
  } else {
    httpSocket(url);
  }
};

console.log(getHTML("me.utm.md", { isHttps: false }));
