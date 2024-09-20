"use strict";
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
exports.createClass = exports.bookClass = void 0;
const classModel_1 = require("../models/classModel");
const mongoose_1 = __importDefault(require("mongoose"));
const bookClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { classId } = req.body;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId; // This should work now
    // const userId = (req.user as JwtPayloadExtended).userId; // Cast req.user to access userId
    try {
        // Convert classId and userId from string to ObjectId
        const classObjectId = new mongoose_1.default.Types.ObjectId(classId);
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const selectedClass = yield classModel_1.Class.findById(classObjectId);
        if (!selectedClass)
            return res.status(404).json({
                success: false,
                message: "Class not found",
            });
        // Check if the class is already full
        if (selectedClass.trainees.length >= 10) {
            return res.status(400).json({
                success: false,
                message: "Class schedule is full. Maximum 10 trainees allowed per schedule.",
            });
        }
        // Add the trainee (user) to the class schedule
        selectedClass.trainees.push(userObjectId); // Use ObjectId for the trainee
        yield selectedClass.save();
        res.status(201).json({
            success: true,
            message: "Class booked successfully",
            selectedClass,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: "Error booking class",
                errorDetails: error.message,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: "An unknown error occurred.",
            });
        }
    }
});
exports.bookClass = bookClass;
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trainerId, date, startTime } = req.body;
    try {
        const existingClasses = yield classModel_1.Class.find({ date });
        if (existingClasses.length >= 5) {
            return res.status(400).json({
                success: false,
                message: "Cannot create more than 5 classes per day",
            });
        }
        const newClass = new classModel_1.Class({ trainer: trainerId, date, startTime });
        yield newClass.save();
        res.status(201).json({
            success: true,
            message: "Class created successfully",
            newClass,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: "Error creating class",
                errorDetails: error.message,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: "An unknown error occurred.",
            });
        }
    }
});
exports.createClass = createClass;
