"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const public_api_1 = require("../route/public-api");
const error_middleware_1 = require("../middleware/error-middleware");
const api_1 = require("../route/api");
const cors_1 = __importDefault(require("cors"));
exports.web = (0, express_1.default)();
exports.web.use(express_1.default.json());
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies
};
exports.web.use((0, cors_1.default)(corsOptions));
exports.web.use(public_api_1.publicRouter);
exports.web.use(api_1.apiRouter);
exports.web.use(error_middleware_1.errorMiddleware);
// const app = express();
// Define CORS options
