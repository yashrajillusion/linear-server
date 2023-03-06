import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import connection from "./config/db";
import { Server } from "socket.io";
import ticketController from "./controller/ticket.controller";
import webhookController from "./controller/webhook.controller";

const app = express();
app.use(cors());
app.use(json());

app.use("/ticket", ticketController);
app.use("/linear", webhookController);

const PORT = process.env.PORT;

let server = app.listen(PORT, async (): Promise<void> => {
  try {
    connection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on Port ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: "https://superb-cajeta-471891.netlify.app",
  },
});

io.on("connection", (socket) => {
  socket.on("current-team", (currentTeamId) => {
    currentTeamId = currentTeamId;
    socket.join(currentTeamId);
  });
  socket.on("create-ticket", (receiveData) => {
    socket.in("illusion-frontend").emit("recieved-ticket", receiveData);
  });
  socket.on("update-ticket", (receiveData) => {
    socket.in("illusion-frontend").emit("recieved-update-ticket", receiveData);
  });
});
