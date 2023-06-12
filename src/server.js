import http from "node:http";

const users = ["Andre"];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push("Luana");

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Resource not found!");
});

server.listen(3333);