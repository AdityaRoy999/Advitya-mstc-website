import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Trophy, Users, ArrowRight, Code2, Bot } from 'lucide-react';

// 3D Card Component with Mouse Tracking
interface Card3DProps {
  title: string;
  date: string;
  description: string;
  prize: string;
  cta: string;
  image: string;
  regLink: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

const Card3D = ({ title, date, description, prize, cta, icon, gradient, delay, image, regLink }: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Glow position
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="perspective-1000 w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-[500px] rounded-3xl overflow-hidden cursor-pointer group"
      >
        {/* Card Background with Gradient and Image */}
        <div 
          className="absolute inset-0 transition-all duration-300 overflow-hidden"
          style={{ background: gradient }}
        >
          <motion.img 
            src={image} 
            alt={title}
            role="presentation"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-black/30" />
        </div>
        
        {/* Dynamic Glow Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(255,255,255,0.3) 0%, transparent 60%)`,
          }}
        />
        
        {/* Card Content */}
        <div className="relative z-10 h-full p-8 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
          {/* Top Section */}
          <div>
            {/* Icon */}
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {icon}
            </motion.div>
            
            {/* Title */}
            <h3 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-2">
              {title}
            </h3>
            
            {/* Date */}
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{date}</span>
            </div>
            
            {/* Description */}
            <p className="text-white/80 text-base leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Bottom Section */}
          <div>
            {/* Prize */}
            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <Trophy className="w-6 h-6 text-bright-yellow" />
              <div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Prize Pool</div>
                <div className="font-orbitron text-xl font-bold text-bright-yellow">{prize}</div>
              </div>
            </div>
            
            {/* CTA Button */}
            <motion.a
              href={regLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-gray-900 rounded-xl font-orbitron font-bold text-lg flex items-center justify-center gap-2 group/btn hover:bg-bright-yellow transition-colors duration-300"
            >
              {cta}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? '0 0 40px rgba(255,255,255,0.3), inset 0 0 40px rgba(255,255,255,0.1)' 
              : '0 0 0px rgba(255,255,255,0)'
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Floating Decoration Component
const FloatingDecoration = ({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, 0, -5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default function EventCards() {
  const events = [
    {
      title: 'CODE GARUDA 4.0',
      date: 'February 27, 2026',
      description: 'The AI Mashup Hackathon! A 4-hour high-energy challenge where teams receive surprise concept cards and use AI tools to design, prototype, and pitch creative solutions.',
      prize: 'Medals & Trophies',
      cta: 'Register now',
      regLink: 'https://forms.gle/zFfRGnGDzsy5ERbRA',
      image: '/code-garuda-4/CG 4.jpg.jpeg',
      icon: <Code2 className="w-8 h-8 text-white" />,
      gradient: 'linear-gradient(145deg, #FF006E 0%, #9D00FF 100%)',
    },
    {
      title: 'CRAZE CHASE ’26',
      date: 'February 28, 2026',
      description: 'A high-energy team challenge! Speed, strategy, trust, and coordination decide the winners. Features mini-games and a thrilling life-size Battleship finale.',
      prize: 'Exciting Goodies',
      cta: 'Register now',
      regLink: 'https://forms.gle/SP3moxr9DtDFP4dR9',
      image: '/vainateya-3/vainetaya 3.0.jpg',
      icon: <Bot className="w-8 h-8 text-white" />,
      gradient: 'linear-gradient(145deg, #00F5FF 0%, #0066FF 100%)',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-deep-black overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Floating Decorations */}
        <FloatingDecoration className="top-20 left-10" delay={0}>
          <div className="w-20 h-20 rounded-full bg-neon-pink/20 blur-xl" />
        </FloatingDecoration>
        
        <FloatingDecoration className="top-40 right-20" delay={1}>
          <div className="w-16 h-16 rounded-full bg-electric-blue/20 blur-xl" />
        </FloatingDecoration>
        
        <FloatingDecoration className="bottom-32 left-1/4" delay={2}>
          <div className="w-24 h-24 rounded-full bg-vivid-purple/20 blur-xl" />
        </FloatingDecoration>
      </div>
      
      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-electric-blue/30 mb-6">
            <Users className="w-4 h-4 text-electric-blue" />
            <span className="text-sm font-medium text-white/80">Featured Events</span>
          </div>
          
          <h2 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Epic{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-blue">
              Battles
            </span>{' '}
            Await
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Choose your arena. Compete with the best. Claim your glory.
          </p>
        </motion.div>
      </div>
      
      {/* Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card3D
              key={event.title}
              {...event}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />
    </section>
  );
}
