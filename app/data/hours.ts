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
