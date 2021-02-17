import { download } from "./download";

export const getImages = async (
  data,
  options?
): Promise<Set<String>> => {
  console.log("called");

  // socket
  //   .connect(80, 'mib.utm.md', () => {
  //     console.log(`Connected to socket`);
  //   })
  //   .setMaxListeners(40).setKeepAlive();

  let imgs = new Set<string>();
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

        imgs.add(url);

        await download(url);
      }
    }
  }

  // socket.on('close', () => console.log('close'))

  return imgs;
};
