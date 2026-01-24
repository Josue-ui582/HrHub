import { Router } from "express";
import {
  handleCheckIn,
  handleCheckOut,
  getUserHistory,
  getUsersHistory
} from "../controllers/presence.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const presenceRoutes = Router();

presenceRoutes.use(authenticate);

/**
 * @swagger
 * /api/presence/check-in:
 *   post:
 *     summary: Pointage d'entrée
 *     tags: [Presence]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pointage réussi
 *       400:
 *         description: Déjà pointé aujourd'hui
 *       401:
 *         description: Non authentifié
 */
presenceRoutes.post("/check-in", authorize("USER"), handleCheckIn);

/**
 * @swagger
 * /api/presence/check-out:
 *   post:
 *     summary: Pointage de sortie
 *     tags: [Presence]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sortie réussie et durée calculée
 *       400:
 *         description: Pointage de sortie invalide
 */
presenceRoutes.post("/check-out", authorize("USER"), handleCheckOut);

/**
 * @swagger
 * /api/presence/me:
 *   get:
 *     summary: Historique personnel de présence
 *     tags: [Presence]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des présences de l'utilisateur connecté
 */
presenceRoutes.get("/me", getUserHistory);

/**
 * @swagger
 * /api/presence/all:
 *   get:
 *     summary: Historique de tous les employés (ADMIN uniquement)
 *     tags: [Presence]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste complète des présences
 *       403:
 *         description: Accès refusé (non-admin)
 */
presenceRoutes.get("/all", authorize("ADMIN"), getUsersHistory);

export default presenceRoutes;