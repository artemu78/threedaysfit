import { Switch, Route } from "wouter";
import Overview from "@/pages/overview";
import UpperBody from "@/pages/upper-body";
import Back from "@/pages/back";
import Legs from "@/pages/legs";
import LogWorkout from "@/pages/log-workout";
import NotFound from "@/pages/not-found";

export function Router() {
    return (
      <Switch>
        <Route path="/" component={Overview} />
        <Route path="/upper-body" component={UpperBody} />
        <Route path="/back" component={Back} />
        <Route path="/legs" component={Legs} />
        <Route path="/log-workout" component={LogWorkout} />
        <Route component={NotFound} />
      </Switch>
    );
  }