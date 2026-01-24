import { Router } from "express";
import { getWeeklyReport } from "../controllers/report.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const weeklyRouter = Router();

/**
 * @swagger
 * /api/reports/weekly:
 *   get:
 *     summary: Bilan hebdomadaire des heures de travail
 *     description: Accessible uniquement aux administrateurs
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: week
 *         required: false
 *         description: Date appartenant à la semaine à analyser (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: 2026-01-13
 *     responses:
 *       200:
 *         description: Bilan hebdomadaire calculé
 *       403:
 *         description: Accès réservé aux administrateurs
 */
weeklyRouter.get("/weekly", authenticate, authorize("ADMIN"), getWeeklyReport);

export default weeklyRouter;