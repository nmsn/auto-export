import fg from "fast-glob";
import fs from "fs";

const exec = async () => {
  // 如果入口文件已经存在，则删除它
  const arr = await fg(["./index.tsx"]);
  if (arr.length) {
    fs.unlinkSync("./index.tsx");
  }

  const entries = await fg(["*.tsx"]);

  // // 入口文件里的代码用文件追加方式一句句生成
  for (let key in entries) {
    const name = entries[key].split(".")[0];
    fs.writeFile(
      "./index.tsx",
      `export { default as ${name} } from './${name}';\n`,
      { flag: "a" },
      function (err) {
        if (err) throw err;
      }
    );
  }
};

exec();
