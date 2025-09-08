import { Exercise } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Info } from "lucide-react";
import { useState } from "react";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export default function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <Card className="border border-border" data-testid={`exercise-card-${index}`}>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <img
            src={`https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`}
            alt={exercise.imageAlt}
            className="w-full lg:w-48 h-32 object-cover rounded-lg"
            data-testid={`exercise-image-${index}`}
          />
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2" data-testid={`exercise-name-${index}`}>
              {index + 1}. {exercise.name}
            </h4>
            <p className="text-muted-foreground mb-3" data-testid={`exercise-muscles-${index}`}>
              Primary: {exercise.primaryMuscles}
              {exercise.secondaryMuscles && `, Secondary: ${exercise.secondaryMuscles}`}
            </p>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center p-2 bg-muted rounded" data-testid={`exercise-sets-${index}`}>
                <div className="font-bold text-primary">{exercise.sets}</div>
                <div className="text-xs text-muted-foreground">Sets</div>
              </div>
              <div className="text-center p-2 bg-muted rounded" data-testid={`exercise-reps-${index}`}>
                <div className="font-bold text-primary">{exercise.reps}</div>
                <div className="text-xs text-muted-foreground">Reps</div>
              </div>
              <div className="text-center p-2 bg-muted rounded" data-testid={`exercise-rest-${index}`}>
                <div className="font-bold text-primary">{exercise.rest}</div>
                <div className="text-xs text-muted-foreground">Rest</div>
              </div>
            </div>
            <Collapsible open={showInstructions} onOpenChange={setShowInstructions}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  data-testid={`instructions-toggle-${index}`}
                >
                  <Info className="w-4 h-4 mr-1" />
                  Form Instructions
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 p-4 bg-muted rounded-lg" data-testid={`instructions-content-${index}`}>
                <h5 className="font-semibold mb-2">Proper Form:</h5>
                <ul className="space-y-1 text-sm">
                  {exercise.instructions.map((instruction, i) => (
                    <li key={i}>• {instruction}</li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
