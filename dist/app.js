"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
require("reflect-metadata");
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const requestQueryValidation_1 = __importDefault(require("./middlewares/requestQueryValidation"));
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18n_1 = require("./middlewares/i18n");
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const cors_1 = __importDefault(require("cors"));
class App {
    app;
    mongooseClient;
    constructor() {
        dotenv_1.config();
        this.app = express_1.default();
        this.mongooseClient = mongoose_1.default;
        this.applyMiddleware();
        this.routes();
        this.connectDB();
        // container.get<Subscribers>(TYPES.Subscribers)
        i18next_1.default
            .use(i18next_fs_backend_1.default)
            .use(i18next_http_middleware_1.default.LanguageDetector)
            .init({
            backend: {
                loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
            },
            fallbackLng: 'id',
            preload: ['en', 'id']
        })
            .then((t) => { });
    }
    connectDB() {
        console.log("Mongo connecting ...");
        this.mongooseClient
            .connect(process.env.MONGO_URI || "", {
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
    applyMiddleware() {
        // middlewares here
        this.app.use(express_1.json());
        this.app.use(cors_1.default());
        this.app.use(express_1.urlencoded({ extended: true }));
        this.app.use(requestQueryValidation_1.default.validatePage);
        this.app.use(requestQueryValidation_1.default.validateLimit);
        this.app.use(i18next_http_middleware_1.default.handle(i18next_1.default, {}));
        this.app.use(express_http_context_1.default.middleware);
        this.app.use(i18n_1.changeLang);
        this.app.use(i18n_1.trans);
    }
    routes() {
        this.app.use(inversify_config_1.container.get(types_1.TYPES.IndexRouter).router);
    }
}
const app = new App().app;
app.listen(process.env.PORT, () => {
    console.log("Run on port", process.env.PORT);
});
