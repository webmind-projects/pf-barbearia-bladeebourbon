import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scissors } from 'lucide-react';

interface SectionDividerProps {
  gradientClass: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ gradientClass, className = '' }) => {
  const { scrollY } = useScroll();
  // Rotates the icon based on scroll position (1 full rotation per 1200px)
  const rotate = useTransform(scrollY, [0, 1200], [0, 360]);

  return (
    <div className={`relative h-24 w-full bg-gradient-to-b ${gradientClass} flex items-center justify-center overflow-visible z-20 ${className}`}>
      <motion.div 
        style={{ rotate }}
        className="relative z-10 p-4 bg-zinc-950 border border-gold-500/30 rounded-full shadow-[0_0_20px_rgba(212,180,131,0.15)]"
      >
        <Scissors className="w-5 h-5 text-gold-500" />
      </motion.div>
    </div>
  );
};