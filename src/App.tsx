import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import SimpleAdminDashboardNew from "./pages/SimpleAdminDashboardNew";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Guide from "./pages/Guide";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import Unauthorized from "./pages/Unauthorized";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import QuickSetup from "@/components/admin/QuickSetup";
=======
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
<<<<<<< HEAD
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/team" element={<Team />} />
              <Route path="/how-to-use" element={<Guide />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user-dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute requireAdmin>
                  <SimpleAdminDashboardNew />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/setup" element={<QuickSetup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
=======
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/team" element={<Team />} />
                <Route path="/how-to-use" element={<Guide />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<SimpleAdminDashboardNew />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
