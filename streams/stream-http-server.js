import http from "node:http";
import { Transform } from "node:stream";

class InvertNumber extends Transform {
  _transform(chunk, _encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

// Full data consumption server ↓

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);
});

// ↓ Partial data consumption server ↓

// const server = http.createServer((req, res) => {
//   return req.pipe(new InvertNumber()).pipe(res);
// });

server.listen(3334);
