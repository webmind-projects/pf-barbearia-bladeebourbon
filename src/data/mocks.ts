
import { Barber, Service } from '../types';

export const SERVICES: Service[] = [
  // Hair
  { 
    id: '1', 
    name: 'Corte Executivo', 
    price: 65, 
    duration: 45, 
    description: 'Corte preciso, lavagem, finalização e toalha quente. O padrão para o profissional moderno.',
    category: 'hair'
  },
  { 
    id: '6', 
    name: 'Corte Social', 
    price: 50, 
    duration: 30, 
    description: 'Corte tradicional com tesoura ou máquina, rápido e elegante.',
    category: 'hair'
  },
  
  // Beard
  { 
    id: '2', 
    name: 'Barba Terapia', 
    price: 45, 
    duration: 30, 
    description: 'Alinhamento com navalha, aparo e aplicação de óleos essenciais para um visual limpo.',
    category: 'beard'
  },
  { 
    id: '3', 
    name: 'Barba Real', 
    price: 55, 
    duration: 30, 
    description: 'Barbear tradicional com navalha, espuma quente e finalização com toalha fria.',
    category: 'beard'
  },

  // Combos
  { 
    id: '4', 
    name: 'O Gentleman Completo', 
    price: 110, 
    duration: 75, 
    description: 'Nosso pacote assinatura. Corte completo e escultura da barba com todos os cuidados.',
    category: 'combo'
  },
  { 
    id: '7', 
    name: 'Corte + Sobrancelha', 
    price: 75, 
    duration: 50, 
    description: 'Renove o visual alinhando o corte e o olhar.',
    category: 'combo'
  },

  // Specials
  { 
    id: '5', 
    name: 'Camuflagem de Grisalhos', 
    price: 60, 
    duration: 30, 
    description: 'Pigmentação sutil semi-permanente para reduzir discretamente os fios brancos.',
    category: 'specials'
  },
  { 
    id: '8', 
    name: 'Limpeza de Pele Facial', 
    price: 80, 
    duration: 45, 
    description: 'Remoção de impurezas e hidratação profunda para revitalizar a pele.',
    category: 'specials'
  },

  // Promotion
  { 
    id: '9', 
    name: 'Combo Pai e Filho', 
    price: 100, 
    duration: 60, 
    description: 'Traga seu herdeiro. Dois cortes com desconto especial.',
    category: 'promotion'
  },
  { 
    id: '10', 
    name: 'Happy Hour (Ter-Qua)', 
    price: 55, 
    duration: 45, 
    description: 'Preço especial para Corte Executivo em horários selecionados no meio da semana.',
    category: 'promotion'
  },
];

export const BARBERS: Barber[] = [
  { 
    id: '1', 
    name: 'Thiago "The Blade"', 
    specialty: 'Cortes Clássicos & Degradês', 
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '2', 
    name: 'Marcos Silva', 
    specialty: 'Especialista em Barba', 
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '3', 
    name: 'Helena Costa', 
    specialty: 'Texturas Modernas', 
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400' 
  },
];
