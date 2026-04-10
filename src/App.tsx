import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Schedule from "./pages/Schedule";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import TicketPrices from "./pages/TicketPrices";
import FloorAccess from "./pages/FloorAccess";
import Merch from "./pages/Merch";
import MerchLink from "./pages/MerchLink";
import Parking from "./pages/Parking";

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
          <Route path="/registration" element={<Registration />} />
          <Route path="/tickets" element={<TicketPrices />} />
          <Route path="/floor-access" element={<FloorAccess />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/merch-link" element={<MerchLink />} />
          <Route path="/parking" element={<Parking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
