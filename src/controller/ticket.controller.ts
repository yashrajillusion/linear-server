import { Request, Response, Router } from "express";
import TickeModel from "../model/ticket.model";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tickets = await TickeModel.find().sort({ updatedAt: -1 });
    return res.status(200).send(tickets);
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const ticket = await TickeModel.findById(req.params.id).lean().exec();
    return res.status(200).send(ticket);
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const ticket = await TickeModel.create(req.body);
    return res.status(200).send(ticket);
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const ticket = await TickeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (ticket) {
      return res.status(200).send(ticket);
    }
    return res.status(404).send("Ticket not found");
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
});

export default router;
