import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Beer, Award, Clock } from 'lucide-react';

const benefits = [
  { icon: Award, title: 'Barbeiros Mestres', desc: 'Profissionais altamente qualificados com anos de experiência.' },
  { icon: Beer, title: 'Bebidas Disponíveis', desc: 'Desfrute de uma boa cerveja, refri ou água gelada enquanto aguarda.' },
  { icon: Scissors, title: 'Equipamentos Modernos', desc: 'Utilizamos apenas equipamentos da mais alta qualidade.' },
  { icon: Clock, title: 'Serviço Eficiente', desc: 'Respeitamos seu tempo sem comprometer a qualidade.' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Decorative background element - Restored to radial spotlight */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Redefinindo o Cavalheiro <span className="text-gold-500 italic">Moderno</span>.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Na Blade & Bourbon, acreditamos que o cuidado pessoal é uma forma de arte. Nossa barbearia não é apenas um lugar para cortar o cabelo; é um santuário onde a tradição encontra o estilo contemporâneo. Curamos uma atmosfera que honra o espírito clássico das barbearias integrando luxos modernos.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Esteja você se preparando para uma reunião importante, um casamento ou apenas precisando de um momento de descanso, nossa equipe dedica-se a ajudar você a ter a melhor aparência e sensação.
            </p>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
            <div className="absolute inset-0 bg-gold-500 rounded-lg transform rotate-3 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop" 
              alt="Barbeiro trabalhando" 
              className="relative rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 object-cover h-[500px] w-full"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-zinc-950/50 p-6 rounded-lg border border-zinc-800 hover:border-gold-500/50 transition-colors group"
            >
              <item.icon className="w-10 h-10 text-gold-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};