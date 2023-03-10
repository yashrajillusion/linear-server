import { Router, Request, Response } from "express";
import TickeModel from "../model/ticket.model";
import io from "../app";

const router = Router();

router.post("/commit", async (req: Request, res: Response) => {
  try {
    let gitHubBranch = req.body.ref.split("/")[3];
    let tickeArray = gitHubBranch.split("-");
    let tickeNumber = `${tickeArray[0]}-${tickeArray[1]}`;

    let currentTicket = await TickeModel.findOne({
      issueId: tickeNumber.toUpperCase(),
    });
    if (currentTicket && currentTicket.status == "TODO") {
      currentTicket.status = "INPROGRESS";
      currentTicket = await currentTicket.save();

      io.in("illusion-frontend").emit("recieved-update-ticket", {
        prevStatus: "TODO",
        receiveData: currentTicket,
      });
    }
    return res.status(200).send({});
  } catch (error) {}
});

router.post("/pr", async (req: Request, res: Response) => {
  try {
    let ticket = req.body.pull_request.title
      .trim()
      .split(" ")[0]
      .replace(/\[|\]/g, "");
    let currentTicket = await TickeModel.findOne({
      issueId: ticket,
    });
    if (currentTicket && req.body.action == "opened") {
      const prevStatus = currentTicket.status;
      currentTicket.status = "IN_DEV_REVIEW";
      currentTicket = await currentTicket.save();

      io.in("illusion-frontend").emit("recieved-update-ticket", {
        prevStatus: prevStatus,
        receiveData: currentTicket,
      });
    } else if (currentTicket && req.body.pull_request.merged) {
      const prevStatus = currentTicket.status;
      currentTicket.status = "DONE";
      currentTicket = await currentTicket.save();

      io.in("illusion-frontend").emit("recieved-update-ticket", {
        prevStatus: prevStatus,
        receiveData: currentTicket,
      });
    } else if (req.body.action == "closed") {
      //Need to update link section in ticket detials
    }
    return res.status(200).send({});
  } catch (error) {}
});

export default router;
