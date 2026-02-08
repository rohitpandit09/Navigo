import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExpertPanel from "./pages/ExpertPanel";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/expert-panel" element={<ExpertPanel />} />

      
    </Routes>
  </BrowserRouter>
);

export default App;
