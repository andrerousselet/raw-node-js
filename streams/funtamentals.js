import { Readable } from "node:stream";

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

new CountToHundred().pipe(process.stdout);