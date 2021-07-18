import CategoryEntity from "../../entities/categories";

export interface ICategoryRepository {
    findAll(): Promise<{ data: CategoryEntity[] }>
    findOne(uuid: string): Promise<CategoryEntity | null>
}
