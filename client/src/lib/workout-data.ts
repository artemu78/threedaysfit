import { WorkoutDay } from "@shared/schema";

export const workoutProgram: WorkoutDay[] = [
  {
    id: "upper",
    name: "Day 1: Upper Body",
    description: "Focus on chest, shoulders, triceps, and biceps",
    warmup: [
      { name: "Arm Circles", description: "10 forward, 10 backward" },
      { name: "Shoulder Rolls", description: "10 rolls each direction" },
      { name: "Light Dumbbell Press", description: "10-15 reps with light weight" },
      { name: "Band Pull-aparts", description: "15 reps (or arm swings)" },
    ],
    exercises: [
      {
        name: "Bench Press",
        primaryMuscles: "Chest",
        secondaryMuscles: "Shoulders, Triceps",
        sets: 3,
        reps: "8-10",
        rest: "90s",
        imageAlt: "Bench Press exercise demonstration",
        instructions: [
          "Lie flat on bench with feet firmly on ground",
          "Grip bar slightly wider than shoulder-width",
          "Lower bar to chest with control",
          "Press up explosively, keeping core tight",
          "Keep shoulder blades retracted throughout"
        ],
        image: "./images/day1/Barbell-Bench-Press.gif",
        details: "https://fitnessprogramer.com/exercise/bench-press/"
      },
      {
        name: "Dumbbell Rows",
        primaryMuscles: "Back",
        secondaryMuscles: "Biceps",
        sets: 3,
        reps: "10-12",
        rest: "90s",
        imageAlt: "Dumbbell Rows exercise demonstration",
        instructions: [
          "Hinge at hips, keep back straight",
          "Pull dumbbells to ribcage",
          "Squeeze shoulder blades together",
          "Lower with control",
          "Keep core engaged throughout"
        ],
        image: "./images/day1/Dumbbell-Row.gif",
        details: "https://fitnessprogramer.com/exercise/dumbbell-row/"
      },
      {
        name: "Overhead Press",
        primaryMuscles: "Shoulders",
        secondaryMuscles: "Triceps",
        sets: 3,
        reps: "8-10",
        rest: "90s",
        imageAlt: "Overhead Press exercise demonstration",
        instructions: [
          "Stand with feet shoulder-width apart",
          "Start with dumbbells at shoulder height",
          "Press overhead in straight line",
          "Keep core tight, don't arch back",
          "Lower with control to starting position"
        ],
        image: "./images/day1/Barbell-Standing-Military-Press.gif",
        details: "https://fitnessprogramer.com/exercise/barbell-military-press/"
      },
      {
        name: "Dumbbell Curls",
        primaryMuscles: "Biceps",
        sets: 3,
        reps: "12-15",
        rest: "60s",
        imageAlt: "Dumbbell Curls exercise demonstration",
        instructions: [
          "Stand with dumbbells at sides",
          "Keep elbows close to body",
          "Curl weights up with control",
          "Squeeze at the top",
          "Lower slowly to starting position"
        ],
        image: "./images/day1/Dumbbell-Curl.gif",
        details: "https://fitnessprogramer.com/exercise/dumbbell-curl/"
      }
    ]
  },
  {
    id: "back",
    name: "Day 2: Back & Core",
    description: "Focus on back muscles, lats, and core strength",
    warmup: [
      { name: "Cat-Cow Stretches", description: "10 slow repetitions" },
      { name: "Arm Swings", description: "10 each direction" },
      { name: "Light Rows", description: "10-15 reps with light weight" },
      { name: "Torso Twists", description: "10 each side" },
    ],
    exercises: [
      {
        name: "Bent-over Barbell Rows",
        primaryMuscles: "Upper Back",
        secondaryMuscles: "Biceps",
        sets: 4,
        reps: "8-10",
        rest: "90s",
        imageAlt: "Bent-over Rows exercise demonstration",
        instructions: [
          "Hinge at hips, maintain neutral spine",
          "Pull bar to lower chest/upper abdomen",
          "Keep elbows close to body",
          "Squeeze shoulder blades at top",
          "Lower with control"
        ],
        image: "./images/day2/Barbell-Bent-Over-Row.gif",
        details: "https://fitnessprogramer.com/exercise/barbell-bent-over-row/"
      },
      {
        name: "Single-arm Dumbbell Rows",
        primaryMuscles: "Lats",
        secondaryMuscles: "Rhomboids",
        sets: 3,
        reps: "10-12",
        rest: "90s",
        imageAlt: "Single-arm Dumbbell Rows exercise demonstration",
        instructions: [
          "Support yourself on bench with one hand",
          "Pull dumbbell to hip level",
          "Keep back straight and core tight",
          "Focus on lat engagement",
          "Complete all reps before switching sides"
        ],
        image: "./images/day2/Dumbbell-Row.gif",
        details: "https://fitnessprogramer.com/exercise/dumbbell-row/"
      },
      {
        name: "Face Pulls (Reverse Fly)",
        primaryMuscles: "Rear Delts",
        secondaryMuscles: "Upper Traps",
        sets: 3,
        reps: "12-15",
        rest: "60s",
        imageAlt: "Face Pulls exercise demonstration",
        instructions: [
          "Bend forward slightly with dumbbells",
          "Lift arms out to sides, squeezing shoulder blades",
          "Focus on rear delt activation",
          "Keep slight bend in elbows",
          "Lower with control"
        ],
        image: "./images/day2/Bent-Over-Lateral-Raise.gif",
        details: "https://fitnessprogramer.com/exercise/bent-over-lateral-raise/"
      },
      {
        name: "Plank Hold",
        primaryMuscles: "Core",
        secondaryMuscles: "Shoulders",
        sets: 3,
        reps: "30-60s",
        rest: "60s",
        imageAlt: "Plank exercise demonstration",
        instructions: [
          "Support body on forearms and toes",
          "Keep body in straight line",
          "Engage core and glutes",
          "Don't let hips sag or pike up",
          "Breathe steadily throughout hold"
        ],
        image: "./images/day2/plank.gif",
        details: "https://fitnessprogramer.com/exercise/plank/"
      }
    ]
  },
  {
    id: "legs",
    name: "Day 3: Legs & Glutes",
    description: "Focus on quads, hamstrings, glutes, and calves",
    warmup: [
      { name: "Bodyweight Squats", description: "10-15 slow repetitions" },
      { name: "Leg Swings", description: "10 each direction, each leg" },
      { name: "Walking Lunges", description: "10 steps total" },
      { name: "Glute Bridges", description: "15 repetitions" },
    ],
    exercises: [
      {
        name: "Barbell Squats",
        primaryMuscles: "Quads",
        secondaryMuscles: "Glutes, Hamstrings",
        sets: 4,
        reps: "8-10",
        rest: "120s",
        imageAlt: "Barbell Squats exercise demonstration",
        instructions: [
          "Stand with feet shoulder-width apart",
          "Keep chest up and core braced",
          "Lower until thighs parallel to floor",
          "Drive through heels to stand",
          "Keep knees tracking over toes"
        ],
        image: "./images/day3/BARBELL-SQUAT.gif",
        details: "https://fitnessprogramer.com/exercise/squat/"
      },
      {
        name: "Romanian Deadlifts",
        primaryMuscles: "Hamstrings",
        secondaryMuscles: "Glutes",
        sets: 3,
        reps: "10-12",
        rest: "90s",
        imageAlt: "Romanian Deadlifts exercise demonstration",
        instructions: [
          "Start standing with bar at hip level",
          "Hinge at hips, pushing them back",
          "Keep bar close to legs",
          "Feel stretch in hamstrings",
          "Drive hips forward to return to start"
        ],
        image: "./images/day3/Barbell-Romanian-Deadlift.gif",
        details: "https://fitnessprogramer.com/exercise/romanian-deadlift/"
      },
      {
        name: "Dumbbell Lunges",
        primaryMuscles: "Quads",
        secondaryMuscles: "Glutes",
        sets: 3,
        reps: "10-12",
        rest: "90s",
        imageAlt: "Dumbbell Lunges exercise demonstration",
        instructions: [
          "Step forward into lunge position",
          "Lower until both knees at 90 degrees",
          "Keep front knee over ankle",
          "Push through front heel to return",
          "Alternate legs or complete one side first"
        ],
        image: "./images/day3/dumbbell-lunges.gif",
        details: "https://fitnessprogramer.com/exercise/dumbbell-walking-lunge/"
      },
      {
        name: "Calf Raises",
        primaryMuscles: "Calves",
        sets: 3,
        reps: "15-20",
        rest: "60s",
        imageAlt: "Calf Raises exercise demonstration",
        instructions: [
          "Stand with dumbbells at sides",
          "Rise up on toes as high as possible",
          "Squeeze calves at the top",
          "Lower slowly with control",
          "Use a step for increased range of motion"
        ],
        image: "./images/day3/Dumbbell-Calf-Raise.gif",
        details: "https://fitnessprogramer.com/exercise/calf-raise/"
      }
    ]
  }
];

export const getAllExercises = (): string[] => {
  return workoutProgram.flatMap(day => day.exercises.map(exercise => exercise.name));
};

export const getExercisesByDay = (dayId: string): string[] => {
  const day = workoutProgram.find(d => d.id === dayId);
  return day ? day.exercises.map(exercise => exercise.name) : [];
};

export const getWorkoutDay = (dayId: string): WorkoutDay | undefined => {
  return workoutProgram.find(day => day.id === dayId);
};
