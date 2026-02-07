import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Schedule from "./pages/Schedule";
import Events from "./pages/Events";
import Hotels from "./pages/Hotels";
import FAQ from "./pages/FAQ";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import OtherEvents from "./pages/OtherEvents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/events" element={<Events />} />
          <Route path="/otherevents" element={<OtherEvents />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/registration" element={<Registration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
