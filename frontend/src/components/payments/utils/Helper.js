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

export const recommend = (userSkills, jobs) => {
  console.log(userSkills);
  const jobSkill = jobs.map((job) => job.skills.map((skill) => skill));

  const filter = jobSkill.map((skill, i) => skill.map((skill) => skill.skills));
  let percentMatch = [];

  for (let i = 0; i < filter.length; i++) {
    percentMatch.push(findPercent(userSkills, filter[i]));
  }

  const getJob = jobs.filter((job, i) => percentMatch[i] > 50);
  return getJob;

  //  return jobs.filter((job, i) => job.skills === userSkills);
};

const findPercent = (userSkills, requiredSkills) => {
  const removeDuplicateFromuserSkills = [...new Set(userSkills)];

  const removeDuplicateFromRequiredSkills = [...new Set(requiredSkills)];

  const getTotalRequiredSkillsLength = removeDuplicateFromRequiredSkills.length;

  let value = 0;

  removeDuplicateFromuserSkills.map((skill) =>
    removeDuplicateFromRequiredSkills.map((required) => {
      if (skill?.toLowerCase() === required?.toLowerCase()) {
        value++;
      }
      return value;
    })
  );

  const getPercentMatch = Math.round(
    (value / getTotalRequiredSkillsLength) * 100
  );
  return getPercentMatch;
};
