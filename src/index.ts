import { fstat } from "fs";
import net from "net";
import tls from "tls";
import fs from "fs";

import { getImages, download } from "./images.service";
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

let data = "";

let options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("public-cert.pem"),
  rejectUnauthorized: false,
};

const httpsSocket = async () => {
  const httpsPort = 443;
  const httpsAddress = "utm.md";

  const client = tls.connect(httpsPort, httpsAddress, options, () => {
    client.write(`GET / HTTP/1.1\r\nHost: utm.md\r\nContent-Type: text/html; charset=UTF-8\r\nAccept: */*\r\nAccept-Encoding: gzip, deflate, br\r\nConnection: Keep-Alive\r\nReferer: www.utm.md/\r\n\r\n
    `);
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

const mainSocket = async () => {
  const port = 80;
  const address = "81.180.73.230";
  const socket: net.Socket = new net.Socket();

  socket
    .connect(port, address, () => {
      console.log(`Connected to socket ${address}:${port}`);
    })
    .setMaxListeners(15);

  socket.write(`GET / HTTP/1.1
Host: me.utm.md
Connection: Keep-Alive
Content-Type: text/html; charset=UTF-8
Access-Control-Allow-Origin: me.utm.md
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Content-Type, x-requested-with

`);

  socket
    .on("data", async (res) => {
      data += await res;
    })
    .on("end", async () => {
      await getImages(data);
    });

  socket.on("close", async () => {
    console.log("Closing connection");
  });
};

const createWoker = (id, index) => {
  const worker = new Worker('./worker.js', {workerData: { id, index }});

  worker.on('error', (err) => { throw err });
  worker.on('message', callback);

  return worker
}

const callback (data) => {
  
}
//httpsSocket();
mainSocket();
