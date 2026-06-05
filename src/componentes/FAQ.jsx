import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = ({ faqs, openFaq, onToggleFaq }) => {
  return (
    <section className="py-20 bg-linear-to-b from-orange-50 via-amber-50 to-orange-50 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-bold px-4 py-1 rounded-full mb-4 tracking-wide">
            RESOLVEMOS TUS DUDAS
          </span>
          <h3 className="text-4xl font-bold text-orange-900 font-serif">Preguntas Frecuentes</h3>
          <p className="text-orange-700 mt-2 italic">Todo lo que necesitas saber sobre nosotros</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-orange-100 rounded-2xl overflow-hidden shadow-sm bg-white"
            >
              <button
                onClick={() => onToggleFaq(index)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-orange-50 transition-colors"
              >
                <span className="font-bold text-gray-800 text-base pr-4">{faq.pregunta}</span>
                <ChevronDown
                  size={20}
                  className={`text-orange-600 transition-transform duration-300 shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFaq === index ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 text-gray-600 border-t border-orange-50 pt-4 leading-relaxed text-sm">
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
