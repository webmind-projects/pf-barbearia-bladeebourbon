import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Sparkles, Layers, Tag, ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { BookingFormData, BookingStep, ServiceCategory } from '../types';
import { SERVICES, BARBERS } from '../data/mocks';

// Custom Icons
const MustacheIcon: React.FC<React.ComponentProps<'svg'>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 12c-2.5 2-5 3-7 3-2 0-3-1-3-3 0-2 2.5-3 5-3 1.5 0 3 .5 5 3z" />
    <path d="M12 12c2.5 2 5 3 7 3 2 0 3-1 3-3 0-2-2.5-3-5-3-1.5 0-3 .5-5 3z" />
  </svg>
);

const HairIcon: React.FC<React.ComponentProps<'svg'>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 2C7.5 2 4 5.5 4 10v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-4.5-3.5-8-8-8z" />
    <path d="M12 2c0 5-2 9-8 9" />
    <path d="M12 2c0 5 2 9 8 9" />
  </svg>
);

const steps = [
  { number: 1, title: 'Serviços' },
  { number: 2, title: 'Profissional' },
  { number: 3, title: 'Data e Hora' },
  { number: 4, title: 'Detalhes' },
];

const categories: { id: ServiceCategory; title: string; icon: React.ElementType; color: string }[] = [
  { id: 'hair', title: 'Cabelo', icon: HairIcon, color: 'text-gold-500' },
  { id: 'beard', title: 'Barba', icon: MustacheIcon, color: 'text-blue-400' },
  { id: 'specials', title: 'Especiais', icon: Sparkles, color: 'text-purple-400' },
  { id: 'combo', title: 'Combos', icon: Layers, color: 'text-orange-400' },
  { id: 'promotion', title: 'Promoção', icon: Tag, color: 'text-red-400' },
];

// Mock booked slots for demonstration
const BOOKED_SLOTS = ['11:00', '11:30', '14:30', '16:00', '16:30'];

