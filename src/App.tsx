
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  // Default user role to 'Admin', can be changed as desired
  const [role, setRole] = useState<UserRole>("Admin");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header role={role} setRole={setRole} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/invoice/:invoiceId" element={<InvoiceDetail />} />
            <Route path="/rules" element={<RuleConfig />} />
            <Route path="/teammembers" element={<TeamMembersPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
