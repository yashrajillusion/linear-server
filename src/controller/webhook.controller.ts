import { Router, Request, Response } from "express";

const router = Router();

router.post("/commit", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    return res.status(200).send(req.body);
  } catch (error) {}
});

router.post("/pr", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    return res.status(200).send(req.body);
  } catch (error) {}
});

export default router;
