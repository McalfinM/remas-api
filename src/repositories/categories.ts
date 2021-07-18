import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { ILikeRepository } from "./interfaces/like";
import { ICategoryRepository } from "./interfaces/categories";
import CategoryEntity from "../entities/categories";
import CategoryModel from "../models/categories";

@injectable()
class CategoryRepository implements ICategoryRepository {

    async findAll(): Promise<{ data: CategoryEntity[] }> {
        return CategoryModel.find()
            .then(result => {
                return {
                    data: result.map(data => {
                        return new CategoryEntity({
                            uuid: data.uuid,
                            name: data.name
                        })
                    })
                }
            })
    }

    async findOne(uuid: string): Promise<CategoryEntity | null> {

        const response = await CategoryModel.findOne({ uuid: uuid })

        return response ? new CategoryEntity(response) : null
    }

}

export default CategoryRepository
