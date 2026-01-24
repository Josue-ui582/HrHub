import * as presenceService from "../services/presence.service.js"
import { Response } from "express";


export const handleCheckIn = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const presence = await presenceService.checkIn(userId);

        res.status(201).json({
            message : "Pontage d'entrée réussie",
            data: presence
        })
    } catch (error: any) {
        if (error.message === "ALREADY_CHECKED_IN") {
            return res.status(400).json({ message: "Vous avez déjà pointé aujourd'hui." });
        }
        res.status(500).json({ message: "Erreur lors du pointage." });
    }
}

export const handleCheckOut = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const presence = await presenceService.checkOut(userId);

        res.status(200).json({
            message: "Pointage de sortie réussie",
            data: presence
        })
    } catch (error: any) {
        if (error.message === "INVALID_CHECKOUT") {
            return res.status(400).json({ message: "Pointage de sortie impossible (vérifiez si vous avez déjà pointé)." });
        }
        res.status(500).json({ message: "Erreur lors du pointage de sortie." });
    }
}

export const getUserHistory = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const history = await presenceService.getMyPresence(userId);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Erreur de récupération de l'historique." });
    }
};

export const getUsersHistory = async (req: any, res: Response) => {
    const data = presenceService.getAllPresence();
    res.status(200).json(data);
}