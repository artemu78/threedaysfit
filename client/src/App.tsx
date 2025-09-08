import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Overview from "@/pages/overview";
import UpperBody from "@/pages/upper-body";
import Back from "@/pages/back";
import Legs from "@/pages/legs";
import LogWorkout from "@/pages/log-workout";
import NotFound from "@/pages/not-found";

function Router() {
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Router />
          </main>
          <footer className="bg-card border-t border-border mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-muted-foreground">
                <p>&copy; 2024 HomeGym Pro. Free fitness tracking for everyone.</p>
                <p className="text-sm mt-1">No login required • Local storage • Privacy focused</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
