import { formatDistanceToNow } from "date-fns";

export const moneyToBeProviedToClients = (totalSalary) => {
  const calculateFivePercentOff = (totalSalary / 100) * 5;
  return totalSalary - calculateFivePercentOff;
};

export const calaulateProjectDuration = (EndDate) => {
  return formatDistanceToNow(EndDate);
};

export const calculateWeekly = (totalSalary, totalDuration) => {
  const totalWeeks = totalDuration?.slice(0, 2) * 4;
  return totalSalary / totalWeeks;
};

export const calculateMonthly = (totalSalary, totalDuration) => {
  return totalSalary / totalDuration?.slice(0, 2);
};
