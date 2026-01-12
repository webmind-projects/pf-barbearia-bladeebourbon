import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
          alt="Atmosfera da Barbearia" 
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Main dark overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Primary Vertical Gradient - Fades to solid Zinc-950 at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-transparent to-zinc-950"></div>

        {/* Safety Buffer Gradient - Explicitly handles the bottom transition */}
        {/* using inset-x-0 ensures it stretches edge-to-edge even if w-full fails */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent"></div>
        
        {/* Final solid line at absolute bottom to prevent subpixel gaps */}
        <div className="absolute bottom-0 inset-x-0 h-2 bg-zinc-950"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-500 tracking-[0.2em] uppercase text-sm md:text-base font-medium mb-4 block">
            HÁ MAIS DE 10 ANOS
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Blade <span className="text-gold-500">&</span> Bourbon
          </h1>
          <p className="text-zinc-300 max-w-xl mx-auto text-lg md:text-xl mb-10 font-light">
            Mais do que apenas um corte. Uma experiência de cuidado atemporal e luxo moderno.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('about')}
              variant="outline"
              className="w-full sm:w-auto min-w-[160px]"
            >
              Nossa História
            </Button>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('booking')}
              className="w-full sm:w-auto min-w-[160px]"
            >
              Agendar Horário
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 mx-auto w-fit text-zinc-500 animate-bounce z-20"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};