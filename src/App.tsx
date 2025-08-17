
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LibraryProvider } from "./contexts/LibraryContext";
import Index from "./pages/Index";
import ReadBook from "./pages/ReadBook";
import Favorites from "./pages/Favorites";
import Reading from "./pages/Reading";
import Annotations from "./pages/Annotations";
import AreaBooks from "./pages/AreaBooks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LibraryProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/read/:bookId" element={<ReadBook />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/reading" element={<Reading />} />
              <Route path="/annotations" element={<Annotations />} />
              <Route path="/area/:areaName" element={<AreaBooks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LibraryProvider>
    </QueryClientProvider>
  );
};

export default App;
