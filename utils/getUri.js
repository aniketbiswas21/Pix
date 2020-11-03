const path = require("path");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

exports.getUri = (stream, file) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    // stream.setEncoding("base64");
    stream.on("readable", () => {
      let chunk;
      while (null !== (chunk = stream.read())) {
        chunks.push(chunk);
      }
    });
    stream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const uri = parser.format(path.extname(file.originalname), buffer)
        .content;
      //   const uri = `data:${file.mimetype};base64,${chunks.join("")}`;
      resolve(uri);
    });
  });
};
