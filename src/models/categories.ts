import { model, Schema, Model } from "mongoose";
import { ICategoryModel } from "./interfaces/categories";

const CategorySchema: Schema = new Schema(
    {
        uuid: { type: String },
        name: { type: String },
    }
);

CategorySchema.index('uuid')

const CategoryModel: Model<ICategoryModel> = model(
    "categories",
    CategorySchema
);

export default CategoryModel;
