import * as authService from "../services/auth.service.js"
import type { Request, Response } from "express";

export const register = async (req : Request, res : Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error : any) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req : Request, res : Response) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.status(200).json(data);
    } catch (error : any) {
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect"
            });
        }
        res.status(500).json({ message: "Erreur serveur" });
    }
}