import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";

function App() {
  return (
    <Router basename="/fun-picture-swipes">
      <div className="bg-background text-foreground min-h-screen">
        <main className="w-full mx-auto max-w-5xl px-3 sm:px-4 md:px-8 py-4 sm:py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;