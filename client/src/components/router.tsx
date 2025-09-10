import { Switch, Route } from "wouter";
import Overview from "@/pages/overview";
import UpperBody from "@/pages/body";
import Back from "@/pages/back";
import Legs from "@/pages/legs";
import LogWorkout from "@/pages/log-workout";
import NotFound from "@/pages/not-found";
import ExercisePage from "@/pages/exercise";

export function Router() {
  return (
    <Switch>
      <Route path="/" component={Overview} />
      <Route path="/log-workout" component={LogWorkout} />
      <Route path="/:workoutDayId">
        {params => <ExercisePage workoutId={params.workoutDayId} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}