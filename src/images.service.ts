import fs from "fs";
import axios from 'axios';

export const getImages = async (data): Promise<Object> => {
  let imgs = new Set<string>();
  const regEx = /(?:(?:https?)+\:\/\/+[a-zA-Z0-9\/\._-]{1,})+(?:(?:jpe?g|png|gif))/gims;

  const allMatches = data.match(regEx);

  allMatches?.forEach( async (match) => {
    match && await imgs.add(match);
  });
  
  imgs.forEach(async (elem) => {
    await urlToImage(elem);
  });

  return imgs;
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

  fs.writeFile(`src/imgs/${date}.${format[1]}`, img, (err) => {
    err && console.error(err);
  });
};