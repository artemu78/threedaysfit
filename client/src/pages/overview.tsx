import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Check, Lightbulb } from "lucide-react";

export default function Overview() {
  return (
    <div data-testid="overview-page">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="page-title">
          3-Day Home Gym Program
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="page-description">
          A complete strength training program designed for home gym equipment: bench press, barbell, and 2 dumbbells. 
          Perfect for all fitness levels.
        </p>
      </div>

      {/* Equipment needed */}
      <Card className="mb-8" data-testid="equipment-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wrench className="w-5 h-5 text-accent mr-2" />
            Equipment Needed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg" data-testid="equipment-barbell">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
              </svg>
              <span className="font-medium">Barbell Set</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg" data-testid="equipment-dumbbells">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
              </svg>
              <span className="font-medium">2 Dumbbells</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg" data-testid="equipment-bench">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 11h20v2H2z"/>
              </svg>
              <span className="font-medium">Bench Press</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow" data-testid="workout-card-upper">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-3">
                1
              </div>
              <h3 className="text-xl font-semibold">Upper Body</h3>
            </div>
            <p className="text-muted-foreground mb-4">Chest, shoulders, triceps, and biceps</p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Bench Press
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Dumbbell Rows
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Overhead Press
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Dumbbell Curls
              </li>
            </ul>
            <Link href="/upper-body">
              <Button className="w-full" data-testid="button-view-upper">
                View Workout
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow" data-testid="workout-card-back">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-3">
                2
              </div>
              <h3 className="text-xl font-semibold">Back & Core</h3>
            </div>
            <p className="text-muted-foreground mb-4">Back muscles, lats, and core strength</p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Bent-over Rows
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Single-arm Rows
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Face Pulls
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Planks
              </li>
            </ul>
            <Link href="/back">
              <Button className="w-full" data-testid="button-view-back">
                View Workout
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow" data-testid="workout-card-legs">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-3">
                3
              </div>
              <h3 className="text-xl font-semibold">Legs & Glutes</h3>
            </div>
            <p className="text-muted-foreground mb-4">Quads, hamstrings, glutes, and calves</p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Squats
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Romanian Deadlifts
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Lunges
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-secondary mr-2" />
                Calf Raises
              </li>
            </ul>
            <Link href="/legs">
              <Button className="w-full" data-testid="button-view-legs">
                View Workout
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Program Tips */}
      <Card data-testid="guidelines-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 text-accent mr-2" />
            Program Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Training Schedule</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Train 3 days per week</li>
                <li>• Rest 1-2 days between sessions</li>
                <li>• Complete all exercises in order</li>
                <li>• Focus on proper form first</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Progression</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Start with comfortable weights</li>
                <li>• Increase weight when you complete all sets</li>
                <li>• Add 2.5-5lbs for upper body</li>
                <li>• Add 5-10lbs for lower body</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
