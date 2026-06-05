import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, ShieldCheck } from 'lucide-react';

const ADMIN_PASSWORD = 'jaujina2026';

const AdminLogin = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onSuccess();
      } else {
        setError('Contraseña incorrecta. Inténtalo nuevamente.');
        setPassword('');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">

        {/* Header */}
        <div className="bg-gray-900 px-6 py-5 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-extrabold text-base">Panel de Administración</p>
              <p className="text-gray-400 text-xs">Panadería La Jaujina</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-7">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-5 rounded-full">
              <Lock size={36} className="text-gray-400" />
            </div>
          </div>

          <p className="text-gray-500 text-sm text-center mb-6">
            Ingresa la contraseña para acceder al panel de administración
          </p>

          <div className="relative mb-4">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Contraseña de administrador"
              className={`w-full border-2 rounded-2xl px-4 py-3.5 pr-12 outline-none transition text-gray-800 text-sm ${
                error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm text-center py-2.5 px-4 rounded-xl mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!password || loading}
            className={`w-full font-bold py-3.5 rounded-2xl transition-all text-white ${
              !password || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-gray-800 active:scale-95 shadow-lg'
            }`}
          >
            {loading ? 'Verificando...' : 'Ingresar al Panel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
