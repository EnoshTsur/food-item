import { FoodItemActions } from "../actions/foodItem.actions";
import { Dto } from "../dto/dto";
import logger from "../logger/logger";
import FoodItem, { IFoodItem } from "../model/foodItem";

export const saveFoodItem = async (
  item: IFoodItem
): Promise<Dto<IFoodItem>> => {
  logger.info(
    `[FoodItem-New] Request for new food item:${JSON.stringify(item)}`
  );

  try {
    const foodItem = new FoodItem(item);
    await foodItem.save();
    logger.info(`[FoodItem-New] Food item was saved successfully`);

    return {
      statusCode: 200,
      body: item,
      error: null,
      actionCode: FoodItemActions.NEW_FOODITEM,
    };
  } catch (error) {
    logger.error(`[FoodItem-New] Error saving food item: ${error}`);

    return {
      statusCode: 500,
      error: `Error creating food item: ${error}`,
      body: null,
      actionCode: FoodItemActions.NEW_FOODITEM_FAILURE,
    };
  }
};

export const getAllFoodItems = async (): Promise<
  Dto<ReadonlyArray<IFoodItem>>
> => {
  try {
    const foodItems = await FoodItem.find({});
    logger.info(`[FoodItem-All] Supplying all food items`);

    return {
      statusCode: 200,
      body: foodItems,
      error: null,
      actionCode: FoodItemActions.ALL_FOODITEMS,
    };
  } catch (error) {
    logger.error(`[FoodItem-All] Error supplying all food items: ${error}`);

    return {
      statusCode: 500,
      error: `Error retrieving food items: ${error}`,
      body: null,
      actionCode: FoodItemActions.NEW_FOODITEM_FAILURE,
    };
  }
};
