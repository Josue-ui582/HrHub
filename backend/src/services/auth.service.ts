import { prisma } from "../config/db.js";
import * as bcrypt from "bcrypt";

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async (data: RegisterData) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const user = await prisma.user.create({
            data: { ...data, password: hashedPassword },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true
            }
        });
        
        return user;
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error("Cet email est déjà utilisé.");
        }
        throw error;
    }
}