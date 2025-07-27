import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SmartButton from "../ui/SmartButton";
function HomePage() {
  console.log("renderd");
  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <Badge className="mb-4 px-4 py-1 rounded-full text-xs font-medium">
          Hi, I'm Nadav 👋
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-bold text-foreground text-center">
          Full Stack Developer{" "}
          <span className="font-light text-muted-foreground">
            specializing in React & Automation
          </span>
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-xl">
          Building smooth UIs & smart workflows for modern web apps.
        </p>
        <motion.div
          whileHover={{ scale: 1.25 }}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
        >
          <SmartButton asChild className="mt-4" size="lg" variant="outline">
            <a href="mailto:nadav@example.com">Let's connect&nbsp;↗</a>
          </SmartButton>
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;
