import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";

import App from "./App";
import "./styles/globals.css";

import { PlanProvider } from "./contexts/PlanContext";
import { TaskProvider } from "./contexts/TaskContext";
import AuthProvider from "./providers/AuthProvider";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthProvider>
        <PlanProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </PlanProvider>
      </AuthProvider>
    </ClerkProvider>
  ,
);
