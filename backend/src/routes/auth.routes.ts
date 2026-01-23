import express from "express";
import * as authController from "../controllers/auth.controller.js"

export const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d’un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Josué
 *               lastName:
 *                 type: string
 *                 example: Hounhoui
 *               email:
 *                 type: string
 *                 example: josue@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/register", authController.register);