import { Request, Response, Router } from "express";
import FoodItem, { IFoodItem } from "../model/foodItem";
import logger from "../logger/logger";

const foodItemRouter = Router();

foodItemRouter.post("/new", async (req: Request, res: Response) => {
  const item: IFoodItem = req.body;

  logger.info(
    `[FoodItem-New] Request for new food item:${JSON.stringify(item)}`
  );

  try {
    const foodItem = new FoodItem(item);
    await foodItem.save();
    logger.info(`[FoodItem-New] Food item was saved successfully`);

    return res.status(200).json({ message: "success", item });
  } catch (error) {
    logger.error(`[FoodItem-New] Error saving food item: ${error}`);

    res.status(500).json({ message: `Error creating food item: ${error}` });
  }
});

foodItemRouter.get("/get/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const foodItem = await FoodItem.findOne({ name });
    if (!foodItem) {
    logger.error(`[FoodItem-New] Food item by the name: ${name} doesnt exists`);

      return res.status(400).json({ message: "Food item not found" });
    }
    logger.info(`[FoodItem-New] Food item by the name: ${name} exists`);

    return res.status(200).json(foodItem);
  } catch (error) {
    logger.error(`[FoodItem-New] Error finding food item: ${error}`);

    return res
      .status(500)
      .json({ message: `Error finding food item: ${error}` });
  }
});

foodItemRouter.get("/all", async (_: Request, res: Response) => {
  try {
    const foodItems = await FoodItem.find({});
    logger.info(`[FoodItem-All] Supplying all food items`);

    return res.status(200).json(foodItems);
  } catch (error) {
    logger.error(`[FoodItem-All] Error supplying all food items: ${error}`);

    return res
      .status(500)
      .json({ message: `Error retrieving food items: ${error}` });
  }
});

export default foodItemRouter;
