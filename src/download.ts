import net from "net";
import fs from "fs";
import http from "http";
import https from "https";

export const download = async (url): Promise<void> => {
  console.log("download");
  const format = url.match(/.*\.(png|jpe?g|gif)/);
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

  // let data = "";
  // socket.write(`GET /${url} HTTP/1.1\r\nHost: mib.utm.md\r\n\r\n`);

  // socket
  //   .on("data", (res) => {
  //     data += res;
  //   })
  //   .on("error", (...all) => {
  //     console.warn(...all);
  //   })
  //   .on("end", () => {
  //     let res = data.split(/\r\n\r\n+?/);
  //     const buffer = Buffer.from(res[1], 'base64');
  //     console.log('res', res[1])
  //     .pipe(fs.createWriteStream(`src/imgs/${date}.${format[1]}`));
  //   });

  
};
