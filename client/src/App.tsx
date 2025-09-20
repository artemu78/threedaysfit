import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Router } from "@/components/router";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc4Op3ol10fColdBsOvLhMWFnHecwvw3k",
  authDomain: "days-fit-471521.firebaseapp.com",
  projectId: "days-fit-471521",
  storageBucket: "days-fit-471521.firebasestorage.app",
  messagingSenderId: "107916257043",
  appId: "1:107916257043:web:a3da5ec4a59bbefc149ce6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing Google Client ID");
  }
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
