import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
      const hour = now.getHours();

      // Business Logic
      // Sunday: Closed
      if (day === 0) {
        setIsOpen(false);
        return;
      }

      // Monday - Friday: 09:00 - 20:00
      if (day >= 1 && day <= 5) {
        setIsOpen(hour >= 9 && hour < 20);
        return;
      }

      // Saturday: 10:00 - 18:00
      if (day === 6) {
        setIsOpen(hour >= 10 && hour < 18);
        return;
      }
    };

    checkStatus();
    // Check every minute
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center"
    >
      {/* Brand Name */}
      <div className="font-serif font-bold text-xl text-white tracking-wide">
        Blade <span className="text-gold-500">&</span> Bourbon
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-800 shadow-lg">
        <span className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </span>
        <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
          {isOpen ? 'Aberto' : 'Fechado'}
        </span>
      </div>
    </motion.header>
  );
};