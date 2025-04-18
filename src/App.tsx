
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import VoicePage from "./pages/VoicePage";
import PhotosPage from "./pages/PhotosPage";
import LettersPage from "./pages/LettersPage";
import GamesPage from "./pages/GamesPage";
import HugPage from "./pages/HugPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/voice" element={<VoicePage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/letters" element={<LettersPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/hug" element={<HugPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
