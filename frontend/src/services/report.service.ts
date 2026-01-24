import { authHeader } from "./presence.service"

export const fetchWeeklyReport = async () => {
    const res = await fetch("http://localhost:5000/api/reports/weekly", {
        headers: authHeader()
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data;
}