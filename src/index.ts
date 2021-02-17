import cluster from "cluster";

import getHTML from "./getHTML";
import getThreadData from "./thread";
import deleteImages from "./deleteImages";

if (cluster.isMaster) {
  deleteImages();

  getHTML("utm.md", { isHttps: true });
} else {
  (async () => {
    await getThreadData();
  })();
}
