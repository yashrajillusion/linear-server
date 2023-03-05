import { Router, Request, Response } from "express";

const router = Router();

router.post("/commit", async (req: Request, res: Response) => {
  try {
    let gitHubBranch = req.body.ref.split("/")[3];
    let tickeArray = gitHubBranch.split("-");
    let tickeNumber = `${tickeArray[0]}-${tickeArray[1]}`;

    console.log(tickeNumber);
    //req.ref
    // refs/heads/yashraj/yr-1-integrate-webhooks
    console.log(req.body.ref);
    return res.status(200).send(req.body);
  } catch (error) {}
});

router.post("/pr", async (req: Request, res: Response) => {
  try {
    //req.body.pull_request.title
    // merged
    //req.body.action
    console.log(req.body.pull_request.title);
    console.log(req.body.pull_request.merged);
    console.log(req.body.action);
    return res.status(200).send(req.body);
  } catch (error) {}
});
//yashraj/lead-4708-map-gocomet-migration

export default router;
