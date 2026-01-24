import { prisma } from "../config/db.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const login = async (email : string, password : string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordValid) {
        throw new Error("INVALID_CREDENTIALS");
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET_MISSING");
    }

    const token = jwt.sign(
        {
            id : user.id,
            role : user.role
        },
        secret,
        {
            expiresIn : "1d"
        }
    )

    return {
        token,
        user : {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }
    }
}