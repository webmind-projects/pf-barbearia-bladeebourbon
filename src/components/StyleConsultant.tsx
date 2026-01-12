import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { getStyleAdvice } from '../services/geminiService';

export const StyleConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setAdvice('');
    
    const result = await getStyleAdvice(input);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-40 bg-zinc-900 border border-gold-500/50 text-gold-500 p-4 rounded-full shadow-2xl shadow-gold-500/20"
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-950/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold-500/10 rounded-md">
                    <Sparkles className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white">AI Style Consultant</h3>
                    <p className="text-xs text-zinc-400">Powered by Gemini</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {!advice ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-zinc-300">
                      Unsure what cut fits you? Describe your face shape, hair texture, or personal style, and let our AI suggest the perfect look.
                    </p>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="e.g. I have an oval face and wavy thick hair. I want something low maintenance but professional."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50 transition-colors resize-none h-32"
                    />
                    <Button 
                      type="submit" 
                      disabled={loading || !input.trim()}
                      className="w-full"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                        </span>
                      ) : (
                        "Get Recommendation"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-zinc-950 p-6 rounded-md border-l-2 border-gold-500">
                      <h4 className="text-gold-500 font-serif mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Recommendation
                      </h4>
                      <p className="text-zinc-300 leading-relaxed italic">
                        "{advice}"
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setAdvice('')} className="w-full">
                      Ask Again
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
