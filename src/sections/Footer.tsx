import { motion } from 'framer-motion';
import { 
  Instagram, 
  Linkedin, 
  Github,
  Globe,
  MapPin,
  Sparkles
} from 'lucide-react';

// Social Icon Component with hover effects
const SocialIcon = ({ 
  icon: Icon, 
  href, 
  label, 
  color,
  delay 
}: { 
  icon: React.ElementType; 
  href: string; 
  label: string; 
  color: string;
  delay: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ 
      scale: 1.15, 
      rotate: 10,
      backgroundColor: color,
    }}
    whileTap={{ scale: 0.95 }}
    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-white transition-all duration-300 group"
  >
    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
  </motion.a>
);

// Animated Gradient Line
const AnimatedLine = () => (
  <div className="relative h-px w-full overflow-hidden">
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent, #FF006E, #00F5FF, #9D00FF, transparent)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['200% 0%', '-200% 0%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </div>
);

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Microsoft-Technical-Club-VIT-Bhopal', label: 'GitHub', color: '#333' },
    { icon: Linkedin, href: 'https://www.linkedin.com/groups/17283015/?feedType=highlightedFeedForGroups&highlightedUpdateUrn=urn%3Ali%3AgroupPost%3A17283015-7428341469201002496&q=highlightedFeedForGroups', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Instagram, href: 'https://www.instagram.com/mstc_vitb/', label: 'Instagram', color: '#E4405F' },
    { icon: Globe, href: 'https://mstc-vitb-website.vercel.app/', label: 'Website', color: '#00F5FF' },
  ];



  return (
    <footer className="relative bg-deep-black overflow-hidden">
      {/* Top Gradient Line */}
      <AnimatedLine />
      
      {/* Main Footer Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3"
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-vivid-purple flex items-center justify-center"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-orbitron text-2xl font-bold text-white">
                    ADVITYA
                  </h3>
                  <span className="text-neon-pink font-orbitron text-sm">2026</span>
                </div>
              </div>
              
              {/* Tagline */}
              <p className="text-white/60 text-lg mb-6 max-w-md">
                where innovation meets AI.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-5 h-5 text-neon-pink" />
                  <span>VIT Bhopal University, Kotri Kalan, Sehore, Madhya Pradesh - 466114</span>
                </div>
              </div>
            </motion.div>
            

            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h4 className="font-orbitron text-lg font-bold text-white mb-6">
                Follow Us
              </h4>
              <p className="text-white/60 text-sm mb-6">
                Stay connected for updates, behind-the-scenes, and exclusive content!
              </p>
              
              {/* Social Icons Grid */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <SocialIcon
                    key={social.label}
                    {...social}
                    delay={0.2 + index * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          

        </div>
      </div>
      

      
      {/* Background Decorations */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
