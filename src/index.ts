import net from "net";

import { getImages, download } from "./images.service";

const port = 80;
const address = "81.180.73.230";
let data = "";

const mainSocket = async () => {
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
      console.log("end event");
    });

  socket.on("close", async () => {
    await getImages(data);
    console.log("Closing connection");
  });
};

mainSocket();

