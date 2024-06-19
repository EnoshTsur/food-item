import { Request, Response, Router } from "express";
import FoodItem, { IFoodItem } from "../model/foodItem";

const foodItemRouter = Router();

foodItemRouter.post("/new", async (req: Request, res: Response) => {
  const item: IFoodItem = req.body;

  try {
    const foodItem = new FoodItem(item);
    await foodItem.save();
    return res.status(200).json({ message: "success", item });
  } catch (error) {
    res.status(500).json({ message: `Error creating food item: ${error}` });
  }
});

foodItemRouter.get("/get/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const foodItem = await FoodItem.findOne({ name });
    if (!foodItem) {
      return res.status(400).json({ message: "Food item not found" });
    }
    return res.status(200).json(foodItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error finding food item: ${error}` });
  }
});

foodItemRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const foodItems = await FoodItem.find({});
    return res.status(200).json(foodItems);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error retrieving food items: ${error}` });
  }
});

export default foodItemRouter;
