import net from "net";

<<<<<<< HEAD
import { getImages } from "./images.service";

const port = 80;
const address = "81.180.73.230";
let data = "";
=======
import { getImages } from './images.service';

const port = 80;
const address = "81.180.73.230";
>>>>>>> d8eab94506de46385596e1566ae2fd25dd26a262

const socket: net.Socket = new net.Socket();

socket.connect(port, address, () => {
  console.log(`Connected to socket ${address}:${port}`);
});

socket.write(`GET / HTTP/1.0
<<<<<<< HEAD
Host: me.utm.md
Connection: Keep-Alive
Content-Type: text/html; charset=UTF-8
Access-Control-Allow-Origin: me.utm.md
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Content-Type, x-requested-with

`);

socket.on("data", async (res) => {
  data += await res;
}).on("end", async () => {
  await getImages(data);
});

socket.on("close", () => {
  console.log("Closing connection");
=======
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
>>>>>>> d8eab94506de46385596e1566ae2fd25dd26a262
});
