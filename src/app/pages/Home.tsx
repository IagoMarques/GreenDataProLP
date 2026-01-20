import { Hero } from "../components/Hero";
import { PainPoints } from "../components/PainPoints";
import { Features } from "../components/Features";
import { CallToAction } from "../components/CallToAction";

export const Home = () => {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <PainPoints />
      <Features />
      <CallToAction />
    </main>
  );
};
