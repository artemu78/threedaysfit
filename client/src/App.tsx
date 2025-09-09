import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import { Router } from "@/components/router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Router />
          </main>
          <footer className="bg-card border-t border-border mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-muted-foreground">
                <p>&copy; 2025 Three Days Fit. (c) Images <a href="https://fitnessprogramer.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)"}}>https://fitnessprogramer.com/</a></p>

                <p className="text-sm mt-1">No login required • Local storage • Privacy focused</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
