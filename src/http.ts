import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

const app = express();

//configs to be able to use the html
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
  return res.render("html/client.html");
});
app.get("/pages/admin", (req, res) => {
  return res.render("html/admin.html");
});

//crate http protocol
const http = createServer(app);

//create websocket protocol
const io = new Server(http);

io.on("connection", (socket: Socket) => {
  console.log("connected to socket");
});

app.use(express.json());

app.use(routes);

export { http, io };
