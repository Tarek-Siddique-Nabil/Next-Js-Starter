import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HomePage = () => {
  const techstack = [
    {
      id: 1,
      label: "Next.js",
      logo: "nextdotjs.svg",
    },
    {
      id: 2,
      label: "Drizzle ORM",
      logo: "drizzle.svg",
    },
    {
      id: 3,
      label: "Tanstack Query",
      logo: "tanstack.png",
    },
    {
      id: 4,
      label: "ORPC ",
      logo: "orpc.webp",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8 px-4 py-8 lg:py-16">
      <div className="space-y-4 py-8 lg:py-16">
        <h1 className="text-center font-exo_2 text-2xl font-semibold lg:text-4xl">
          Simple Next Js Starter{" "}
        </h1>
        <p className="text-center font-inter text-lg text-gray-600 lg:text-xl">
          This is a simple Next.js starter template with TypeScript, Tailwind
          CSS, and more.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {techstack.map((tech) => (
          <Tooltip key={tech.id}>
            <TooltipTrigger>
              <Image
                src={`/${tech.logo}`}
                alt={tech.label}
                width={100}
                height={100}
                className="size-16 rounded-lg border border-gray-200 p-2 shadow-xl transition-all hover:scale-105 hover:shadow-cyan-500/20"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tech.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Link href={"/todos"}>TODO APP DEMO</Link>
    </main>
  );
};

export default HomePage;
