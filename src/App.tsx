
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Upload from "./pages/Upload";
import InvoiceDetail from "./pages/InvoiceDetail";
import RuleConfig from "./pages/RuleConfig";
import TeamMembersPage from "./pages/TeamMembers";
import Home from "./pages/Home";
import Header, { UserRole } from "./components/Header";

const queryClient = new QueryClient();
const ROLES = ["Admin", "Manager", "Processor", "Viewer"] as const;

// Simple keys for demo/prototype session
const LOGIN_KEY = "risolto_logged_in";
const ROLE_KEY = "risolto_user_role";

function App() {
  // Default role for prototype; only relevant when logged in
  const [role, setRole] = useState<UserRole>("Admin");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  // Sync login state with localStorage
  useEffect(() => {
    const lsLogged = localStorage.getItem(LOGIN_KEY) === "true";
    setLoggedIn(lsLogged);
    if (lsLogged) {
      const savedRole = localStorage.getItem(ROLE_KEY) as UserRole;
      if (savedRole && ROLES.includes(savedRole)) {
        setRole(savedRole);
      }
    }
  }, []);

  // When role changes, persist to localStorage (only if logged in)
  useEffect(() => {
    if (loggedIn) localStorage.setItem(ROLE_KEY, role);
  }, [role, loggedIn]);

  // Login: set flag and go to dashboard
  const login = () => {
    localStorage.setItem(LOGIN_KEY, "true");
    setLoggedIn(true);
    navigate("/dashboard");
  };

  // Logout: clear flag/role and return home
  const logout = () => {
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(ROLE_KEY);
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <Header
            role={role}
            setRole={setRole}
            loggedIn={loggedIn}
            onLogout={logout}
          />
          <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn} onLogin={login} />} />
            <Route
              path="/dashboard"
              element={
                loggedIn
                  ? <Index role={role} setRole={setRole} />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/upload"
              element={
                loggedIn
                  ? <Upload />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/invoice/:invoiceId"
              element={
                loggedIn
                  ? <InvoiceDetail />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/rules"
              element={
                loggedIn
                  ? <RuleConfig />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/teammembers"
              element={
                loggedIn
                  ? <TeamMembersPage />
                  : <Navigate to="/" replace />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
