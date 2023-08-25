import { randomUUID } from "node:crypto";
import { Database } from "./db.js";

const db = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = db.select("users");
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };
      db.insert("users", user);
      return res.writeHead(201).end();
    },
  },
];
