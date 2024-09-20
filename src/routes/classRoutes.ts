import express from 'express';
import { createClass, bookClass } from '../controllers/classController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

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

router.post('/create', authMiddleware, createClass);
router.post('/book', authMiddleware, bookClass);

export default router;
