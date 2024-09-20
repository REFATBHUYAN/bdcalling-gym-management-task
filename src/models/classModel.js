"use strict";
// import mongoose, { Schema, Document } from 'mongoose';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
// export interface IClass extends Document {
//   trainer: mongoose.Schema.Types.ObjectId;
//   date: Date;
//   startTime: string;
//   trainees: mongoose.Schema.Types.ObjectId[];
// }
// const ClassSchema: Schema = new Schema({
//   trainer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   date: { type: Date, required: true },
//   startTime: { type: String, required: true },
//   trainees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// });
// export const Class = mongoose.model<IClass>('Class', ClassSchema);
const mongoose_1 = __importStar(require("mongoose"));
const ClassSchema = new mongoose_1.Schema({
    trainer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    trainees: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Trainee' }], // Ensure this is an array of ObjectId
    scheduleTime: { type: Date, required: true },
    // Other fields...
});
exports.Class = mongoose_1.default.model('Class', ClassSchema);
