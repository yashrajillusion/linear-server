import { Router, Request, Response } from "express";
import TickeModel from "../model/ticket.model";

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
    }

    return res.status(200).send(req.body);
  } catch (error) {}
});

router.post("/pr", async (req: Request, res: Response) => {
  try {

    /* 
    [YR-1] integrate webhooks
false
opened
[YR-1] integrate webhooks
false
closed
    */
    //req.body.pull_request.title
    // merged
    //req.body.action
    let ticket = req.body.pull_request.title.split(" ")[0].replace(/\[|\]/g, '');
    console.log(ticket)
    // console.log(req.body.pull_request.title);
    console.log(req.body.pull_request.merged);
    console.log(req.body.action);
    return res.status(200).send(req.body);
  } catch (error) {}
});
//yashraj/lead-4708-map-gocomet-migration

export default router;
