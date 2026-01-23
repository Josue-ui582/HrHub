import { prisma } from "../config/db.js";


const today = () => {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

export const checkIn = async (userId : number) => {
    const existing = await prisma.presence.findUnique(
        {
            where: {
                userId_date: {
                    userId,
                    date: today()
                }
            }
        }
    );

    if (existing) {
        throw new Error("ALREADY_CHECKED_IN");
    }

    return prisma.presence.create({
        data: {
            userId,
            date: today(),
            checkIn : new Date()
        }
    })
}

export const checkOut = async (userId: number) => {
    const presence = await prisma.presence.findUnique({
        where: {
            userId_date: {
                userId,
                date: today()
            }
        }
    });

    if (!presence || presence.checkIn == null || presence.checkOut) {
        throw new Error("INVALID_CHECKOUT");
    }

    const now = new Date();

    const diffInMs = now.getTime() - new Date(presence.checkIn).getTime();
    const duration = Math.floor(diffInMs / 60000);

    return prisma.presence.update({
        where: { id: presence.id },
        data: {
        checkOut: now,
        duration
        }
    });
}

export const getMyPresence = (userId: number) =>
  prisma.presence.findMany({ 
    where: { userId },
    orderBy: { date: 'desc' }
  });

export const getAllPresence = () =>
  prisma.presence.findMany({ 
    include: {
        user: { 
            select: { firstName: true, lastName: true, email: true } 
        }
    } 
  });