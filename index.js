import fg from "fast-glob";
import fs from "fs";

const getTemplate = (index, name) => {
  const map = [
    `export * from './${name}';\n`,
    `export { default as ${name} } from './${name}';\n`,
  ];
};

const exec = async () => {
  const entries = await fg(["./*.js"], { cwd: true });

  console.log(entries);

  // // 如果入口文件已经存在，则删除它，
  // const arr = await fg(['./main.js']);
  // if (arr.length) {
  //     fs.unlinkSync('./main.js');
  // }

  // // 入口文件里的代码用文件追加方式一句句生成
  for (let key in entries) {
    fs.writeFile(
      "./index.js",
      `export * from './${entries[key]}';\n`,
      { flag: "a" },
      function (err) {
        if (err) throw err;
      }
    );
  }
};

exec();
export * from "./index.js";
