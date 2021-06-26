import "reflect-metadata";
import mongoose, { Mongoose } from "mongoose";
import { container } from "../inversify.config";
import { import_arguments } from "./decorators/arguments";
import { ISeeder } from "./interfaces/seeder";
import { SEEDER_TYPES } from "./seeder.types";

class SeederService {
    private MONGO_URI?: string
    private SEEDER_NAME?: string

    constructor() { }

    async connect_db(url: string) {
        let mongooseClient: Mongoose = mongoose;

        console.log("Mongo connecting ...");
        return mongooseClient
            .connect(url || "", {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Mongo connected.");
            })
            .catch((err: any) => {
                console.log("Mongo error.", err);
            });
    }

    @import_arguments(["MONGO_URI", "SEEDER_NAME"])
    async run() {

        if (!this.MONGO_URI || !this.SEEDER_NAME) {
            console.error("Usage: npm run seed --SEEDER_NAME=value --MONGO_URI=value\nTo find seeder name you can use name of seeder class")
            return
        }

        await this.connect_db(this.MONGO_URI)
        const types = (<any>SEEDER_TYPES)[this.SEEDER_NAME]

        if (types) {
            await container.get<ISeeder>(types).seed()
        } else {
            console.log(`Error seeder with name ${this.SEEDER_NAME} is not registered!`)
        }
    }
}

new SeederService().run()
