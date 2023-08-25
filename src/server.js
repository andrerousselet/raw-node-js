import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./db.js";

const db = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = db.select("users");
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    const user = {
      id: 1,
      name,
      email,
    };
    db.insert("users", user);
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Resource not found!");
});

server.listen(3333);
