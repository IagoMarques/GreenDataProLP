import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PainPoints } from "./components/PainPoints";
import { Features } from "./components/Features";
import { CallToAction, Footer } from "./components/CallToAction";
import "@/styles/fonts.css";

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="relative">
        <Hero />
        <PainPoints />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
