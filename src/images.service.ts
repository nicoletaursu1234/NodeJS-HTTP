import net from "net";
import fs from "fs";
import http from "http";

export const getImages = async (data): Promise<void> => {
  let imgs = new Set<string>();
  const reg = /(?:(?:https?)+\:\/\/+[a-zA-Z0-9\/\._-]{1,})+(?:(?:jpe?g|png|gif))/gims;
  
  const allMatches = data.match(reg);

  for (const match of allMatches) {
    if (match) {
      imgs.add(match);
      await download(match);
    }
  }
};

export const download = async (url): Promise<void> => {
  const reg = /.*\.(png|jpe?g|gif)/;
  const format = url.match(reg);
  const date = Date.now().toString() + new Date().getMilliseconds();

  await http.get(url, (res) => {
    res.pipe(fs.createWriteStream(`src/imgs/${date}.${format[1]}`));
  })
  
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
