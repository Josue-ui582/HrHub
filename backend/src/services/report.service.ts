import { prisma } from "../config/db.js";

const getWeekRange = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay() || 7;

  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 1);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};



export const weeklyReport = async (dateInput?: string) => {
  const { monday, sunday } = getWeekRange(dateInput ? new Date(dateInput) : new Date());

  const presences = await prisma.presence.findMany({
    where: {
      date: { gte: monday, lte: sunday },
      duration: { not: null }
    },
    include: { 
      user: { select: { firstName: true, lastName: true } } 
    }
  });

  const reportMap: Record<number, any> = {};

  presences.forEach(p => {
    if (!reportMap[p.userId]) {
      reportMap[p.userId] = {
        userId: p.userId,
        fullName: `${p.user.firstName} ${p.user.lastName}`,
        totalMinutes: 0,
        daysWorked: 0
      };
    }
    reportMap[p.userId].totalMinutes += p.duration || 0;
    reportMap[p.userId].daysWorked += 1;
  });

  return Object.values(reportMap).map(r => ({
    ...r,
    totalHours: parseFloat((r.totalMinutes / 60).toFixed(2))
  }));
};