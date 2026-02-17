import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap } from "lucide-react";

// Floating 3D Shape Component
const FloatingShape = ({
  color,
  size,
  initialX,
  initialY,
  delay = 0,
  shape = "circle",
}: {
  color: string;
  size: number;
  initialX: string;
  initialY: string;
  delay?: number;
  shape?: "circle" | "square" | "triangle";
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: initialX,
        top: initialY,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 0.6,
        scale: 1,
        y: [0, -30, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 20, repeat: Infinity, ease: "linear", delay },
      }}
    >
      {shape === "circle" && (
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `linear-gradient(135deg, ${color}, transparent)`,
            boxShadow: `0 0 30px ${color}40`,
          }}
        />
      )}
      {shape === "square" && (
        <div
          className="w-full h-full rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}, transparent)`,
            boxShadow: `0 0 30px ${color}40`,
            transform: "rotate(45deg)",
          }}
        />
      )}
      {shape === "triangle" && (
        <div
          className="w-0 h-0"
          style={{
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            filter: `drop-shadow(0 0 20px ${color})`,
          }}
        />
      )}
    </motion.div>
  );
};

// Particle Component
const Particle = ({ delay = 0 }: { delay?: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const size = Math.random() * 4 + 2;

  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [0, -100],
        scale: [1, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position to parallax offset
  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-mesh"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 110, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 110, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating 3D Shapes with Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <FloatingShape
          color="#FF006E"
          size={120}
          initialX="10%"
          initialY="20%"
          delay={0}
          shape="circle"
        />
        <FloatingShape
          color="#00F5FF"
          size={80}
          initialX="85%"
          initialY="15%"
          delay={0.5}
          shape="square"
        />
        <FloatingShape
          color="#9D00FF"
          size={100}
          initialX="75%"
          initialY="70%"
          delay={1}
          shape="triangle"
        />
        <FloatingShape
          color="#FFE600"
          size={60}
          initialX="5%"
          initialY="60%"
          delay={1.5}
          shape="circle"
        />
        <FloatingShape
          color="#FF006E"
          size={90}
          initialX="50%"
          initialY="85%"
          delay={2}
          shape="square"
        />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Badge */}

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-orbitron text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight"
        >
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-vivid-purple to-electric-blue animate-pulse-glow">
              ADVITYA
            </span>
          </span>
          <br />
          <span className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            2026
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-white/80 font-inter mb-4"
        >
          where innovation meets{" "}
          <span className="text-neon-pink font-bungee">AI</span>
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-electric-blue" />
          <span className="text-electric-blue font-orbitron text-lg tracking-widest">
            2026
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-electric-blue" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "#00F5FF" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-electric-blue/50 rounded-full font-orbitron font-semibold text-electric-blue text-lg hover:bg-electric-blue/10 transition-all duration-300 flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            View Events
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "1500+", label: "Participants" },
            { value: "8+", label: "Events" },
            { value: "45+", label: "Members" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="text-center"
            >
              <div className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-blue">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
