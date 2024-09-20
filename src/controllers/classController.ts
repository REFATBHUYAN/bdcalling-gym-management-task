import { Request, Response } from "express";
import { Class } from "../models/classModel";
import { JwtPayloadExtended } from "../types/jwtPayload";
import mongoose from "mongoose";

export const bookClass = async (req: Request, res: Response) => {
  const { classId } = req.body;
  const userId = (req?.user as JwtPayloadExtended)?.userId; // This should work now
  // const userId = (req.user as JwtPayloadExtended).userId; // Cast req.user to access userId

  try {
    // Convert classId and userId from string to ObjectId
    const classObjectId = new mongoose.Types.ObjectId(classId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const selectedClass = await Class.findById(classObjectId);
    if (!selectedClass)
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });

    // Check if the class is already full
    if (selectedClass.trainees.length >= 10) {
      return res.status(400).json({
        success: false,
        message:
          "Class schedule is full. Maximum 10 trainees allowed per schedule.",
      });
    }

    // Add the trainee (user) to the class schedule
    selectedClass.trainees.push(userObjectId); // Use ObjectId for the trainee
    await selectedClass.save();

    res.status(201).json({
      success: true,
      message: "Class booked successfully",
      selectedClass,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Error booking class",
        errorDetails: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unknown error occurred.",
      });
    }
  }
};

export const createClass = async (req: Request, res: Response) => {
  const { trainerId, date, startTime } = req.body;
  try {
    const existingClasses = await Class.find({ date });
    if (existingClasses.length >= 5) {
      return res.status(400).json({
        success: false,
        message: "Cannot create more than 5 classes per day",
      });
    }

    const newClass = new Class({ trainer: trainerId, date, startTime });
    await newClass.save();

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      newClass,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Error creating class",
        errorDetails: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unknown error occurred.",
      });
    }
  }
};
