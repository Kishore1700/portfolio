import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Flagships } from "@/components/Flagships";
import { Matrix } from "@/components/Matrix";
import { ExperienceEducation } from "@/components/ExperienceEducation";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <About />
      <Flagships />
      <Matrix />
      <ExperienceEducation />
      <Contact />
    </div>
  );
}

