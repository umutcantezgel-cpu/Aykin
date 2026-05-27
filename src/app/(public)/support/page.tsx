'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, MessageCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToastStore } from '@/store/useToastStore';

const FAQS = [
  {
    question: "Welche Materialien bietet ihr an?",
    answer: "Wir drucken mit PLA, PETG, ASA, TPU und weiteren Hochleistungsfilamenten. Je nach Anforderung beraten wir dich gerne zum optimalen Material für dein Projekt."
  },
  {
    question: "Wie lange dauert ein 3D-Druck-Auftrag?",
    answer: "Die Dauer hängt von Größe und Komplexität ab. Kleinere Teile sind oft innerhalb von 1–3 Werktagen fertig. Größere Projekte können bis zu 7 Tage dauern. Im Checkout siehst du die geschätzte Lieferzeit."
  },
  {
    question: "Kann ich meine eigene 3D-Datei hochladen?",
    answer: "Ja, du kannst STL-, OBJ- oder 3MF-Dateien hochladen. Wir prüfen jede Datei auf Druckbarkeit und melden uns bei Fragen."
  },
  {
    question: "Bietet ihr auch Designunterstützung an?",
    answer: "Ja! Falls du noch kein fertiges 3D-Modell hast, können wir gemeinsam dein Design entwickeln. Kontaktiere uns für eine individuelle Beratung."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToastStore();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'support_messages'), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'new'
      });
      addToast({ title: 'Nachricht gesendet!', message: 'Wir melden uns bald bei dir.', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Fehler', message: 'Nachricht konnte nicht gesendet werden.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-calistoga text-4xl text-[#1A1A1A] mb-4">Wie können wir dir helfen?</h1>
          <p className="font-nunito text-[#7a5a52] max-w-lg mx-auto">
            Egal ob Frage zum Auftrag, Feedback oder Designberatung – wir sind für dich da!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* FAQ Section */}
          <div>
            <h2 className="font-calistoga text-2xl text-[#1A1A1A] mb-6">Häufige Fragen</h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[24px] shadow-sm border border-[#F2E8E0] overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center bg-white"
                  >
                    <span className="font-bold text-[#1A1A1A] pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 text-[#C41E3A]"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-4 pt-2 text-[#7a5a52] text-sm leading-relaxed border-t border-[#F2E8E0] border-dashed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 bg-[#3a9d52]/10 border border-[#3a9d52]/20 rounded-[24px] p-6 flex items-center justify-between">
              <div>
                <h3 className="font-calistoga text-xl text-[#3a9d52] mb-1">Lieber direkt texten?</h3>
                <p className="text-[#3a9d52]/80 text-sm font-bold">Schreib uns auf WhatsApp.</p>
              </div>
              <a 
                href="https://wa.me/49123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#3a9d52] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#3a9d52]/30 shrink-0"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-calistoga text-2xl text-[#1A1A1A] mb-6">Schreib uns</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[32px] shadow-sm border border-[#F2E8E0] flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-[#7a5a52] mb-1.5 ml-2">Dein Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#FAF8F5] border-none px-5 py-3.5 rounded-[18px] font-bold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  placeholder="Hallo, ich bin..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#7a5a52] mb-1.5 ml-2">Deine E-Mail</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#FAF8F5] border-none px-5 py-3.5 rounded-[18px] font-bold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  placeholder="mail@beispiel.de"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#7a5a52] mb-1.5 ml-2">Deine Nachricht</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[#FAF8F5] border-none px-5 py-3.5 rounded-[18px] font-bold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C41E3A] min-h-[120px] resize-none"
                  placeholder="Wie können wir dir helfen?"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-[#C41E3A] text-white py-4 rounded-[18px] font-bold flex items-center justify-center gap-2 hover:bg-[#A01830] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Wird gesendet...' : (
                  <>Nachricht senden <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
