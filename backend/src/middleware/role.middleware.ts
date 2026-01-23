import { Response, NextFunction } from "express";

export const authorize = (...allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Accès refusé : vous n'avez pas les permissions nécessaires" 
      });
    }

    next();
  };
};