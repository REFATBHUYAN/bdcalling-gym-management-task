"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Correctly importing express and types
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const classRoutes_1 = __importDefault(require("./routes/classRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Gym Management API',
            version: '1.0.0',
            description: 'API for managing gym classes and bookings',
            contact: {
                name: 'API Support',
                email: 'support@gym.com',
            },
            servers: [{ url: 'http://localhost:5000' }],
        },
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs (adjust as needed)
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Middleware and routes
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/class", classRoutes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error));
exports.default = app;
