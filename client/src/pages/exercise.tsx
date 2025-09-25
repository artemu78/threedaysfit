import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import { getWorkoutDay } from "@/lib/workout-data";
import ExerciseCard from "@/components/exercise-card";
import { useUser } from "@/lib/store";

export default function ExercisePage({ workoutId }: { workoutId: string }) {
  const workoutDay = getWorkoutDay(workoutId);
  const { user } = useUser();

  if (!workoutDay) {
    return <div className="text-center text-muted-foreground">Workout not found</div>;
  }

  return (
    <div data-testid="upper-body-page">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2" data-testid="page-title">
          {workoutDay.name}
        </h2>
        <p className="text-muted-foreground" data-testid="page-description">
          {workoutDay.description}
        </p>
      </div>

      {/* Warm-up */}
      <Card className="mb-6" data-testid="warmup-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Play className="w-5 h-5 text-accent mr-2" />
            Warm-up (5-10 minutes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workoutDay.warmup.map((exercise, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg" data-testid={`warmup-exercise-${index}`}>
                <h4 className="font-medium mb-2">{exercise.name}</h4>
                <p className="text-sm text-muted-foreground">{exercise.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Exercises */}
      <Card data-testid="exercises-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
            </svg>
            Main Exercises
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {workoutDay.exercises.map((exercise, index) => (
            <ExerciseCard 
              key={index} 
              exercise={exercise} 
              exerciseIndex={index} 
              dailyData={user?.dailyData?.[exercise.id.toString()] || []}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
