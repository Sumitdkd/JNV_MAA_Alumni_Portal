import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, UserGroupIcon, GlobeAltIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useInView } from 'react-intersection-observer';
import logo1 from "../Assets/logo1.png"

const notableAlumni = [
    { name: 'Ravi Sharma', batch: '2009', achievement: 'IAS Officer, Govt. of Rajasthan' },
    { name: 'Meena Verma', batch: '2011', achievement: 'Software Engineer at Google' },
    { name: 'Vikas Singh', batch: '2010', achievement: 'Social Entrepreneur & NGO Founder' },
];

const AnimatedSection = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return (
        <div ref={ref} className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

export default function LandingPage() {
    return (
        <>
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-0 m-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-contrast to-secondary"></div>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
                    <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse delay-1500"></div>

                    {[...Array(15)].map((_, i) => <div key={i} className={`star star-${i + 1}`}></div>)}

                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>
                </div>
                <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-premium border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-premium relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        <img src={logo1} alt="JNV MAA Logo"className="w-6 h-6 sm:w-8 sm:h-8 mr-2 object-contain"/>
                        <span className="text-sm font-medium relative z-10">Join 1000+ Alumni of JNV Mandaphia</span>
                    </div>
                    <div className="space-y-6 mb-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
                            <span className="block text-white/90">Welcome to</span>
                            <span className="block gradient-text">
                                JNV MAA
                            </span>
                        </h1>
                        <h2 className="text-4xl md:text-6xl lg:text-6xl font-black tracking-tight text-white">
                            Mandaphia Alumni Association
                        </h2>
                    </div>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
                        Connect with fellow alumni, celebrate memories, and grow together with JNV Mandaphia.
                        <span className="block text-secondary font-medium mt-2">Together we shine brighter.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <Link to="/register" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 text-primary font-bold py-4 px-10 rounded-2xl text-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 premium-button overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                            <span className="relative z-10">Get Started</span>
                            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                        </Link>
                        <Link to="/login" className="group relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-premium border-2 border-white/30 text-white font-bold py-4 px-10 rounded-2xl text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 premium-button shadow-premium overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                            <span className="relative z-10">Sign In</span>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section id="about" className="py-20">
                    <AnimatedSection>
                        <div className="container mx-auto max-w-5xl text-center">
                            <h3 className="text-4xl font-bold text-on-surface mb-4">About JNV Mandaphia, Chittorgarh</h3>
                            <p className="text-muted text-lg leading-relaxed">
                                Jawahar Navodaya Vidyalaya Mandaphia, located in Chittorgarh, Rajasthan, has been a center of excellence since 1987. Our institution nurtures rural talent with modern, value-based education, shaping young minds into tomorrow’s leaders. Rooted in discipline and inclusivity, JNV fosters academic excellence, community spirit, and national service.
                            </p>
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6 bg-surface rounded-xl shadow-lg"><AcademicCapIcon className="h-12 w-12 mx-auto text-primary" />
                                    <h4 className="text-xl font-bold mt-4">Academic Excellence</h4><p className="text-muted mt-2">Consistently high-performing results and nurturing environment.</p></div>
                                <div className="p-6 bg-surface rounded-xl shadow-lg"><UserGroupIcon className="h-12 w-12 mx-auto text-primary" />
                                    <h4 className="text-xl font-bold mt-4">Thriving Alumni</h4><p className="text-muted mt-2">A proud network of changemakers, professionals, and pioneers.</p></div>
                                <div className="p-6 bg-surface rounded-xl shadow-lg"><GlobeAltIcon className="h-12 w-12 mx-auto text-primary" />
                                    <h4 className="text-xl font-bold mt-4">Nation Builders</h4><p className="text-muted mt-2">Dedicated to producing socially responsible global citizens.</p></div>
                            </div>
                        </div>
                    </AnimatedSection>
                </section>

                <section id="notable-alumni" className="py-20 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="container mx-auto max-w-5xl text-center">
                            <h3 className="text-4xl font-bold text-on-surface mb-12">Notable Alumni</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {notableAlumni.map((alumnus, index) => (
                                    <div key={index} className="bg-surface p-6 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                        <h4 className="text-xl font-bold text-primary">{alumnus.name}</h4>
                                        <p className="text-sm font-semibold text-muted">Batch of {alumnus.batch}</p>
                                        <p className="mt-3 text-on-surface">{alumnus.achievement}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </section>

                <section id="developer">
                    {/* Footer Section */}
                </section>
            </div>
        </>
    );
}
