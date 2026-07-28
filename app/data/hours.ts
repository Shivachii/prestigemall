export const operationHours = [
  { day: "Monday", hours: "7:00 AM to 10:00 PM" },
  { day: "Tuesday", hours: "7:00 AM to 10:00 PM" },
  { day: "Wednesday", hours: "7:00 AM to 10:00 PM" },
  { day: "Thursday", hours: "7:00 AM to 10:00 PM" },
  { day: "Friday", hours: "7:00 AM to 11:00 PM" },
  { day: "Saturday", hours: "7:00 AM to 11:00 PM" },
  { day: "Sunday", hours: "7:00 AM to 11:00 PM" },
];

export function getNairobiDay() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "Africa/Nairobi",
  }).format(new Date());
}

export function getTodayHours() {
  const today = getNairobiDay();
  return operationHours.find((entry) => entry.day === today) ?? operationHours[0];
}

function toMinutes(hour: number, minute: number, period: string) {
  return (hour % 12 + (period === "PM" ? 12 : 0)) * 60 + minute;
}

export function getNairobiOpenStatus(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Nairobi",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const day = parts.find((part) => part.type === "weekday")?.value ?? getNairobiDay();
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const todayIndex = operationHours.findIndex((entry) => entry.day === day);
  const today = operationHours[todayIndex] ?? operationHours[0];
  const match = today.hours.match(/(\d+):(\d+) (AM|PM) to (\d+):(\d+) (AM|PM)/);

  if (!match) return { isOpen: false, label: "Hours today", detail: today.hours };

  const opensAt = toMinutes(Number(match[1]), Number(match[2]), match[3]);
  const closesAt = toMinutes(Number(match[4]), Number(match[5]), match[6]);
  const currentTime = hour * 60 + minute;
  const isOpen = currentTime >= opensAt && currentTime < closesAt;

  if (isOpen) return { isOpen, label: "Open now", detail: `Until ${match[4]}:${match[5]} ${match[6]}` };
  if (currentTime < opensAt) return { isOpen, label: "Closed now", detail: `Opens ${match[1]}:${match[2]} ${match[3]}` };

  const tomorrow = operationHours[(todayIndex + 1) % operationHours.length];
  const tomorrowMatch = tomorrow.hours.match(/(\d+):(\d+) (AM|PM)/);
  return {
    isOpen,
    label: "Closed now",
    detail: tomorrowMatch ? `Opens tomorrow ${tomorrowMatch[0]}` : tomorrow.hours,
  };
}
