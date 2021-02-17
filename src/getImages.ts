import fs from "fs";

export default async (data, options?): Promise<any> => {
  let imgs: String[] = [];
  const reg = /src=("|')+(https?)?(.\S*)\.(jpe?g|png|gif){1}("|')+/gm;
  const allMatches = data.match(reg);

  if (allMatches) {
    for (let match of allMatches) {
      if (match) {
        const sliced = match.substring(5, match.length - 1);
        let url = "";

        if (options?.isHttps && !match.includes("http")) {
          url = sliced;
        } else if (!options && !match.includes("http")) {
          url = "http://mib.utm.md/" + sliced;
        } else {
          url = sliced;
        }

        imgs.push(url);
      }
    }
  }

  fs.writeFile("data.json", JSON.stringify(imgs), "utf8", (err) => {
    err && console.log(err);
  });
};
