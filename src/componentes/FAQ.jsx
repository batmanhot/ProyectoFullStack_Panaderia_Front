import React from 'react';

const FAQ = ({ faqs, openFaq, onToggleFaq }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-white px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-blue-900 italic font-serif">Preguntas Frecuentes</h3>
          <p className="text-blue-700 mt-2 italic">Todo lo que necesitas saber sobre nosotros</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-orange-100 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => onToggleFaq(index)}
                className="w-full flex justify-between items-center p-5 text-left bg-orange-50/30 hover:bg-orange-50 transition-colors"
              >
                <span className="font-bold text-gray-800 text-lg">{faq.pregunta}</span>
                <span 
                  className={`text-orange-600 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-white text-gray-600 border-t border-orange-50 italic">
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
