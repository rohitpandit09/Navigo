import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExpertPanel from "./pages/ExpertPanel";
import ArchivePanel from "./pages/ArchivePanel";



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/expert-panel" element={<ExpertPanel />} />
      <Route path="/archive-panel" element={<ArchivePanel />} />

    </Routes>
  </BrowserRouter>
);

export default App;
