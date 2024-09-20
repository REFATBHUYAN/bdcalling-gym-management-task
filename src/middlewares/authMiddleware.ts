// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized access' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayloadExtended } from "../types/jwtPayload"; // import your extended interface

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayloadExtended; // cast to the extended payload
    req.user = decoded; // Attach the decoded token to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
