import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { getExercisesByDay } from "@/lib/workout-data";
import { saveWorkoutLog } from "@/lib/local-storage";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  day: z.enum(["upper", "back", "legs"], { required_error: "Please select a workout day" }),
  exercise: z.string().min(1, "Please select an exercise"),
  sets: z.number().min(1, "Sets must be at least 1").max(10, "Sets cannot exceed 10"),
  reps: z.number().min(1, "Reps must be at least 1").max(50, "Reps cannot exceed 50"),
  weight: z.number().min(0, "Weight cannot be negative"),
  notes: z.string().optional(),
});

interface WorkoutFormProps {
  onWorkoutLogged?: () => void;
}

export default function WorkoutForm({ onWorkoutLogged }: WorkoutFormProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      sets: 3,
      reps: 10,
      weight: 0,
      notes: "",
    },
  });

  const exercises = selectedDay ? getExercisesByDay(selectedDay) : [];

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      saveWorkoutLog(values);
      toast({
        title: "Workout Logged!",
        description: "Your workout has been successfully recorded.",
      });
      form.reset({
        date: new Date().toISOString().split('T')[0],
        sets: 3,
        reps: 10,
        weight: 0,
        notes: "",
      });
      setSelectedDay("");
      onWorkoutLogged?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log workout. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card data-testid="workout-form">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="w-5 h-5 text-primary mr-2" />
          Add Exercise Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} data-testid="input-date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workout Day</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedDay(value);
                    form.setValue("exercise", "");
                  }} value={field.value} data-testid="select-day">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workout day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="upper">Day 1: Upper Body</SelectItem>
                      <SelectItem value="back">Day 2: Back & Core</SelectItem>
                      <SelectItem value="legs">Day 3: Legs & Glutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exercise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} data-testid="select-exercise">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an exercise" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {exercises.map((exercise) => (
                        <SelectItem key={exercise} value={exercise}>{exercise}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="sets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sets</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-sets"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="50"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-reps"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (lbs)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="2.5"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-weight"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How did it feel? Any form notes?"
                      {...field}
                      data-testid="input-notes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" data-testid="button-submit">
              Log Workout
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
