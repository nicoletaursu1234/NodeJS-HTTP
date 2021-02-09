import net from "net";
import fs from "fs";
import http from "http";
import https from "https";
// import { id, index } from 'worker_threads';

export const download = async (url): Promise<void> => {
  const reg = /.*\.(png|jpe?g|gif)/;
  const format: string = url.match(reg);
  const date = Date.now().toString() + new Date().getMilliseconds();

  if (url.includes("https")) {
    await https.get(url, (res) => {
      res.pipe(fs.createWriteStream(`src/imgs/${date}.${format[1]}`));
    });
  } else {
    await http.get(url, (res) => {
      res.pipe(fs.createWriteStream(`src/imgs/${date}.${format[1]}`));
    });
  }

  //  const urlSliced = url.slice(17);

  // const port = 80;
  // const address = "81.180.73.230";

  // const socket: net.Socket = new net.Socket();
  // socket
  //   .connect(port, address, () => {
  //     console.log(`Connected to socket ${address}:${port}`);
  //   })
  //   .setMaxListeners(15);

  // let data = [];
  // socket.write(`GET ${urlSliced} HTTP/1.1
  // Host: mib.utm.md
  // Content-Type: application/octet-stream

  // `);

  // await socket
  //   .on("data", (res) => {
  //     data.push(res as never)
  //   })
  //   .on('error', (...all) => {console.warn(...all)})
  //   .on("end", async () => {
  //     let body = Buffer.concat(data);

  //     await fs.writeFile(`src/imgs/${date}.${format[1]}`, body.toString(), (err) => {
  //       err && console.error(err);
  //     });

  //   });

  // socket.on("close", () => {
  //   console.log("next");
  // });
};