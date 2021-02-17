import https from "./https";
import http from "./http";

export default (url, options) => {
  if (options.isHttps) {
    https(url);
  } else {
    http(url);
  }
};
