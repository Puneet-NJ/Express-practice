import { Router } from "express";
import { postRouter } from "./routes/post";

export const router = Router();

router.use("/post", postRouter);
