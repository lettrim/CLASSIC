import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QUIZ_STEPS } from './constants';
import { QuizState } from './types';

// Componente para animar o Score circular
const AnimatedScore: React.FC<{ target: number }> = ({ target }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 800; // Reduzido de 2000 para 800 para maior velocidade
    const stepTime = 16; // ~60fps
    const increment = target / (duration / stepTime);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [target]);

  const dashArray = 276;
  const dashOffset = dashArray - (dashArray * displayValue) / 100;

  return (
    <div className="w-40 h-40 border-[12px] border-gray-50 rounded-full flex items-center justify-center relative">
      <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 100 100">
        <circle 
          cx="50" cy="50" r="44" 
          fill="none" 
          stroke="#22c55e" 
          strokeWidth="12" 
          strokeDasharray={dashArray} 
          strokeDashoffset={dashOffset} 
          strokeLinecap="round"
          className="transition-all duration-75 ease-linear"
        />
      </svg>
      <span className="text-4xl font-black">{displayValue}%</span>
    </div>
  );
};

// Componente para animar o indicador "Estás aquí" de Bajo a Alto
const ScoreIndicator: React.FC = () => {
  const [pos, setPos] = useState(5);
  
  useEffect(() => {
    // Inicia no Bajo (5%) e move para o Alto (92%) após um curto delay
    const timer = setTimeout(() => {
      setPos(92);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="absolute -top-6 flex flex-col items-center transition-all duration-[2000ms] ease-in-out" 
      style={{ left: `calc(${pos}% - 10px)` }}
    >
      <span className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-md font-bold mb-1 shadow-sm whitespace-nowrap">Estás aquí</span>
      <div className="w-4 h-4 rounded-full border-4 border-white bg-pink-500 shadow-md"></div>
    </div>
  );
};

// Icono 3D Flotante de Check
const FloatingCheckIcon: React.FC<{ delayClass?: string }> = ({ delayClass = "animate-float" }) => (
  <div className={`w-8 h-8 flex-shrink-0 ${delayClass}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      {/* 3D Base Shadow */}
      <circle cx="50" cy="55" r="40" fill="rgba(0,0,0,0.1)" />
      {/* 3D Body */}
      <circle cx="50" cy="50" r="40" fill="url(#checkGrad)" stroke="#ffffff" strokeWidth="3" />
      {/* Checkmark */}
      <path 
        d="M30 50 L45 65 L70 35" 
        fill="none" 
        stroke="white" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}
      />
      {/* Highlight/Reflection */}
      <path d="M25 35 Q50 15 75 35" fill="none" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    </svg>
  </div>
);

// Women Community Illustration (Step 5)
const WomenCommunityIllustration = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full bg-pink-50">
    <rect width="400" height="300" fill="#fdf2f8" />
    {/* Woman 1 - Center Focus */}
    <g transform="translate(150, 60) scale(1.2)">
      <circle cx="50" cy="40" r="25" fill="#fde68a" />
      <path d="M30 65 Q50 45 70 65 L80 150 Q50 165 20 150 Z" fill="#ec4899" />
      <path d="M40 70 Q50 85 60 70" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
      {/* Head details */}
      <circle cx="43" cy="38" r="2" fill="#1e293b" />
      <circle cx="57" cy="38" r="2" fill="#1e293b" />
      <path d="M47 48 Q50 52 53 48" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
    </g>
    {/* Woman 2 - Left */}
    <g transform="translate(40, 100) scale(0.9)">
      <circle cx="50" cy="40" r="25" fill="#ffedd5" />
      <path d="M30 65 Q50 45 70 65 L80 150 Q50 165 20 150 Z" fill="#8b5cf6" />
      <circle cx="43" cy="38" r="2" fill="#1e293b" />
      <circle cx="57" cy="38" r="2" fill="#1e293b" />
    </g>
    {/* Woman 3 - Right */}
    <g transform="translate(260, 100) scale(0.9)">
      <circle cx="50" cy="40" r="25" fill="#fee2e2" />
      <path d="M30 65 Q50 45 70 65 L80 150 Q50 165 20 150 Z" fill="#3b82f6" />
      <circle cx="43" cy="38" r="2" fill="#1e293b" />
      <circle cx="57" cy="38" r="2" fill="#1e293b" />
    </g>
    {/* Floating Hearts/Confidence Sparks */}
    <path d="M100 50 Q110 30 120 50 T100 70 T80 50 T100 50" fill="#f472b6" opacity="0.6" className="animate-float" />
    <path d="M300 40 Q310 20 320 40 T300 60 T280 40 T300 40" fill="#f472b6" opacity="0.6" className="animate-float-delayed" />
    <text x="200" y="270" textAnchor="middle" fill="#be185d" className="text-xl font-black uppercase tracking-tighter">Comunidad Activa</text>
  </svg>
);

// Result "Before" Illustration (Step 16)
const ResultBeforeIllustration = () => (
  <svg viewBox="0 0 300 400" className="w-full h-full bg-slate-100">
    <rect width="300" height="400" fill="#f8fafc" />
    <text x="150" y="40" textAnchor="middle" fill="#94a3b8" className="text-xl font-black italic uppercase">ANTES</text>
    {/* Body */}
    <path d="M50 100 Q150 80 250 100 L230 380 Q150 395 70 380 Z" fill="#fee2e2" />
    {/* Sagging Breasts */}
    <path d="M60 140 Q100 280 145 220" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
    <path d="M240 140 Q200 280 155 220" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
    <circle cx="95" cy="245" r="4" fill="#db2777" opacity="0.5" />
    <circle cx="205" cy="245" r="4" fill="#db2777" opacity="0.5" />
    {/* Sad expression hint */}
    <path d="M140 120 Q150 130 160 120" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <text x="150" y="340" textAnchor="middle" fill="#ef4444" className="text-sm font-bold uppercase">Caídos y sin volumen</text>
  </svg>
);

// Result "After" Illustration (Step 16)
const ResultAfterIllustration = () => (
  <svg viewBox="0 0 300 400" className="w-full h-full bg-pink-50">
    <rect width="300" height="400" fill="#fff1f2" />
    <text x="150" y="40" textAnchor="middle" fill="#ec4899" className="text-xl font-black italic uppercase">DESPUÉS</text>
    {/* Shine effect */}
    <circle cx="150" cy="180" r="100" fill="white" opacity="0.4" />
    {/* Body */}
    <path d="M50 100 Q150 80 250 100 L230 380 Q150 395 70 380 Z" fill="#fee2e2" />
    {/* Lifted Breasts */}
    <circle cx="105" cy="180" r="45" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
    <circle cx="195" cy="180" r="45" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
    <circle cx="105" cy="180" r="5" fill="#db2777" />
    <circle cx="195" cy="180" r="5" fill="#db2777" />
    {/* Lift lines */}
    <path d="M105 130 L105 110 M100 115 L105 110 L110 115" fill="none" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
    <path d="M195 130 L195 110 M190 115 L195 110 L200 115" fill="none" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
    {/* Sparkles */}
    <path d="M40 150 L50 160 M45 155 H55" stroke="#fbbf24" strokeWidth="2" />
    <path d="M250 180 L260 190 M255 185 H265" stroke="#fbbf24" strokeWidth="2" />
    <text x="150" y="340" textAnchor="middle" fill="#10b981" className="text-sm font-bold uppercase">Firmes y Erguidos</text>
  </svg>
);

// Cartoon SVG Illustrations for Age Groups (Step 1)
const AgeIllustrations = {
  '18-29': () => (
    <svg viewBox="0 0 200 250" className="w-full h-full bg-blue-50">
      <circle cx="100" cy="80" r="50" fill="#fde68a" />
      <rect x="70" y="50" width="60" height="80" rx="30" fill="#fde68a" />
      <path d="M60 110 Q100 80 140 110 L140 180 Q100 200 60 180 Z" fill="#fde68a" />
      <ellipse cx="100" cy="115" rx="35" ry="45" fill="#fbcfe8" />
      <circle cx="85" cy="110" r="3" fill="#1e293b" />
      <circle cx="115" cy="110" r="3" fill="#1e293b" />
      <path d="M90 135 Q100 145 110 135" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 250 Q100 180 160 250" fill="#3b82f6" />
    </svg>
  ),
  '29-39': () => (
    <svg viewBox="0 0 200 250" className="w-full h-full bg-yellow-50">
      <circle cx="100" cy="80" r="55" fill="#1e293b" />
      <path d="M45 80 Q45 180 100 190 Q155 180 155 80 Z" fill="#1e293b" />
      <ellipse cx="100" cy="105" rx="32" ry="40" fill="#fde68a" />
      <circle cx="85" cy="100" r="3" fill="#1e293b" />
      <circle cx="115" cy="100" r="3" fill="#1e293b" />
      <path d="M92 125 Q100 132 108 125" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 250 L150 250 L130 180 Q100 170 70 180 Z" fill="#eab308" />
    </svg>
  ),
  '39-49': () => (
    <svg viewBox="0 0 200 250" className="w-full h-full bg-gray-50">
      <path d="M50 50 Q100 20 150 50 L160 150 Q100 180 40 150 Z" fill="#fbbf24" />
      <ellipse cx="100" cy="110" rx="35" ry="45" fill="#fee2e2" />
      <circle cx="85" cy="105" r="3" fill="#1e293b" />
      <circle cx="115" cy="105" r="3" fill="#1e293b" />
      <path d="M90 135 Q100 142 110 135" fill="none" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 250 L170 250 L150 180 Q100 175 50 180 Z" fill="#ffffff" />
    </svg>
  ),
  '50+': () => (
    <svg viewBox="0 0 200 250" className="w-full h-full bg-purple-50">
      <path d="M60 40 Q100 20 140 40 Q160 80 150 140 Q100 160 50 140 Q40 80 60 40" fill="#e2e8f0" />
      <ellipse cx="100" cy="110" rx="35" ry="45" fill="#ffedd5" />
      <circle cx="85" cy="105" r="2.5" fill="#1e293b" />
      <circle cx="115" cy="105" r="2.5" fill="#1e293b" />
      <path d="M92 135 Q100 140 108 135" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 250 L160 250 L140 180 Q100 175 60 180 Z" fill="#f8fafc" />
    </svg>
  )
};

// Cartoon SVG Illustrations for Breast Sag (Step 2)
const SagIllustrations = {
  'grado1': () => (
    <svg viewBox="0 0 200 200" className="w-full h-full bg-pink-50">
      <circle cx="60" cy="100" r="40" fill="#fbcfe8" />
      <circle cx="140" cy="100" r="40" fill="#fbcfe8" />
      <circle cx="60" cy="100" r="4" fill="#ec4899" />
      <circle cx="140" cy="100" r="4" fill="#ec4899" />
    </svg>
  ),
  'grado2': () => (
    <svg viewBox="0 0 200 200" className="w-full h-full bg-pink-50">
      <path d="M20 90 Q60 160 100 130" fill="#fbcfe8" />
      <path d="M180 90 Q140 160 100 130" fill="#fbcfe8" />
      <circle cx="60" cy="125" r="4" fill="#ec4899" />
      <circle cx="140" cy="125" r="4" fill="#ec4899" />
    </svg>
  ),
  'grado3': () => (
    <svg viewBox="0 0 200 200" className="w-full h-full bg-pink-50">
      <path d="M20 80 Q60 190 100 150" fill="#fbcfe8" />
      <path d="M180 80 Q140 190 100 150" fill="#fbcfe8" />
      <circle cx="60" cy="155" r="4" fill="#ec4899" />
      <circle cx="140" cy="155" r="4" fill="#ec4899" />
    </svg>
  )
};

// Anime/Cartoon Bikini Body Illustrations (Step 4)
const BodyTypeIllustrations = {
  'delgada': () => (
    <svg viewBox="0 0 200 300" className="w-full h-full bg-emerald-50">
      <circle cx="100" cy="40" r="25" fill="#fde68a" />
      <path d="M85 65 L115 65 L110 120 L120 160 L100 175 L80 160 L90 120 Z" fill="#fecaca" />
      <circle cx="90" cy="95" r="10" fill="#ec4899" />
      <circle cx="110" cy="95" r="10" fill="#ec4899" />
      <path d="M85 155 L115 155 L100 175 Z" fill="#ec4899" />
      <path d="M90 175 L85 280 M110 175 L115 280" stroke="#fecaca" strokeWidth="10" strokeLinecap="round" />
    </svg>
  ),
  'normal': () => (
    <svg viewBox="0 0 200 300" className="w-full h-full bg-orange-50">
      <circle cx="100" cy="40" r="25" fill="#fde68a" />
      <path d="M80 65 L120 65 Q130 120 115 150 L125 180 L100 195 L75 180 L85 150 Q70 120 80 65 Z" fill="#fca5a5" />
      <circle cx="88" cy="105" r="14" fill="#8b5cf6" />
      <circle cx="112" cy="105" r="14" fill="#8b5cf6" />
      <path d="M80 175 L120 175 Q115 190 100 195 Q85 190 80 175 Z" fill="#8b5cf6" />
      <path d="M85 190 L80 285 M115 190 L120 285" stroke="#fca5a5" strokeWidth="14" strokeLinecap="round" />
    </svg>
  ),
  'sobrepeso': () => (
    <svg viewBox="0 0 200 300" className="w-full h-full bg-rose-50">
      <circle cx="100" cy="40" r="25" fill="#fde68a" />
      <path d="M75 65 L125 65 Q145 130 120 170 L135 200 L100 220 L65 200 L80 170 Q55 130 75 65 Z" fill="#f9a8d4" />
      <circle cx="85" cy="115" r="18" fill="#3b82f6" />
      <circle cx="115" cy="115" r="18" fill="#3b82f6" />
      <path d="M75 195 L125 195 Q115 215 100 220 Q85 215 75 195 Z" fill="#3b82f6" />
      <path d="M80 215 L70 290 M120 215 L130 290" stroke="#f9a8d4" strokeWidth="18" strokeLinecap="round" />
    </svg>
  )
};

// Pill Pack Illustration (Step 8)
const PillPackIllustration = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full bg-slate-50">
    <rect x="60" y="40" width="180" height="120" rx="15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
    <g>
      {[...Array(3)].map((_, row) => 
        [...Array(6)].map((_, col) => {
          const isTaken = (row * 6 + col) % 4 === 0;
          return (
            <circle 
              key={`${row}-${col}`} 
              cx={90 + col * 24} 
              cy={70 + row * 30} 
              r={7} 
              fill={isTaken ? "#94a3b8" : "#ffffff"} 
              stroke="#64748b" 
              strokeWidth="0.5"
            />
          );
        })
      )}
    </g>
    <path d="M120 20 L180 180" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
    <path d="M180 20 L120 180" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
    <text x="150" y="185" textAnchor="middle" fill="#ef4444" className="text-[10px] font-black uppercase tracking-widest">Riesgo Mamario</text>
  </svg>
);

// Pelvic Floor Illustration
const PelvicFloorIllustration = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full bg-pink-50">
    <path d="M50 20 Q150 10 250 20 L240 180 Q150 190 60 180 Z" fill="#fee2e2" />
    <circle cx="100" cy="100" r="45" fill="#fbcfe8" />
    <circle cx="200" cy="100" r="45" fill="#fbcfe8" />
    <path d="M60 140 Q150 170 240 140" fill="none" stroke="#db2777" strokeWidth="8" strokeLinecap="round" strokeDasharray="1,15" />
    <path d="M100 150 L100 120 M200 150 L200 120" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Strengthening Muscles Illustration
const StrengtheningIllustration = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full bg-amber-50">
    <path d="M100 40 Q150 30 200 40 L190 180 Q150 190 110 180 Z" fill="#fee2e2" />
    <path d="M120 70 Q150 60 180 70" fill="none" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    <path d="M110 60 L70 80 L70 120" fill="none" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
    <path d="M190 60 L230 80 L230 120" fill="none" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
    <rect x="60" y="120" width="20" height="12" rx="4" fill="#ec4899" />
    <rect x="220" y="120" width="20" height="12" rx="4" fill="#ec4899" />
    <text x="150" y="175" textAnchor="middle" fill="#db2777" className="text-[10px] font-bold uppercase tracking-widest">Fortalecimiento Activo</text>
  </svg>
);

// Sales Page Component
const SalesPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const handlePurchase = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    // Fake processing reduzido para 800ms para maior rapidez
    setTimeout(() => {
      window.location.href = 'https://hotm.io/senosup';
    }, 800);
  };
  
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-12 animate-fade-in pb-20">
      {/* Antes y Después Comparison */}
      <section className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-center font-bold text-gray-400 text-lg">Antes</h3>
            <div className="rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm h-64">
              <ResultBeforeIllustration />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-center font-bold text-pink-500 text-lg">Después</h3>
            <div className="rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md h-64">
              <ResultAfterIllustration />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">HOY</p>
            <p className="text-gray-700 font-bold">Flácidos y caídos</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center scale-105 shadow-sm">
            <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">EM 21 DÍAS</p>
            <p className="text-pink-600 font-bold">Erguidos y firmes</p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-tighter z-10">
          PLANO DESTAQUE
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-800 p-8 flex flex-col items-center">
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter">PLAN VIP</h2>
          
          <div className="flex flex-col items-center mb-8">
            <p className="text-gray-400 line-through text-xl font-bold">$ 97</p>
            <div className="flex items-center gap-3">
              <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded italic">93% off</span>
              <p className="text-6xl font-black text-gray-900">$ 3,99</p>
            </div>
          </div>

          <div className="w-full space-y-6 mb-10">
            <h4 className="font-bold text-lg border-b pb-2">¿Qué vas a recibir?</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <FloatingCheckIcon delayClass="animate-float" />
                <p className="text-sm text-gray-700 font-medium pt-1">Plan exclusivo para levantar tus senos y hacerlos lucir firmes y erguidos.</p>
              </div>
              <div className="flex gap-4 items-start">
                <FloatingCheckIcon delayClass="animate-float-delayed" />
                <p className="text-sm text-gray-700 font-medium pt-1"><span className="font-bold">GUÍA PRÁCTICA:</span> Secretos de las celebridades en el cuidado de los senos.</p>
              </div>
              <div className="flex gap-4 items-start">
                <FloatingCheckIcon delayClass="animate-float-slow" />
                <p className="text-sm text-gray-700 font-medium pt-1"><span className="font-bold">GUÍA PRÁCTICA:</span> Preliminares y trucos para darle vida a tu relação (lo vas a necesitar).</p>
              </div>
              <div className="flex gap-4 items-start">
                <FloatingCheckIcon delayClass="animate-float-reverse" />
                <p className="text-sm text-gray-700 font-medium pt-1"><span className="font-bold">DIETA SIN RESTRICCIONES:</span> Mejora tu cuerpo y tu salud a través de una dieta simple y rápida de solo 7 días.</p>
              </div>
              <div className="flex gap-4 items-start">
                <FloatingCheckIcon delayClass="animate-float" />
                <p className="text-sm text-gray-700 font-medium pt-1"><span className="font-bold">CLAREAMIENTO DE ENTREPIERNAS Y AXILAS:</span> El método utilizado por artistas para tener axilas y entrepiernas claras.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handlePurchase} 
            disabled={isProcessing}
            className={`w-full ${isProcessing ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 animate-bounce-short shadow-xl'} text-white text-xl font-black py-5 rounded-2xl shadow-xl transform active:scale-95 transition-all uppercase flex items-center justify-center gap-3`}
          >
            {isProcessing ? (
              <>
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </>
            ) : (
              "¡Comprar ahora!"
            )}
          </button>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg text-center space-y-4">
        <div className="w-20 h-20 mx-auto mb-2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#fef3c7" />
            <path d="M50 20 L60 40 L85 45 L65 65 L70 90 L50 75 L30 90 L35 65 L15 45 L40 40 Z" fill="#f59e0b" />
          </svg>
        </div>
        <h3 className="text-xl font-black uppercase">Garantía de devolución del dinero de 7 días</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Nuestro plan <span className="font-bold text-pink-500">Seios Up!</span> está respaldado por una garantía de devolución del 100% del dinero.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Estamos tan confiados de que nuestro programa le ayudará que garantizamos un reembolso total dentro de los 7 días posteriores a la compra, si no ve resultados visibles en sus senos.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <div className="w-12 h-12 grayscale opacity-30 bg-gray-200 rounded-lg"></div>
          <div className="w-12 h-12 grayscale opacity-30 bg-gray-200 rounded-lg"></div>
        </div>
      </section>
    </div>
  );
};

// Advanced 3D Logo Component
const Logo3D: React.FC<{ sizeClass?: string }> = ({ sizeClass = "text-2xl" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({ x: ((centerY - y) / centerY) * 35, y: ((x - centerX) / centerX) * 35 });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div ref={containerRef} className="logo-3d-container select-none p-4" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="logo-3d-wrapper" style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}>
        <h1 className={`logo-3d-text ${sizeClass} tracking-tighter flex items-center justify-center gap-2`}>
          <span>SENOS</span> <span className="text-white drop-shadow-md">UP</span> <span>⤴️</span>
        </h1>
      </div>
    </div>
  );
};

const LoadingStep: React.FC<{ onComplete: () => void; statusText?: string }> = ({ onComplete, statusText }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => { 
        if (p >= 100) { 
          clearInterval(timer); 
          onComplete(); 
          return 100; 
        } 
        return p + 5; 
      });
    }, 40); // Intervalo reduzido de 150ms para 40ms para carregamento super rápido
    return () => clearInterval(timer);
  }, [onComplete]);
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-20 animate-fade-in text-center">
      <div className="w-24 h-24 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      <p className="text-gray-500">{statusText || "Analizando..."}</p>
      <div className="w-64 bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-pink-500 transition-all" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default function App() {
  const [state, setState] = useState<QuizState>({ currentStep: 0, answers: {}, isCompleted: false });
  const currentStepData = QUIZ_STEPS[state.currentStep];

  const handleNext = useCallback((answerId?: string) => {
    if (state.currentStep < QUIZ_STEPS.length - 1) {
      setState(prev => ({ ...prev, answers: answerId ? { ...prev.answers, [prev.currentStep]: answerId } : prev.answers, currentStep: prev.currentStep + 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setState(prev => ({ ...prev, isCompleted: true }));
    }
  }, [state.currentStep]);

  if (state.isCompleted) return <SalesPage />;

  const getAnimationClass = (index: number) => {
    const floatClasses = ['animate-float', 'animate-float-delayed', 'animate-float-slow', 'animate-float-reverse'];
    return `${floatClasses[index % 4]}`;
  };

  return (
    <div className="min-h-screen custom-gradient pb-10">
      <div className="fixed top-0 left-0 w-full h-2 bg-pink-100 z-50">
        <div className="h-full bg-pink-500 transition-all duration-700" style={{ width: `${currentStepData.progressPercent}%` }} />
      </div>
      <div className="max-w-lg mx-auto pt-10 px-6">
        <header className="text-center mb-12"><Logo3D /></header>
        <main className="bg-white rounded-3xl shadow-2xl p-6 min-h-[500px] flex flex-col transition-all overflow-hidden">
          {currentStepData.type === 'loading' ? (
            <LoadingStep onComplete={() => handleNext()} statusText={currentStepData.statusText} />
          ) : currentStepData.type === 'score' ? (
            <div className="flex flex-col items-center space-y-8 animate-fade-in py-6">
              <div className="text-center w-full">
                <h2 className="text-xl font-bold mb-1">{currentStepData.title}</h2>
                <p className="text-gray-400 text-sm">¡Aprobada!</p>
              </div>
              
              <div className="relative w-full h-12 flex items-center justify-center px-4">
                <div className="w-full h-3 bg-gray-100 rounded-full flex overflow-hidden">
                  <div className="w-1/3 bg-red-400"></div>
                  <div className="w-1/3 bg-yellow-400"></div>
                  <div className="w-1/3 bg-green-400"></div>
                </div>
                <ScoreIndicator />
                <div className="absolute w-full flex justify-between px-6 pt-10 text-[10px] font-bold text-gray-400">
                  <span>Bajo</span>
                  <span>Medio</span>
                  <span>Alto</span>
                </div>
              </div>

              <AnimatedScore target={63} />

              <div className="bg-red-50 p-4 rounded-xl border border-red-100 w-full">
                <p className="text-red-600 font-bold text-sm mb-1">⚠️ ¡Estás lista!</p>
                <p className="text-red-500 text-xs">De acuerdo a tus respuestas, estás totalmente lista para comenzar.</p>
              </div>

              <button onClick={() => handleNext()} className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-auto">Continuar</button>
            </div>
          ) : currentStepData.type === 'info' ? (
            <div className="flex flex-col h-full animate-fade-in space-y-6">
              <h2 className="text-2xl font-bold text-center leading-tight">{currentStepData.title}</h2>
              <div className="rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center animate-float h-64">
                {currentStepData.id === 10 ? <PelvicFloorIllustration /> : 
                 currentStepData.id === 12 ? <StrengtheningIllustration /> :
                 currentStepData.id === 8 ? <PillPackIllustration /> :
                 currentStepData.id === 5 ? <WomenCommunityIllustration /> :
                 currentStepData.image && <img src={currentStepData.image} className="w-full h-auto max-h-64 object-contain" />}
              </div>
              <p className="text-gray-600 text-sm text-center px-4">{currentStepData.description}</p>
              <button onClick={() => handleNext()} className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-auto">{currentStepData.buttonText || "Continuar"}</button>
            </div>
          ) : currentStepData.type === 'carousel' ? (
            <div className="flex flex-col h-full animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                <p className="text-gray-500 text-sm">{currentStepData.subtitle}</p>
              </div>
              <div className="flex-1 overflow-x-auto flex gap-6 pb-6 snap-x no-scrollbar px-2">
                {currentStepData.options?.map((opt, idx) => {
                  const Illustration = opt.id === 'res1' ? ResultBeforeIllustration : 
                                       opt.id === 'res2' ? ResultAfterIllustration : null;
                  return (
                    <div key={opt.id} className={`min-w-[85%] snap-center flex flex-col gap-3 ${getAnimationClass(idx)}`}>
                      <div className={`rounded-3xl overflow-hidden shadow-xl border-4 ${opt.id === 'res2' ? 'border-pink-200' : 'border-gray-100'} h-72`}>
                        {Illustration ? <Illustration /> : <img src={opt.image} alt={opt.text} className="w-full h-full object-cover" />}
                      </div>
                      <div className={`text-center py-2 px-6 rounded-full font-black uppercase text-[10px] tracking-tighter mx-auto ${opt.id === 'res2' ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-gray-400 text-white'}`}>
                        {opt.text}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-2 mb-6">
                <div className="w-3 h-1.5 rounded-full bg-pink-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-pink-200"></div>
              </div>
              <button 
                onClick={() => handleNext()}
                className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-auto"
              >
                Continuar
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="text-center mb-8 animate-fade-in">
                <h2 className="text-2xl font-bold leading-tight">{currentStepData.title}</h2>
                {currentStepData.subtitle && <p className="text-gray-400 text-sm">{currentStepData.subtitle}</p>}
              </div>
              <div className={`grid ${currentStepData.options?.[0]?.image || [1, 2, 4].includes(currentStepData.id) ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-8`}>
                {currentStepData.options?.map((option, idx) => {
                  const Illustration = currentStepData.id === 1 ? AgeIllustrations[option.id as keyof typeof AgeIllustrations] :
                                       currentStepData.id === 2 ? SagIllustrations[option.id as keyof typeof SagIllustrations] :
                                       currentStepData.id === 4 ? BodyTypeIllustrations[option.id as keyof typeof BodyTypeIllustrations] : null;
                  return (
                    <button key={option.id} onClick={() => handleNext(option.id)} className={`w-full flex flex-col border-2 border-pink-100 hover:border-pink-500 hover:bg-pink-50 transition-all rounded-2xl overflow-hidden p-1 ${getAnimationClass(idx)}`}>
                      {(option.image || Illustration) && (
                        <div className="w-full h-44 bg-gray-100 rounded-t-xl overflow-hidden">
                          {Illustration ? <div className="w-full h-full"><Illustration /></div> : <img src={option.image} className="w-full h-full object-cover" />}
                        </div>
                      )}
                      <div className={`w-full ${option.image || Illustration ? 'bg-pink-500 py-2' : 'p-4'} flex items-center justify-center`}>
                        <span className={`font-bold ${option.image || Illustration ? 'text-white text-xs' : 'text-gray-700'}`}>{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}