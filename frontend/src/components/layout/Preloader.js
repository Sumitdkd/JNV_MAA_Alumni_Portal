import React from 'react';

export default function Preloader() {
  const schoolName = "JNV Mandphia".split('');
  const subtitle = "Alumni Association".split('');

  return (
    <div className="fixed inset-0 bg-[#0A192F] flex flex-col justify-center items-center z-50 overflow-hidden">
      <style>
        {`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes draw-line {
            0% {
              width: 0%;
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              width: 100%;
              opacity: 0;
            }
          }

          .letter-animate {
            display: inline-block;
            opacity: 0;
            animation: fade-in-up 0.6s ease forwards;
          }

          .line-animate {
            height: 3px;
            background-color: #FFD700;
            animation: draw-line 1.4s ease-out forwards;
            animation-delay: 1.2s;
          }
        `}
      </style>

      <div className="text-center">
        {/* School Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-widest text-white drop-shadow-lg">
          {schoolName.map((letter, i) => (
            <span
              key={i}
              className="letter-animate"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Animated Line */}
        <div className="line-animate w-0 max-w-sm mt-3 mx-auto"></div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl mt-4 text-[#64FFDA] tracking-wider font-medium">
          {subtitle.map((letter, i) => (
            <span
              key={i}
              className="letter-animate"
              style={{ animationDelay: `${1.6 + i * 0.05}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
