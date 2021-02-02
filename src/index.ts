import net from "net";

import { getImages } from './images.service';

const port = 80;
const address = "81.180.73.230";

const socket: net.Socket = new net.Socket();

socket.connect(port, address, () => {
  console.log(`Connected to socket ${address}:${port}`);
});

socket.write(`GET / HTTP/1.0
Host: me.utm.md\r\n
Connection: Keep-Alive\r\n
`);

socket.on("data", async (res) => {
  let data = "";
  
  data += await res;
  getImages(data);
});

socket.on("close", () => {
  console.log('Closing connection');
});
