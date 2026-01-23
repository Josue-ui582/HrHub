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