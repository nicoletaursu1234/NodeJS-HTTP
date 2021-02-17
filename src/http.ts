import net from "net";
import cluster from "cluster";

import getImages from "./getImages";

export default async (address: string): Promise<void> => {
  const port = 80;
  const socket: net.Socket = new net.Socket();
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

  client.on("error", (err) => console.error(err));

  client.on("end", async () => {
    console.log("end");
  });

  client.on("close", async () => {
    console.log("Closing connection");

    await getImages(data);

    cluster.fork();
  });
};
