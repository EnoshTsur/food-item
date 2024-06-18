import { model, Schema, Document } from "mongoose";

export interface IFoodItem extends Document {
  readonly name: string;
  readonly brand?: string;
  readonly servingAmount?: number;
  readonly packageAmount: number;
  readonly calories: number;
  readonly carbohydrate: number;
  readonly fat: number;
  readonly protein: number;
}

export const foodItemSchema = new Schema<IFoodItem>({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  brand: {
    type: String,
    required: false,
  },
  servingAmount: {
    type: Number,
    required: false,
  },
  packageAmount: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  carbohydrate: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
});

const FoodItem = model<IFoodItem>("food-item", foodItemSchema);

export default FoodItem;
