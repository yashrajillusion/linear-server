import { Router, Request, Response } from "express";

const router = Router();

router.post("/commit", async (req: Request, res: Response) => {
  try {
    //req.ref
    
    console.log(req.body.ref);
    console.log(req.body);
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
