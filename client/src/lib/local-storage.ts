import { WorkoutLog } from "@shared/schema";

const WORKOUT_LOGS_KEY = "homegym-workout-logs";

export const saveWorkoutLog = (log: Omit<WorkoutLog, "id" | "createdAt">): WorkoutLog => {
  const logs = getWorkoutLogs();
  const newLog: WorkoutLog = {
    ...log,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  logs.push(newLog);
  localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(logs));
  
  return newLog;
};

export const getWorkoutLogs = (): WorkoutLog[] => {
  try {
    const stored = localStorage.getItem(WORKOUT_LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing workout logs:", error);
    return [];
  }
};

export const deleteWorkoutLog = (id: string): void => {
  const logs = getWorkoutLogs();
  const filtered = logs.filter(log => log.id !== id);
  localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(filtered));
};

export const getWorkoutStats = () => {
  const logs = getWorkoutLogs();
  const totalWorkouts = logs.length;
  
  // Calculate current streak
  const sortedLogs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let currentStreak = 0;
  let lastDate = new Date().toISOString().split('T')[0];
  
  for (const log of sortedLogs) {
    const logDate = log.date;
    const daysDiff = Math.floor((new Date(lastDate).getTime() - new Date(logDate).getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      currentStreak++;
      lastDate = logDate;
    } else {
      break;
    }
  }
  
  // Calculate average weekly workouts (last 4 weeks)
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  const recentLogs = logs.filter(log => new Date(log.date) >= fourWeeksAgo);
  const avgWeekly = recentLogs.length / 4;
  
  return {
    totalWorkouts,
    currentStreak,
    avgWeekly: Math.round(avgWeekly * 10) / 10,
  };
};
