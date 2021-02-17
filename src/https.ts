import fs from "fs";
import tls from "tls";
import cluster from "cluster";

import getImages from "./getImages";

export default async (address): Promise<void> => {
  const httpsPort = 443;
  let data = "";
  let options = {
    key: fs.readFileSync("private-key.pem"),
    cert: fs.readFileSync("public-cert.pem"),
    rejectUnauthorized: false,
  };
  
  const client = tls.connect(httpsPort, address, options, () => {
    client.write(
      `GET / HTTP/1.1\r\nHost: ${address}\r\nContent-Type: text/html; charset=UTF-8\r\nAccept: */*\r\nAccept-Encoding: gzip, deflate, br\r\nConnection: Keep-Alive\r\nReferer: ${address}/\r\n\r\n`
    );
  });

  client.on("data", async (res) => {
    data += await res;

    client.end();
  });

  client.on("close", async () => {
    console.log("Connection closed");

    await getImages(data, { isHttps: true });

    cluster.fork();
  });

  client.on("error", (err) => console.log(err));
};
