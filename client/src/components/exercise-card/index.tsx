import { Exercise } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Info, Play, Pause, RotateCcw, Square, SquareCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
    getTodayExerciseSets,
} from "@/lib/local-storage";
import { ISingleRep, useUser } from "@/lib/store";


interface ExerciseCardProps {
    exercise: Exercise;
    exerciseIndex: number;
    dailyData: ISingleRep[];
}

export default function ExerciseCard({ exercise, exerciseIndex, dailyData }: ExerciseCardProps) {
    const [showInstructions, setShowInstructions] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [exerciseFormData, setExerciseFormData] = useState<ISingleRep[]>([]);
    const [isTimerComplete, setIsTimerComplete] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [completedSetsCount, setCompletedSetsCount] = useState(0);

    const { setDailyProgress } = useUser();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Parse rest time to seconds
    const parseRestTime = (restString: string): number => {
        const match = restString.match(/(\d+)/);
        return match ? parseInt(match[1]) : 60;
    };

    const restTimeInSeconds = parseRestTime(exercise.rest);

    const handleInputChange = (propertyName: keyof ISingleRep, setNumber: number) => (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        setExerciseFormData((prev) => {
            const newData = [...prev];
            newData[setNumber] = {
                ...newData[setNumber],
                [propertyName]: value,
            };
            // Use setTimeout to defer the store update to avoid render cycle conflicts
            setTimeout(() => {
                setDailyProgress(exercise?.id.toString(), newData);
            }, 0);
            return newData;
        });
    };

    const handleCheckboxChange = (checked: boolean, setIndex: number) => {
        let completedSets = exerciseFormData.filter((set) => set.isComplete).length;
        completedSets = checked ? completedSets + 1 : completedSets - 1;
        setCompletedSetsCount(completedSets);
        setExerciseFormData(prev => {
            const newData = [...prev];
            newData[setIndex] = { ...newData[setIndex], isComplete: checked };
            // Use setTimeout to defer the store update to avoid render cycle conflicts
            setTimeout(() => {
                setDailyProgress(exercise?.id.toString(), newData);
            }, 0);
            return newData;
        });
        if (completedSets === exercise.sets) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
        }
    };

    // Initialize exerciseFormData with dailyData or create empty sets
    useEffect(() => {
        if (dailyData && dailyData.length > 0) {
            setExerciseFormData(dailyData);
            const completedCount = dailyData.filter(set => set.isComplete).length;
            setCompletedSetsCount(completedCount);
        } else {
            // Create empty sets if no daily data exists
            const emptySets = Array(exercise.sets).fill(null).map(() => ({
                isComplete: false,
                weight: 0,
                reps: 0
            }));
            setExerciseFormData(emptySets);
            setCompletedSetsCount(0);
        }
    }, [dailyData, exercise.sets]);

    useEffect(() => {
        // Create audio for timer completion
        audioRef.current = new Audio("../sounds/1time_beep.mp3");

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

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
                                const audioContext = new (window.AudioContext ||
                                    (window as any).webkitAudioContext)();
                                const oscillator = audioContext.createOscillator();
                                const gainNode = audioContext.createGain();

                                oscillator.connect(gainNode);
                                gainNode.connect(audioContext.destination);

                                oscillator.frequency.setValueAtTime(
                                    800,
                                    audioContext.currentTime
                                );
                                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                                gainNode.gain.exponentialRampToValueAtTime(
                                    0.01,
                                    audioContext.currentTime + 0.5
                                );

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
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Card
            className="border border-border"
            data-testid={`exercise-card-${exerciseIndex}`}
        >
            <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <img
                        src={exercise.image || "/images/exercise_icon.gif"}
                        alt={exercise.imageAlt}
                        className="w-full lg:w-48 object-cover rounded-lg flex-1"
                        data-testid={`exercise-image-${exerciseIndex}`}
                    />
                    <div className="flex-1">
                        <a
                            href={exercise.details || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex gap-2 items-baseline"
                        >
                            <h4
                                className="text-lg font-semibold mb-2"
                                data-testid={`exercise-name-${exerciseIndex}`}
                            >
                                {exerciseIndex + 1}. {exercise.name}
                            </h4>
                            <img
                                src="/images/external-link-symbol.png"
                                alt="External link"
                                className="w-4 h-4"
                            />
                        </a>
                        <p
                            className="text-muted-foreground mb-3"
                            data-testid={`exercise-muscles-${exerciseIndex}`}
                        >
                            Primary: {exercise.primaryMuscles}
                            {exercise.secondaryMuscles &&
                                `, Secondary: ${exercise.secondaryMuscles}`}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="grid grid-cols-2 mb-3">
                                <div
                                    className="text-center p-2 bg-muted rounded"
                                    data-testid={`exercise-sets-${exerciseIndex}`}
                                >
                                    <div className="font-bold text-primary">{exercise.sets}</div>
                                    <div className="text-xs text-muted-foreground">Sets</div>
                                </div>
                                <div
                                    className="text-center p-2 bg-muted rounded"
                                    data-testid={`exercise-reps-${exerciseIndex}`}
                                >
                                    <div className="font-bold text-primary">{exercise.reps}</div>
                                    <div className="text-xs text-muted-foreground">Reps</div>
                                </div>
                            </div>
                            <div
                                className="text-center relative"
                                data-testid={`exercise-rest-${exerciseIndex}`}
                            >
                                <div className="p-2 bg-muted rounded h-[60px] flex items-center justify-center relative">
                                    <Button
                                        variant={
                                            isTimerComplete
                                                ? "default"
                                                : isTimerActive
                                                    ? "secondary"
                                                    : "outline"
                                        }
                                        size="sm"
                                        onClick={
                                            timeLeft === 0
                                                ? startTimer
                                                : isTimerActive
                                                    ? pauseTimer
                                                    : startTimer
                                        }
                                        className={`w-full h-10 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${isTimerComplete
                                            ? "bg-green-500 hover:bg-green-600 text-white animate-pulse"
                                            : isTimerActive
                                                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                                : "hover:bg-primary hover:text-primary-foreground"
                                            }`}
                                        data-testid={`timer-button-${exerciseIndex}`}
                                    >
                                        {isTimerActive && timeLeft > 0 && (
                                            <div
                                                className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-1000 ease-linear"
                                                style={{
                                                    width: `${((restTimeInSeconds - timeLeft) /
                                                        restTimeInSeconds) *
                                                        100
                                                        }%`,
                                                }}
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
                                            data-testid={`timer-reset-${exerciseIndex}`}
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sets Checkboxes */}
                        <div
                            className="mb-3 relative"
                            data-testid={`exercise-sets-checkboxes-${exerciseIndex}`}
                        >
                            <h5 className="text-sm font-medium mb-2">
                                Track Completed Sets:
                            </h5>
                            <div className="flex flex-col gap-2">
                                {Array.from({ length: exercise.sets }, (_, i) => (
                                    <div
                                        className="flex flex-col sm:flex-row gap-1 lg:gap-2"
                                        key={i}
                                    >
                                        <div
                                            key={i}
                                            className="flex items-center space-x-2 p-2 bg-muted rounded-lg cursor-pointer hover:shadow whitespace-nowrap"
                                            onClick={() => {
                                                const currentState = exerciseFormData[i]?.isComplete || false;
                                                handleCheckboxChange(!currentState, i);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    const currentState = exerciseFormData[i]?.isComplete || false;
                                                    handleCheckboxChange(!currentState, i);
                                                }
                                            }
                                            }
                                            role="checkbox"
                                            tabIndex={0}
                                        >
                                            {exerciseFormData[i]?.isComplete ? <SquareCheck color="gray" /> : <Square color="gray" />}
                                            <span className="text-sm font-medium cursor-pointer text-gray-600">
                                                Set {i + 1}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 flex-1 ">
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                placeholder="Weight (kg)"
                                                maxLength={5}
                                                className="sm:w-32 lg:w-32"
                                                name={`weight-${exerciseIndex}-${i}`}
                                                value={exerciseFormData[i]?.weight || ""}
                                                onChange={handleInputChange("weight", i)}
                                            />
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                placeholder="reps"
                                                maxLength={5}
                                                className="sm:w-32 lg:w-32"
                                                name={`reps-${exerciseIndex}-${i}`}
                                                value={exerciseFormData[i]?.reps || ""}
                                                onChange={handleInputChange("reps", i)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {completedSetsCount} / {exercise.sets}
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
                                                backgroundColor: [
                                                    "#ef4444",
                                                    "#f59e0b",
                                                    "#10b981",
                                                    "#3b82f6",
                                                    "#8b5cf6",
                                                    "#ec4899",
                                                ][i % 6],
                                                left: `${20 + (i % 4) * 20}%`,
                                                top: `${30 + (i % 3) * 20}%`,
                                                animationDelay: `${i * 100}ms`,
                                                animationDuration: "1s",
                                            }}
                                        />
                                    ))}

                                    {/* Center celebration text */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-lg font-bold text-sm animate-pulse shadow-lg">
                                            🎉 All Sets Complete! 🎉
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
                                                animationDuration: "0.8s",
                                            }}
                                        >
                                            ✨
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Collapsible
                            open={showInstructions}
                            onOpenChange={setShowInstructions}
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                    data-testid={`instructions-toggle-${exerciseIndex}`}
                                >
                                    <Info className="w-4 h-4 mr-1" />
                                    Form Instructions
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent
                                className="mt-4 p-4 bg-muted rounded-lg"
                                data-testid={`instructions-content-${exerciseIndex}`}
                            >
                                <h5 className="font-semibold mb-2">Proper Form:</h5>
                                <ul className="space-y-1 text-sm">
                                    {exercise.instructions.map((instruction, i) => (
                                        <li key={i}>• {instruction}</li>
                                    ))}
                                </ul>

                                <a
                                    href={`https://youtube.com/results?search_query=${exercise.name}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex items-center text-sm text-primary hover:underline"
                                >
                                    Watch Video Tutorial{" "}
                                    <img
                                        src="/images/external-link-symbol.png"
                                        alt="External link"
                                        className="w-4 h-4 ml-2"
                                    />
                                </a>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
