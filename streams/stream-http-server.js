import http from "node:http";
import { Transform } from "node:stream";

class InvertNumber extends Transform {
  _transform(chunk, _encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer((req, res) => {
  return req.pipe(new InvertNumber()).pipe(res);
});

server.listen(3334);
