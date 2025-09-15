import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { workoutProgram } from "@/lib/workout-data";
import { Login } from "@/components/login";

const navigation = [
  { name: "Overview", path: "/" },
  ...workoutProgram.map((workoutDay) => ({
    name: workoutDay.name,
    path: workoutDay.url,
  })),
  { name: "Log Workout", path: "/log-workout" },
];

export default function Header() {
  const [location] = useLocation();

  return (
    <header
      className="bg-card border-b border-border sticky top-0 z-50"
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center space-x-6">
            <a href="/">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.svg"
                  alt="Logo"
                  className="w-5 h-5 text-primary"
                />
                <h1
                  className="text-xl font-bold text-foreground"
                  data-testid="logo"
                >
                  3 Days Fit
                </h1>
              </div>
            </a>

            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "default" : "ghost"}
                    size="sm"
                    data-testid={`nav-${item.path.slice(1) || "overview"}`}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      location === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side: Auth + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Login />
          </div>
        </div>
      </div>
    </header>
  );
}
