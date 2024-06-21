import { Request, Response, Router } from "express";
import { IFoodItem } from "../model/foodItem";
import { getAllFoodItems, saveFoodItem } from "../service/foodItemsService";

const foodItemRouter = Router();

foodItemRouter.post("/new", async (req: Request, res: Response) => {
  const item: IFoodItem = req.body;

  const { error, statusCode, actionCode, body } = await saveFoodItem(item);
  return res.status(statusCode).json({ error, actionCode, body });
});

foodItemRouter.get("/all", async (_: Request, res: Response) => {
  const { error, body, actionCode, statusCode} = await getAllFoodItems()
  return res.status(statusCode).json({ error, body, actionCode })
});

export default foodItemRouter;
