import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const formatDisplayTime = (rawString: string | null) => {
  if (!rawString) return "-- : --";

  if (rawString.includes('UTC')) {
    const timePart = rawString.split('UTC')[1];
    if (timePart && timePart.length >= 4) {
      const hh = timePart.substring(0, 2);
      const mm = timePart.substring(2, 4);
      return `${hh} : ${mm}`;
    }
  }

  const parsed = dayjs(rawString, "YYYYMMDDHHmm");
  
  if (parsed.isValid()) {
    return parsed.format('HH : mm');
  }

  return "-- : --";
};

export const formatDurationFriendly = (durationMinutes: number | any) => {
  if (!durationMinutes || isNaN(durationMinutes)) return "-";
  
  const minutes = Number(durationMinutes);
  
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} h ${remainingMinutes}` 
      : `${hours} h`;
  }
};