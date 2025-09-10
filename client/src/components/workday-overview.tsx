import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { getWorkoutDay } from "@/lib/workout-data";

interface IWorkdayOverview {
    workdayId: string;
    number: number;
}
export default function WorkdayOverview({ workdayId, number }: IWorkdayOverview) {
    const workoutDay = getWorkoutDay(workdayId);
    if (!workoutDay) {
        return <div className="text-center text-muted-foreground">Workout not found</div>;
    }

    return (
        <Card className="hover:shadow-lg transition-shadow" data-testid="workout-card-upper">
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-3">
                        {number}
                    </div>
                    <h3 className="text-xl font-semibold">{workoutDay.name}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{workoutDay.description}</p>
                <ul className="space-y-2 text-sm mb-4">
                    {...workoutDay.exercises.map((exerciseDay) => {
                        return (
                            <li className="flex items-center">
                                <Check className="w-4 h-4 text-secondary mr-2" />
                                {exerciseDay.name}
                            </li>
                        );
                    })}
                </ul>
                <Link href={workoutDay.url}>
                    <Button className="w-full" data-testid="button-view-upper">
                        View Workout
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}