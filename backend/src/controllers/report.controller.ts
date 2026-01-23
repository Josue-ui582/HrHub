import { weeklyReport } from "../services/report.service.js";
import { Response } from "express";

export const getWeeklyReport = async (req: any, res: Response) => {
  const { week } = req.query;
  const data = await weeklyReport(week);
  res.json(data);
};