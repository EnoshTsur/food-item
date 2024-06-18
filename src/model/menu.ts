import { model, Schema, Document } from "mongoose";
import { foodItemSchema, IFoodItem } from "./foodItem";

export interface IMenuItem {
  readonly fodItem: IFoodItem;
  readonly amount: number;
}

export interface IMenu {
  readonly [key: string]: IMenuItem;
}

const menuSchema = new Schema({
  items: {
    type: Map,
    of: new Schema({
      foodItem: {
        type: foodItemSchema,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }),
  },
});

const Menu = model<IMenu & Document>("menu", menuSchema);

export default Menu;
