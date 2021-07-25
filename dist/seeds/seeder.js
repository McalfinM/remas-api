"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const inversify_config_1 = require("../inversify.config");
const arguments_1 = require("./decorators/arguments");
const seeder_types_1 = require("./seeder.types");
class SeederService {
    MONGO_URI;
    SEEDER_NAME;
    constructor() { }
    async connect_db(url) {
        let mongooseClient = mongoose_1.default;
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
            .catch((err) => {
            console.log("Mongo error.", err);
        });
    }
    async run() {
        if (!this.MONGO_URI || !this.SEEDER_NAME) {
            console.error("Usage: npm run seed --SEEDER_NAME=value --MONGO_URI=value\nTo find seeder name you can use name of seeder class");
            return;
        }
        await this.connect_db(this.MONGO_URI);
        const types = seeder_types_1.SEEDER_TYPES[this.SEEDER_NAME];
        if (types) {
            await inversify_config_1.container.get(types).seed();
        }
        else {
            console.log(`Error seeder with name ${this.SEEDER_NAME} is not registered!`);
        }
    }
}
__decorate([
    arguments_1.import_arguments(["MONGO_URI", "SEEDER_NAME"])
], SeederService.prototype, "run", null);
new SeederService().run();
