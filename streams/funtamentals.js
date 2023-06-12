import { Readable, Writable, Transform } from "node:stream";

const ONE_SECOND = 1000;

class CountToHundred extends Readable {
  index = 0;

  _read() {
    const i = this.index += 1;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer);
      }
    }, ONE_SECOND)
  }
};

class InvertNumber extends Transform {
  _transform(chunk, _encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTen extends Writable {
  _write(chunk, _encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
};

new CountToHundred()
  .pipe(new InvertNumber())
  .pipe(new MultiplyByTen());