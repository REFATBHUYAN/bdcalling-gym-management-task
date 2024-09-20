"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classController_1 = require("../controllers/classController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all gym classes.
 *     responses:
 *       200:
 *         description: A list of classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   trainerId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   startTime:
 *                     type: string
 *                     format: time
 */
router.post('/create', authMiddleware_1.authMiddleware, classController_1.createClass);
router.post('/book', authMiddleware_1.authMiddleware, classController_1.bookClass);
exports.default = router;