// Helper functions for time calculation
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const BookingSystem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SERVICES);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    selectedServices: [],
    selectedBarber: null,
    selectedDate: new Date().toISOString().split('T')[0],
    selectedTime: null,
    customerName: '',
    customerPhone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper to update form data
  const updateData = (key: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    // If we are in Step 1 and have a category selected, go back to category list
    if (currentStep === BookingStep.SERVICES && selectedCategory !== null) {
      setSelectedCategory(null);
      return;
    }

    // Normal step navigation
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setCurrentStep(BookingStep.CONFIRMATION);
    }, 1000);
  };

  const toggleService = (serviceId: string) => {
    const current = formData.selectedServices;
    if (current.includes(serviceId)) {
      updateData('selectedServices', current.filter(id => id !== serviceId));
    } else {
      updateData('selectedServices', [...current, serviceId]);
    }
  };

  // Calculate totals
  const selectedServicesData = SERVICES.filter(s => formData.selectedServices.includes(s.id));
  const selectedCount = selectedServicesData.length;
  const selectedTotal = selectedServicesData.reduce((acc, curr) => acc + curr.price, 0);
  const totalDuration = selectedServicesData.reduce((acc, curr) => acc + curr.duration, 0) || 30; // Default to 30 min if 0

  // Generate 30-minute slots from 09:00 to 19:00
  const generateTimeSlots = () => {
    const slots = [];
    let current = timeToMinutes('09:00');
    const end = timeToMinutes('19:00');

    while (current < end) {
      slots.push(minutesToTime(current));
      current += 30;
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Check if a specific slot is available for the TOTAL DURATION of the service
  const isSlotAvailable = (startTime: string) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + totalDuration;
    const closingTime = timeToMinutes('19:00');

    // 1. Check if the service finishes after closing time
    if (endMinutes > closingTime) return false;

    // 2. Check if the start time is already booked
    if (BOOKED_SLOTS.includes(startTime)) return false;

    // 3. Check if any subsequent 30-min slot required for this service is booked
    // We check every 30 minute interval between start and end
    for (let t = startMinutes + 30; t < endMinutes; t += 30) {
      const timeStr = minutesToTime(t);
      if (BOOKED_SLOTS.includes(timeStr)) return false;
    }

    return true;
  };

  // Determine visual state of a slot
  const getSlotState = (time: string) => {
    // Is it strictly booked in the backend?
    if (BOOKED_SLOTS.includes(time)) return 'booked';

    // Is it unavailable because the service won't fit? (Only relevant if it's not already booked)
    if (!isSlotAvailable(time)) return 'unavailable';
    
    // Is it currently selected as the START time?
    if (formData.selectedTime === time) return 'selected-start';

    // Is it covered by the current selection's duration?
    if (formData.selectedTime) {
      const selectedStartMin = timeToMinutes(formData.selectedTime);
      const selectedEndMin = selectedStartMin + totalDuration;
      const currentMin = timeToMinutes(time);

      if (currentMin > selectedStartMin && currentMin < selectedEndMin) {
        return 'selected-covered';
      }
    }

    return 'available';
  };

  // Render Step Content
  const renderStep = () => {
    switch (currentStep) {
      case BookingStep.SERVICES:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-start mb-6 gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-serif text-white">
                  {selectedCategory 
                    ? categories.find(c => c.id === selectedCategory)?.title 
                    : 'Selecione uma Categoria'}
                </h3>
                
                {/* Summary Badge */}
                {selectedCount > 0 && (
                  <div className="bg-gold-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg shadow-gold-500/20 animate-fade-in">
                    <span>{selectedCount}</span>
                    <span className="w-1 h-1 bg-black rounded-full"></span>
                    <span>R$ {selectedTotal}</span>
                  </div>
                )}
              </div>

              {/* Top Back Button (Only when category is selected) */}
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-gold-500 hover:text-white flex items-center gap-1 transition-colors shrink-0 pt-1.5 ml-auto"
                >
                  <ArrowLeft className="w-4 h-4" /> Categorias
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!selectedCategory ? (
                // Categories Grid
                <motion.div 
                  key="categories"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="bg-zinc-900 border border-zinc-800 hover:border-gold-500 p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.02] hover:bg-zinc-800 group flex items-center justify-between flex-row"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full bg-zinc-950 ${cat.color} border border-zinc-800 group-hover:border-gold-500/30`}>
                          <cat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg font-bold text-white">{cat.title}</h4>
                          <p className="text-xs text-zinc-500 group-hover:text-zinc-400">Ver serviços</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-gold-500 transition-colors" />
                    </div>
                  ))}
                </motion.div>
              ) : (
                // Services List (Filtered)
                <motion.div 
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4"
                >
                  {SERVICES.filter(s => s.category === selectedCategory).map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all flex justify-between items-center group
                        ${formData.selectedServices.includes(service.id) 
                          ? 'bg-zinc-800 border-gold-500' 
                          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}
                    >
                      <div className="flex-1 pr-4">
                        <h4 className="font-bold text-white group-hover:text-gold-500 transition-colors">{service.name}</h4>
                        <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{service.description}</p>
                        <p className="text-gold-500 text-sm mt-2 font-medium">R$ {service.price} • {service.duration} min</p>
                      </div>
                      <div className={`w-6 h-6 min-w-[24px] rounded-full border flex items-center justify-center transition-all
                        ${formData.selectedServices.includes(service.id) ? 'bg-gold-500 border-gold-500 scale-110' : 'border-zinc-600 group-hover:border-gold-500/50'}`}>
                        {formData.selectedServices.includes(service.id) && <Check className="w-4 h-4 text-black" />}
                      </div>
                    </div>
                  ))}
                  
                  {SERVICES.filter(s => s.category === selectedCategory).length === 0 && (
                    <p className="text-zinc-500 text-center py-8">Nenhum serviço encontrado nesta categoria.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case BookingStep.BARBER:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-white mb-6">Escolha o Profissional</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BARBERS.map((barber) => (
                <div
                  key={barber.id}
                  onClick={() => updateData('selectedBarber', barber.id)}
                  className={`relative overflow-hidden rounded-lg border cursor-pointer group transition-all h-64
                    ${formData.selectedBarber === barber.id ? 'border-gold-500 ring-2 ring-gold-500/20' : 'border-zinc-800'}`}
                >
                  <img src={barber.image} alt={barber.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-white font-bold text-lg">{barber.name}</p>
                    <p className="text-gold-500 text-sm">{barber.specialty}</p>
                  </div>
                  {formData.selectedBarber === barber.id && (
                    <div className="absolute top-2 right-2 bg-gold-500 text-black p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case BookingStep.DATETIME:
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-serif text-white">Data e Hora</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                <Clock className="w-4 h-4 text-gold-500" />
                <span>Duração estimada: <strong className="text-white">{totalDuration} min</strong></span>
              </div>
            </div>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <label className="block text-sm text-zinc-400 mb-2">Selecione a Data</label>
              <input 
                type="date" 
                value={formData.selectedDate}
                onChange={(e) => updateData('selectedDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold-500"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-zinc-500 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500"></span> Disponível
                <span className="w-2 h-2 rounded-full bg-zinc-800 ml-2"></span> Indisponível
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {timeSlots.map((time) => {
                  const state = getSlotState(time);
                  const isInteractive = state === 'available' || state === 'selected-start';
                  const isStart = state === 'selected-start';
                  const isCovered = state === 'selected-covered';
                  const isBooked = state === 'booked' || (state === 'unavailable' && !isInteractive);

                  return (
                    <button
                      key={time}
                      onClick={() => isInteractive && updateData('selectedTime', time)}
                      disabled={!isInteractive}
                      className={`
                        relative py-3 px-1 rounded border text-sm transition-all overflow-hidden
                        ${isStart 
                          ? 'bg-gold-500 text-black border-gold-500 font-bold z-10 scale-105' 
                          : ''}
                        ${isCovered
                          ? 'bg-gold-500/80 text-black border-gold-500/80' 
                          : ''}
                        ${state === 'available' 
                          ? 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-gold-500/50 hover:bg-zinc-800' 
                          : ''}
                        ${isBooked
                          ? 'bg-zinc-950 text-zinc-600 border-zinc-900 cursor-not-allowed opacity-50 decoration-slice line-through' 
                          : ''}
                      `}
                    >
                      {time}
                      {isStart && (
                        <motion.div 
                          layoutId="selected-ring"
                          className="absolute inset-0 border-2 border-black rounded"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              {formData.selectedTime && (
                <div className="mt-4 p-3 bg-gold-500/10 border border-gold-500/20 rounded text-sm text-gold-500 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Horário selecionado: <strong>{formData.selectedTime}</strong> até <strong>{minutesToTime(timeToMinutes(formData.selectedTime) + totalDuration)}</strong>
                </div>
              )}
            </div>
          </div>
        );

      case BookingStep.DETAILS:
        const total = SERVICES
          .filter(s => formData.selectedServices.includes(s.id))
          .reduce((sum, s) => sum + s.price, 0);
        
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-white mb-6">Suas Informações</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Nome Completo</label>
                <input 
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => updateData('customerName', e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Telefone (WhatsApp)</label>
                <input 
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => updateData('customerPhone', e.target.value)}
                  placeholder="(51) 99999-9999"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 mt-8">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gold-500" /> Resumo do Agendamento
              </h4>
              <ul className="space-y-2 text-sm text-zinc-400 mb-4 pb-4 border-b border-zinc-800">
                {SERVICES.filter(s => formData.selectedServices.includes(s.id)).map(s => (
                  <li key={s.id} className="flex justify-between">
                    <span>{s.name}</span>
                    <span>R$ {s.price}</span>
                  </li>
                ))}
                 <li className="flex justify-between text-gold-500 pt-2">
                    <span>Duração Total</span>
                    <span>{totalDuration} min</span>
                  </li>
              </ul>
              {SERVICES.filter(s => formData.selectedServices.includes(s.id)).length === 0 && (
                 <p className="text-sm text-zinc-500 italic mb-4">Nenhum serviço selecionado</p>
              )}
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span className="text-gold-500">R$ {total}</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 bg-black relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 p-12 rounded-lg border border-gold-500/30 max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-gold-500" />
            </div>
            <h3 className="font-serif text-4xl text-white mb-4">Agendamento Confirmado</h3>
            <p className="text-zinc-400 text-lg mb-8">
              Obrigado, {formData.customerName}. Esperamos por você no dia {formData.selectedDate} às {formData.selectedTime}.
            </p>
            <Button onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(BookingStep.SERVICES);
              setSelectedCategory(null);
              setFormData({
                selectedServices: [],
                selectedBarber: null,
                selectedDate: new Date().toISOString().split('T')[0],
                selectedTime: null,
                customerName: '',
                customerPhone: '',
              });
            }}>
              Novo Agendamento
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-black relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Agende seu Horário</h2>
          <p className="text-zinc-400">Selecione os serviços e o horário de sua preferência.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-start mb-12 relative px-4 md:px-12">
          {/* Connection Line */}
          <div className="absolute left-0 right-0 top-5 -translate-y-1/2 h-0.5 bg-zinc-800 -z-10 mx-4 md:mx-12"></div>
          
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center">
              {/* Step Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 z-10
                ${currentStep >= step.number ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20 scale-110' : 'bg-zinc-900 border-2 border-zinc-800 text-zinc-500'}`}>
                {step.number}
              </div>
              
              {/* Step Title - Animated */}
              <AnimatePresence mode="wait">
                {currentStep === step.number && (
                  <motion.span
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 text-xs uppercase tracking-wider text-gold-500 font-bold whitespace-nowrap bg-black px-2 py-1 rounded border border-zinc-800/50"
                  >
                    {step.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-950 p-6 md:p-10 rounded-xl border border-zinc-800 shadow-2xl"
        >
          {renderStep()}

          {/* Navigation Buttons */}
          {!(currentStep === BookingStep.SERVICES && selectedCategory === null) && (
            <div className="flex justify-between mt-12 pt-6 border-t border-zinc-800">
              <Button 
                variant="ghost" 
                onClick={handleBack}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && formData.selectedServices.length === 0) ||
                  (currentStep === 2 && !formData.selectedBarber) ||
                  (currentStep === 3 && !formData.selectedTime) ||
                  (currentStep === 4 && (!formData.customerName || !formData.customerPhone))
                }
              >
                {currentStep === 4 ? 'Confirmar' : 'Próximo'} <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};