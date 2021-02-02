import fs from "fs";
import axios from "axios";

export const getImages = async (data): Promise<void> => {
  let imgs = new Set<string>();
  const reg = /(?:(?:https?)+\:\/\/+[a-zA-Z0-9\/\._-]{1,})+(?:(?:jpe?g|png|gif))/gims;

  const allMatches = data.match(reg);
  console.log('all matches:', allMatches);

  for (const match of allMatches) {
    if (match) {
      imgs.add(match);
      await urlToImage(match);
    };
  };

};

export const urlToImage = async (url): Promise<void> => {
  const reg = /.*\.(png|jpe?g|gif)/;
  const format = url.match(reg);
  const date = Date.now().toString();

  const { data } = await axios({
    method: "get",
    url,
    responseType: "arraybuffer",
  });

  let img = await Buffer.from(data, "base64");
  console.log(url);
  await fs.writeFile(`src/imgs/${date}.${format[1]}`, img, (err) => {
    err && console.error(err);
  });
};
