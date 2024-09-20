import { JwtPayloadExtended } from './jwtPayload'; // Adjust the path to your JwtPayloadExtended type

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadExtended; // Extend the Request interface
    }
  }
}


