import https from "./https";
import http from "./http";

export default (url: string, options: any): void => {
  if (options.isHttps) {
    https(url);
  } else {
    http(url);
  }
};
