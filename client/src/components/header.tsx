import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { workoutProgram } from "@/lib/workout-data";

const navigation = [
  { name: "Overview", path: "/" },
  ...workoutProgram.map((workoutDay) => ({name: workoutDay.name, path: workoutDay.url})),
  { name: "Log Workout", path: "/log-workout" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">
          <a href="/">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.svg" alt="Logo" className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground" data-testid="logo">3 Days Fit</h1>
            </div>
          </a>
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "default" : "ghost"}
                  size="sm"
                  data-testid={`nav-${item.path.slice(1) || 'overview'}`}
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

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-base font-medium",
                      location === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${item.path.slice(1) || 'overview'}`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
