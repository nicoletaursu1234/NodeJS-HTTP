import net from "net";
import fs from "fs";
import http from "http";
import https from "https";
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

export const getImages = async (data, options?): Promise<void> => {
  let imgs = new Set<string>();
  const reg = /src=("|')+(https?)?(.\S*)\.(jpe?g|png|gif){1}("|')+/gm;
  const allMatches = data.match(reg);

  if (allMatches) {
    for (let match of allMatches) {
      if (match) {
        console.log('match', match)
        const sliced = match.substring(5, match.length - 1);
        let url = "";

        if (options?.isHttps && !match.includes('http')) {
          url = sliced;
        } else if (!options && !match.includes('http')) {
          url = "http://mib.utm.md/" + sliced;
        } else {
          url = sliced;
        }

        await download(url);
      }
    }
  }
};

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
