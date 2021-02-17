import fs from "fs";
import http from "http";
import https from "https";

export default async (url): Promise<void> => {
  const format = url.match(/.*\.(png|jpe?g|gif)/);
  const date = Date.now().toString() + new Date().getMilliseconds();

  if (url.includes("https")) {
    await https.get(url, (res) => {
      res.pipe(fs.createWriteStream(`src/imgs/${date}.${format[1]}`));

      console.log("Download complete");
    });
  } else {
    await http.get(url, (res) => {
      res.pipe(fs.createWriteStream(`src/imgs/${date}.${format[1]}`));

      console.log("Download complete");
    });
  }
};
