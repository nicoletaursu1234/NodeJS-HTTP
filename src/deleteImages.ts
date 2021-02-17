import fs from "fs";
import path from "path";

export default (): void => {
  const imgDir = "src/imgs/";

  fs.readdir(imgDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(imgDir, file), (err) => {
        if (err) throw err;
      });
    }
  });
};
