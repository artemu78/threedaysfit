import { Exercise } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { saveExerciseSetCompletion, getTodayExerciseSets } from "@/lib/local-storage";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export default function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [completedSets, setCompletedSets] = useState<boolean[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parse rest time to seconds
  const parseRestTime = (restString: string): number => {
    const match = restString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 60;
  };

  const restTimeInSeconds = parseRestTime(exercise.rest);

  useEffect(() => {
    // Create audio for timer completion
    audioRef.current = new Audio('../sounds/1time_beep.mp3');

    // Load today's completed sets
    const todaySets = getTodayExerciseSets(exercise.name);
    const initialSets = Array(exercise.sets).fill(false);
    for (let i = 0; i < todaySets.length; i++) {
      if (i < initialSets.length) {
        initialSets[i] = todaySets[i];
      }
    }
    setCompletedSets(initialSets);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [exercise.name, exercise.sets]);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setIsTimerComplete(true);
            // Play sound when timer completes
            if (audioRef.current) {
              audioRef.current.play().catch(() => {
                // Fallback: create a beep sound using Web Audio API
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
              });
            }
            setTimeout(() => setIsTimerComplete(false), 3000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(restTimeInSeconds);
    setIsTimerActive(true);
    setIsTimerComplete(false);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeLeft(0);
    setIsTimerComplete(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetCompletion = (setIndex: number, completed: boolean) => {
    const newCompletedSets = [...completedSets];
    newCompletedSets[setIndex] = completed;
    setCompletedSets(newCompletedSets);
    saveExerciseSetCompletion(exercise.name, setIndex, completed);
    
    // Check if all sets are completed and trigger celebration
    const allCompleted = newCompletedSets.filter(Boolean).length === exercise.sets;
    if (allCompleted && completed) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  return (
    <Card className="border border-border" data-testid={`exercise-card-${index}`}>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <img
            src={exercise.image || '/images/exercise_icon.gif'}
            alt={exercise.imageAlt}
            className="w-full lg:w-48 h-32 object-cover rounded-lg"
            data-testid={`exercise-image-${index}`}
          />
          <div className="flex-1">
            <a href={exercise.details || '#'} target="_blank" rel="noopener noreferrer" className="hover:underline flex gap-2 items-baseline">
              <h4 className="text-lg font-semibold mb-2" data-testid={`exercise-name-${index}`}>
                {index + 1}. {exercise.name}
              </h4>
              <img src="/images/external-link-symbol.png" alt="External link" className="w-4 h-4" />
            </a>
            <p className="text-muted-foreground mb-3" data-testid={`exercise-muscles-${index}`}>
              Primary: {exercise.primaryMuscles}
              {exercise.secondaryMuscles && `, Secondary: ${exercise.secondaryMuscles}`}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="grid grid-cols-2 mb-3">

                <div className="text-center p-2 bg-muted rounded" data-testid={`exercise-sets-${index}`}>
                  <div className="font-bold text-primary">{exercise.sets}</div>
                  <div className="text-xs text-muted-foreground">Sets</div>
                </div>
                <div className="text-center p-2 bg-muted rounded" data-testid={`exercise-reps-${index}`}>
                  <div className="font-bold text-primary">{exercise.reps}</div>
                  <div className="text-xs text-muted-foreground">Reps</div>
                </div>
              </div>
              <div className="text-center relative" data-testid={`exercise-rest-${index}`}>
                <div className="p-2 bg-muted rounded h-[60px] flex items-center justify-center relative">
                  <Button
                    variant={isTimerComplete ? "default" : isTimerActive ? "secondary" : "outline"}
                    size="sm"
                    onClick={timeLeft === 0 ? startTimer : isTimerActive ? pauseTimer : startTimer}
                    className={`w-full h-10 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${isTimerComplete
                      ? "bg-green-500 hover:bg-green-600 text-white animate-pulse"
                      : isTimerActive
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "hover:bg-primary hover:text-primary-foreground"
                      }`}
                    data-testid={`timer-button-${index}`}
                  >
                    {isTimerActive && timeLeft > 0 && (
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${((restTimeInSeconds - timeLeft) / restTimeInSeconds) * 100}%` }}
                      />
                    )}
                    <div className="flex items-center space-x-1">
                      {timeLeft === 0 || !isTimerActive ? (
                        <Play className="w-3 h-3" />
                      ) : (
                        <Pause className="w-3 h-3" />
                      )}
                    </div>
                    <span className="font-bold text-xs">
                      {timeLeft > 0 ? formatTime(timeLeft) : exercise.rest}
                    </span>
                  </Button>
                  {(isTimerActive || timeLeft > 0) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetTimer}
                      className="absolute -top-1 -right-1 w-6 h-6 p-0 rounded-full bg-background border border-border hover:bg-muted"
                      data-testid={`timer-reset-${index}`}
                    >
                      <RotateCcw className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sets Checkboxes */}
            <div className="mb-3 relative" data-testid={`exercise-sets-checkboxes-${index}`}>
              <h5 className="text-sm font-medium mb-2">Track Completed Reps:</h5>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: exercise.sets }, (_, i) => (
                  <div key={i} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <Checkbox
                      id={`set-${index}-${i}`}
                      checked={completedSets[i] || false}
                      onCheckedChange={(checked) => handleSetCompletion(i, !!checked)}
                      data-testid={`checkbox-set-${index}-${i}`}
                    />
                    <label
                      htmlFor={`set-${index}-${i}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      Rep {i + 1}
                    </label>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Completed: {completedSets.filter(Boolean).length} / {exercise.sets}
              </div>
              
              {/* Fireworks Animation */}
              {showCelebration && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Firework particles */}
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-ping"
                      style={{
                        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][i % 6],
                        left: `${20 + (i % 4) * 20}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                  
                  {/* Center celebration text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-lg font-bold text-sm animate-pulse shadow-lg">
                      🎉 All Reps Complete! 🎉
                    </div>
                  </div>
                  
                  {/* Additional sparkle effects */}
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={`sparkle-${i}`}
                      className="absolute text-yellow-400 animate-bounce"
                      style={{
                        left: `${10 + (i % 5) * 18}%`,
                        top: `${20 + (i % 4) * 15}%`,
                        animationDelay: `${i * 150}ms`,
                        animationDuration: '0.8s'
                      }}
                    >
                      ✨
                    </div>
                  ))}
                </div>
              )}
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
