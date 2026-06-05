import React, { useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, Phone, ShoppingBag, UserPlus, LogIn } from 'lucide-react';
import { register, login } from '../utils/customerStorage';

const CustomerLogin = ({ onSuccess, onClose }) => {
  const [mode,    setMode]    = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [showPwd, setShowPwd] = useState(false);

  /* Login fields */
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass,  setLoginPass]  = useState('');

  /* Register fields */
  const [regNombre,   setRegNombre]   = useState('');
  const [regEmail,    setRegEmail]    = useState('');
  const [regTel,      setRegTel]      = useState('');
  const [regPass,     setRegPass]     = useState('');
  const [regPass2,    setRegPass2]    = useState('');

  const clear = () => { setError(''); };

  /* ── Iniciar Sesión ── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) return setError('Completa todos los campos.');
    setLoading(true);
    setTimeout(() => {
      const customer = login(loginEmail, loginPass);
      if (customer) { onSuccess(customer); }
      else { setError('Correo o contraseña incorrectos.'); }
      setLoading(false);
    }, 350);
  };

  /* ── Crear Cuenta ── */
  const handleRegister = (e) => {
    e.preventDefault();
    if (regPass !== regPass2) return setError('Las contraseñas no coinciden.');
    setLoading(true);
    setTimeout(() => {
      const result = register(regNombre, regEmail, regTel, regPass);
      if (result && !result.error) { onSuccess(result); }
      else { setError(result?.error || 'Error al crear la cuenta.'); }
      setLoading(false);
    }, 350);
  };

  const inputCls = 'w-full border-2 border-gray-200 focus:border-orange-400 rounded-2xl px-4 py-3 outline-none transition text-sm text-gray-800 bg-white placeholder:text-gray-300';
  const iconWrap = 'relative';
  const iconCls  = 'absolute left-3.5 top-3.5 text-gray-400 pointer-events-none';

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">

        {/* Header */}
        <div className="bg-linear-to-r from-orange-700 to-amber-600 px-6 py-5 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="font-extrabold text-lg leading-none">Mi Cuenta</p>
                <p className="text-orange-200 text-xs mt-0.5">Panadería La Jaujina</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-full transition">
              <X size={20} />
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex mt-4 bg-white/10 rounded-2xl p-1 gap-1">
            <button
              onClick={() => { setMode('login'); clear(); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition ${
                mode === 'login' ? 'bg-white text-orange-700 shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              <LogIn size={15} /> Iniciar Sesión
            </button>
            <button
              onClick={() => { setMode('register'); clear(); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition ${
                mode === 'register' ? 'bg-white text-orange-700 shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              <UserPlus size={15} /> Crear Cuenta
            </button>
          </div>
        </div>

        {/* ── LOGIN FORM ── */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="p-6 space-y-3">
            <div className={iconWrap}>
              <Mail size={16} className={iconCls} />
              <input
                type="email" autoFocus required
                value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value); clear(); }}
                placeholder="Correo electrónico"
                className={`${inputCls} pl-9`}
              />
            </div>

            <div className={iconWrap}>
              <Lock size={16} className={iconCls} />
              <input
                type={showPwd ? 'text' : 'password'} required
                value={loginPass} onChange={(e) => { setLoginPass(e.target.value); clear(); }}
                placeholder="Contraseña"
                className={`${inputCls} pl-9 pr-11`}
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition">
                {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {error && <ErrorBox msg={error} />}

            <button type="submit" disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:cursor-not-allowed">
              <LogIn size={18} />
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>

            <p className="text-center text-xs text-gray-400 pt-1">
              ¿No tienes cuenta?{' '}
              <button type="button" onClick={() => { setMode('register'); clear(); }}
                className="text-orange-600 font-bold hover:underline">
                Regístrate aquí
              </button>
            </p>
          </form>
        )}

        {/* ── REGISTER FORM ── */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="p-6 space-y-3">
            <div className={iconWrap}>
              <User size={16} className={iconCls} />
              <input
                type="text" autoFocus required
                value={regNombre} onChange={(e) => { setRegNombre(e.target.value); clear(); }}
                placeholder="Nombre completo *"
                className={`${inputCls} pl-9`}
              />
            </div>

            <div className={iconWrap}>
              <Mail size={16} className={iconCls} />
              <input
                type="email" required
                value={regEmail} onChange={(e) => { setRegEmail(e.target.value); clear(); }}
                placeholder="Correo electrónico *"
                className={`${inputCls} pl-9`}
              />
            </div>

            <div className={iconWrap}>
              <Phone size={16} className={iconCls} />
              <input
                type="tel"
                value={regTel} onChange={(e) => setRegTel(e.target.value)}
                placeholder="WhatsApp (opcional)"
                className={`${inputCls} pl-9`}
              />
            </div>

            <div className={iconWrap}>
              <Lock size={16} className={iconCls} />
              <input
                type={showPwd ? 'text' : 'password'} required
                value={regPass} onChange={(e) => { setRegPass(e.target.value); clear(); }}
                placeholder="Contraseña (mín. 6 caracteres) *"
                className={`${inputCls} pl-9 pr-11`}
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition">
                {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <div className={iconWrap}>
              <Lock size={16} className={iconCls} />
              <input
                type={showPwd ? 'text' : 'password'} required
                value={regPass2} onChange={(e) => { setRegPass2(e.target.value); clear(); }}
                placeholder="Confirmar contraseña *"
                className={`${inputCls} pl-9`}
              />
            </div>

            {error && <ErrorBox msg={error} />}

            <button type="submit" disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:cursor-not-allowed">
              <UserPlus size={18} />
              {loading ? 'Creando cuenta...' : 'Crear Mi Cuenta'}
            </button>

            <p className="text-center text-xs text-gray-400 pt-1">
              ¿Ya tienes cuenta?{' '}
              <button type="button" onClick={() => { setMode('login'); clear(); }}
                className="text-orange-600 font-bold hover:underline">
                Inicia sesión
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

const ErrorBox = ({ msg }) => (
  <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-3 py-2.5 text-center">
    {msg}
  </div>
);

export default CustomerLogin;
