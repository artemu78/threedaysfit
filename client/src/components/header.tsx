import { Link, useLocation } from "wouter";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { workoutProgram } from "@/lib/workout-data";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "Overview", path: "/" },
  ...workoutProgram.map((workoutDay) => ({name: workoutDay.name, path: workoutDay.url})),
  { name: "Log Workout", path: "/log-workout" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center space-x-6">
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
          </div>

          {/* Right side: Auth + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="user-avatar">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={logout} data-testid="logout-button">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={login}
                variant="outline"
                size="sm"
                data-testid="login-button"
                className="hidden md:inline-flex"
              >
                Login
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
              data-testid="mobile-menu-button"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
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
                    onClick={closeMobileMenu}
                    data-testid={`mobile-nav-${item.path.slice(1) || 'overview'}`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Authentication */}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.picture} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full justify-start text-base font-medium"
                      data-testid="mobile-logout-button"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      login();
                      closeMobileMenu();
                    }}
                    variant="outline"
                    className="w-full justify-center text-base font-medium"
                    data-testid="mobile-login-button"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
