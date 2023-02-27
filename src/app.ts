import "dotenv/config";
import express, { json } from "express";
import connection from "./config/db";
import ticketController from "./controller/ticket.controller";

const app = express();
app.use(json());

app.use("/ticket", ticketController);

const PORT = process.env.PORT;
app.listen(PORT, async (): Promise<void> => {
  try {
    connection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on Port ${PORT}`);
});
