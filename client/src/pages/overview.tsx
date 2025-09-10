import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Lightbulb } from "lucide-react";
import WorkdayOverview from "@/components/workday-overview";
import { workoutProgram } from "@/lib/workout-data";

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
        {...workoutProgram.map((workoutDay, index) => <WorkdayOverview workdayId={workoutDay.id} number={index+1} />)}
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
                <li>• Add 1-2kg for upper body</li>
                <li>• Add 2-4kg for lower body</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
