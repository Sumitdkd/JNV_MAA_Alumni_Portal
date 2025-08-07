

import React from 'react';

export default function Preloader() {
    const schoolName = "JNV Mandphia".split('');
    const subtitle = "Alumni Association".split('');

    return (
        <div className="fixed inset-0 bg-primary flex flex-col justify-center items-center z-50 overflow-hidden">
            <style>
                {`
                    @keyframes draw-line {
                        from { width: 0; opacity: 0; }
                        50% { opacity: 1; }
                        to { width: 100%; opacity: 0; }
                    }
                    .line-animate {
                        width: 0;
                        height: 2px;
                        background-color: #4ADAD2;
                        animation: draw-line 1.5s ease-out forwards;
                        animation-delay: 1.3s; /* Start after main title fades in */
                    }

                    @keyframes fade-in-up {
                        from {
                            opacity: 0;
                            transform: translateY(25px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .letter-animate {
                        display: inline-block;
                        opacity: 0;
                        animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    }
                `}
            </style>

            <div className="w-full max-w-md text-center">
                {/* The main title with letter-by-letter animation */}
                <h1 className="text-6xl font-extrabold text-white tracking-widest mb-4">
                    {schoolName.map((letter, index) => (
                        <span
                            key={index}
                            className="letter-animate"
                            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    ))}
                </h1>

                <div className="line-animate mx-auto max-w-xs"></div>
                <p className="mt-4 text-2xl text-primary-light tracking-wider">
                    {subtitle.map((letter, index) => (
                        <span
                            key={index}
                            className="letter-animate"
                            style={{ animationDelay: `${1.5 + index * 0.05}s` }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
}
