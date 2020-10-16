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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const user_entity_1 = require("./entity/user.entity");
const AWS = __importStar(require("aws-sdk"));
AWS.config.update({ region: process.env.REGION });
const typeorm_1 = require("typeorm");
let connection;
const app = express_1.default();
const port = 5000;
const data = require('data-api-client')({
    secretArn: process.env.SECRET_ARN,
    resourceArn: process.env.RESOURCE_ARN,
    database: process.env.MYSQL_DB,
    options: {
        endpoint: process.env.ENDPOINT_URL
    }
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new user_entity_1.User();
    user.email = 'abcdefxx@gmail.com';
    user.password = 'testex';
    user.username = 'safopax';
    console.log("Connection Entities:", connection.options.entities);
    const postRepository = connection.getRepository(user_entity_1.User);
    console.log("postRepository:", postRepository);
    yield postRepository.save(user);
    let result = yield data.query(`SELECT * FROM user`);
    console.log("result", result);
    res.send('The sedulous hyena ate the antelope!');
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield typeorm_1.createConnection({
        type: "aurora-data-api-pg",
        database: "test",
        secretArn: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:dummy',
        resourceArn: 'arn:aws:rds:us-east-1:123456789012:cluster:dummy',
        region: 'local',
        serviceConfigOptions: {
            endpoint: process.env.ENDPOINT_URL
        },
        entities: [
            __dirname + '/entity/*.js'
        ],
    });
    console.log(`Server is listening on ${port}`);
}));
//# sourceMappingURL=app.js.map