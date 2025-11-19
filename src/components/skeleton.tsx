import {
  AppWindow,
  Smartphone,
  Palette,
  Cloud,
  PlugZap,
  Globe,
  Cpu,
  FileJson,
  Database,
  Layers,
  Braces,
  Code,
  Server,
  Github,
  GitBranch,
  LineChart,
  CreditCard,
  BarChart3,
  Figma,
  Boxes,
  Terminal,
  CloudRain,
  CloudCog,
} from "lucide-react";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Service = {
  title: string;
  description: string;
  tags: string[];
  icon: any;
};

const tagIcons: Record<string, any> = {
  // Frameworks / Frontend
  "Next.js": Globe,
  "React Native": Smartphone,
  Flutter: Smartphone,
  Angular: Braces,
  SEO: LineChart,

  // Tools
  Hosting: Server,
  Figma: Figma,
  Wireframes: Layers,
  Prototypes: Layers,

  // DevOps
  AWS: Cloud,
  Docker: Boxes,
  "CI/CD": GitBranch,

  // APIs
  Stripe: CreditCard,
  HubSpot: BarChart3,
  Salesforce: Database,

  // Mobile / misc
  APIs: FileJson,
};

const getTagIcon = (tag: string) => {
  return tagIcons[tag] || Code;
};

const services: Service[] = [
  {
    title: "Website Development",
    description:
      "Modern, scalable and SEO optimized websites built with React, Next.js and Angular.",
    tags: ["Next.js", "Angular", "SEO", "Hosting"],
    icon: AppWindow,
  },
  {
    title: "Mobile App Development",
    description:
      "Beautiful and fast mobile applications for iOS and Android using React Native & Flutter.",
    tags: ["React Native", "Flutter", "APIs"],
    icon: Smartphone,
  },
  {
    title: "UI/UX & Product Design",
    description:
      "User-centered design, wireframes, prototypes, and complete design systems.",
    tags: ["Figma", "Wireframes", "Prototypes"],
    icon: Palette,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Deploy, scale, and monitor your applications on AWS, GCP, and Azure.",
    tags: ["AWS", "Docker", "CI/CD"],
    icon: Cloud,
  },
  {
    title: "API Integrations",
    description:
      "Integrate CRMs, payment gateways, AI models, analytics & external APIs.",
    tags: ["Stripe", "HubSpot", "Salesforce"],
    icon: PlugZap,
  },
];

const badgeColors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

const Skeleton = () => {
  const items = Array.from({ length: 5 }, (_, i) => i);
  const [activeCards, setActiveCards] = useState<number[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    let interval: any;

    if (isInView) {
      setActiveCards(null);

      interval = setInterval(() => {
        setActiveCards((prev) => {
          if (!prev) return [items[0]];
          if (prev.length >= items.length) {
            clearInterval(interval);
            return prev;
          }
          return [items[prev.length], ...prev];
        });
      }, 1000);
    } else {
      setActiveCards(null);
    }

    return () => interval && clearInterval(interval);
  }, [isInView]);

  return (
    <section className="pt-10 md:pt-20 lg:pt-32 relative overflow-hidden ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x border-y border-neutral-200 dark:border-neutral-800 divide-neutral-200 dark:divide-neutral-800">
          {/* LEFT SIDE */}
          <div className="px-4 pt-4 h-96">
            <h1 className="text-lg font-bold text-neutral-800">Our Services</h1>
            <p className="text-neutral-600 mt-2">
              We build powerful digital products ranging from mobile apps to
              cloud systems and enterprise web platforms.
            </p>

            <motion.div
              ref={ref}
              layout
              className="max-w-sm rounded-t-[50px] squircle bg-neutral-100 border border-neutral-200 flex-1 mx-auto size-full p-1.5 space-y-1.5 mt-6"
            >
              {activeCards?.map((index) => {
                const service = services[index];
                const color = badgeColors[index % badgeColors.length];
                const Icon = service.icon;

                return (
                  <motion.div
                    layout
                    key={index}
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="p-4 shadow-black/10 border border-transparent ring-1 rounded-[36px] squircle ring-black/10 bg-white"
                  >
                    <div className="flex gap-2">
                      <div
                        className={`w-8 h-8 p-px flex items-center justify-center rounded-full ${color}`}
                      >
                        <Icon className="w-8 h-8 text-white p-1" />
                      </div>

                      <div className="flex-1">
                        <h1 className="text-sm font-semibold text-neutral-800">
                          {service.title}
                        </h1>

                        <p className="text-neutral-600 text-xs mt-1 leading-snug">
                          {service.description}
                        </p>

                        {/* TAGS WITH ICONS */}
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {service.tags.map((tag) => {
                            const TagIcon = getTagIcon(tag);
                            return (
                              <span
                                key={tag}
                                className="text-xs border px-2 py-0.5 rounded-full squircle text-neutral-700 flex items-center gap-1"
                              >
                                <TagIcon className="w-3 h-3" />
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-4">
            <h1 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
              Our Expertise
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              We specialize in modern product development, from frontend to
              backend to cloud infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skeleton;
