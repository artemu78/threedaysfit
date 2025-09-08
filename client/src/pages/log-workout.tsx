import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, History } from "lucide-react";
import WorkoutForm from "@/components/workout-form";
import { getWorkoutLogs, getWorkoutStats } from "@/lib/local-storage";
import { WorkoutLog } from "@shared/schema";

export default function LogWorkout() {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [stats, setStats] = useState({ totalWorkouts: 0, currentStreak: 0, avgWeekly: 0 });

  const loadData = () => {
    setWorkoutLogs(getWorkoutLogs().slice(0, 5)); // Show only recent 5
    setStats(getWorkoutStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const getDayName = (dayId: string) => {
    const dayNames = {
      upper: "Upper Body",
      back: "Back & Core", 
      legs: "Legs & Glutes"
    };
    return dayNames[dayId as keyof typeof dayNames] || dayId;
  };

  return (
    <div data-testid="log-workout-page">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2" data-testid="page-title">
          Log Your Workout
        </h2>
        <p className="text-muted-foreground" data-testid="page-description">
          Track your progress by logging sets, reps, and weights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log Form */}
        <WorkoutForm onWorkoutLogged={loadData} />

        {/* Recent Logs */}
        <Card data-testid="recent-workouts-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="w-5 h-5 text-secondary mr-2" />
              Recent Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3" data-testid="recent-workouts-list">
              {workoutLogs.length === 0 ? (
                <p className="text-muted-foreground text-center py-4" data-testid="empty-state">
                  No workouts logged yet. Start by logging your first workout above!
                </p>
              ) : (
                workoutLogs.map((workout) => (
                  <div key={workout.id} className="border border-border rounded-lg p-3" data-testid={`workout-log-${workout.id}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium" data-testid={`workout-exercise-${workout.id}`}>
                        {workout.exercise}
                      </h4>
                      <span className="text-xs text-muted-foreground" data-testid={`workout-date-${workout.id}`}>
                        {new Date(workout.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`workout-details-${workout.id}`}>
                      {workout.sets} sets × {workout.reps} reps @ {workout.weight} lbs
                    </div>
                    <div className="text-xs text-muted-foreground mt-1" data-testid={`workout-day-${workout.id}`}>
                      {getDayName(workout.day)}
                    </div>
                    {workout.notes && (
                      <div className="text-xs text-muted-foreground mt-1 italic" data-testid={`workout-notes-${workout.id}`}>
                        "{workout.notes}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {workoutLogs.length > 0 && (
              <Button variant="outline" className="w-full mt-4" data-testid="button-view-all">
                View All Workouts ({getWorkoutLogs().length} total)
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <Card className="mt-8" data-testid="progress-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 text-accent mr-2" />
            Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Track your strength gains over time</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-total-workouts">
              <div className="text-2xl font-bold text-primary">{stats.totalWorkouts}</div>
              <div className="text-sm text-muted-foreground">Total Workouts</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-current-streak">
              <div className="text-2xl font-bold text-secondary">{stats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-avg-weekly">
              <div className="text-2xl font-bold text-accent">{stats.avgWeekly}</div>
              <div className="text-sm text-muted-foreground">Avg. Weekly</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
