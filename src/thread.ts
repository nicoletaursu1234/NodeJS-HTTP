import fs from "fs";

import download from "./download";

export default async (): Promise<any> => {
  const data = fs.readFileSync("./data.json", "utf8");
  const imgs = data.replace(/^\[|\]$|\"/g, "").split(",");

  imgs?.map(async (img) => {
    await download(img);
  });
};
