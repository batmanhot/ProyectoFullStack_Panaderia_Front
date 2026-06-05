import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = ({ faqs, openFaq, onToggleFaq }) => {
  return (
    <section className="py-24 bg-[#F8F1E8] px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-[#5A3E2B] text-xs font-bold px-5 py-2 rounded-full mb-5 tracking-widest uppercase">
            RESOLVEMOS TUS DUDAS
          </span>
          <h3 className="text-4xl font-extrabold text-[#5A3E2B] font-serif">Preguntas Frecuentes</h3>
          <p className="text-gray-500 mt-3 italic">Todo lo que necesitas saber sobre nosotros</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#EDE3D8] rounded-2xl overflow-hidden shadow-sm bg-white
                         hover:shadow-[0_4px_20px_rgba(90,62,43,0.08)] transition-shadow duration-300"
            >
              <button
                onClick={() => onToggleFaq(index)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-amber-50/60 transition-colors"
              >
                <span className="font-bold text-[#2B2B2B] text-base pr-4">{faq.pregunta}</span>
                <ChevronDown
                  size={20}
                  className={`text-[#D4A373] transition-transform duration-300 shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFaq === index ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 text-gray-600 border-t border-[#F0E8DE] pt-4 leading-relaxed text-sm">
                  {faq.respuesta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
