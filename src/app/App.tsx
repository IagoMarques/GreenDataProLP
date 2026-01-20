import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/CallToAction";
import { Home } from "./pages/Home";
import { AgendamentoPage } from "./pages/AgendamentoPage";
import "@/styles/fonts.css";

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/agendamento" element={<AgendamentoPage />} />
        </Routes>
      </div>
    </Router>
  );
}
