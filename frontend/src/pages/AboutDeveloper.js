import React, { useState, useEffect, use } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  UserGroupIcon,
  TrophyIcon,
  CalendarIcon,
  StarIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  HeartIcon,
  SparklesIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import aboutData from "../data/about-data.json";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const teamContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const teamMemberVariants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.8,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateY: 2,
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const avatarVariants = {
  hidden: { 
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
};

const skillVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0,
    x: -20,
  },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      delay: 0.6 + i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const socialVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.8 + i * 0.1,
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 300,
    },
  }),
};

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [-3, 3, -3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const updateCounter = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const current = Math.floor(progress * parseInt(end));
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Icon mapping
const getIcon = (iconName, className = "w-6 h-6") => {
  const icons = {
    users: UserGroupIcon,
    trophy: TrophyIcon,
    calendar: CalendarIcon,
    star: StarIcon,
    chart: ChartBarIcon,
    message: ChatBubbleLeftRightIcon,
    briefcase: BriefcaseIcon,
    academic: AcademicCapIcon,
    heart: HeartIcon,
    sparkles: SparklesIcon,
    code: CodeBracketIcon,
    globe: GlobeAltIcon,
    phone: PhoneIcon,
    envelope: EnvelopeIcon,
    location: MapPinIcon,
  };

  const IconComponent = icons[iconName] || SparklesIcon;
  return <IconComponent className={className} />;
};

// Social Media Icon Component
const getSocialIcon = (platform, className = "w-5 h-5") => {
  const socialIcons = {
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    linkedin: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          clipRule="evenodd"
        />
      </svg>
    ),
    instagram: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.252 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/>
      </svg>
    ),
    website: <GlobeAltIcon className={className} />,
  };

  return (
    socialIcons[platform] || <ArrowTopRightOnSquareIcon className={className} />
  );
};

// Animated Section Component with scroll-based animations
const AnimatedSection = ({
  children,
  className = "",
  variants = containerVariants,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll Progress Component
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary/80 to-primary/100 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Parallax Component
const ParallaxSection = ({ children, offset = 50 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default function AboutDeveloper() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth", }); 
  }, []);

  const [activeTab, setActiveTab] = useState("developers");

  const tabs = [
    { id: "institution", label: "Institution", icon: "academic" },
    { id: "developers", label: "Developers", icon: "users" },
    { id: "project", label: "Project", icon: "code" },
  ];

  return (
    <div className="min-h-screen bg-transparent relative">
      <ScrollProgress />

      {/* Hero Section */}
      <motion.section
        className="relative py-2 sm:py-16 md:py-2 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <ParallaxSection offset={30}>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary/50 to-primary/60 rounded-full mb-4 sm:mb-6">
                <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary/80 via-primary/90 to-primary/100 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
            >
              {aboutData.heroSection.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4 max-w-4xl mx-auto px-2"
            >
              {aboutData.heroSection.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 max-w-3xl mx-auto px-2 leading-relaxed"
            >
              {aboutData.heroSection.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2"
            >
              {aboutData.heroSection.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-3 sm:p-4"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary/70 to-primary/90 rounded-full mb-3 sm:mb-4">
                    {getIcon(stat.icon, "w-6 h-6 sm:w-8 sm:h-8 text-white")}
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                    <AnimatedCounter
                      end={stat.value.replace(/[^0-9]/g, "")}
                      suffix={stat.value.replace(/[0-9]/g, "")}
                    />
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ParallaxSection>
      </motion.section>

      {/* Tab Navigation */}
      <AnimatedSection
        className="px-4 mb-8 sm:mb-12"
        variants={slideInVariants}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6 sm:mb-8">
            <motion.div
              className="flex items-center justify-around bg-primary/30 rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg border border-primary/100 w-full max-w-md sm:max-w-none overflow-x-auto"
              layout
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 whitespace-nowrap flex-1 sm:flex-none text-sm sm:text-base ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-primary/70 to-primary/100 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  {getIcon(tab.icon, "w-4 h-4 sm:w-5 sm:h-5")}
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Project Section */}
      {activeTab === "project" && (
        <AnimatedSection
          className="px-4 mb-12 sm:mb-16"
          variants={fadeInUpVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                {aboutData.aboutProject.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
                {aboutData.aboutProject.description}
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
            >
              {aboutData.aboutProject.features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 group cursor-pointer"
                >
                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    {getIcon(feature.icon, "w-6 h-6 sm:w-8 sm:h-8 text-white")}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Technologies */}
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                Technologies Used
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {aboutData.aboutProject.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 bg-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">
                        {tech.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                        {tech.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Institution Section */}
      {activeTab === "institution" && (
        <AnimatedSection
          className="px-4 mb-12 sm:mb-16"
          variants={fadeInUpVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-center mb-8 sm:mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4 sm:mb-6"
              >
                <AcademicCapIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                {aboutData.aboutInstitution.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
                {aboutData.aboutInstitution.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
              {/* History & Mission */}
              <motion.div
                variants={cardVariants}
                className="space-y-6 sm:space-y-8"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Our History
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {aboutData.aboutInstitution.history}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-primary/50 to-primary/60 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    Our Vision
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed opacity-90">
                    {aboutData.aboutInstitution.vision}
                  </p>
                </div>
              </motion.div>

              {/* Values & Achievements */}
              <motion.div
                variants={cardVariants}
                className="space-y-6 sm:space-y-8"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Our Values
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {aboutData.aboutInstitution.values.map((value, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {value.title}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {value.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Achievements */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {aboutData.aboutInstitution.achievements.map(
                  (achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-sm sm:text-base">
                        {achievement}
                      </span>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Developers Section */}
      {activeTab === "developers" && (
        <AnimatedSection
          className="px-4 mb-12 sm:mb-16"
          variants={fadeInUpVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                {aboutData.aboutDevelopers.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
                {aboutData.aboutDevelopers.description}
              </p>
            </motion.div>

            {/* Team Members */}
            <motion.div
              variants={teamContainerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
            >
              {aboutData.aboutDevelopers.team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={teamMemberVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 text-center group relative overflow-hidden"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background animation elements */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-0"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 1 }}
                  />
                  
                  <motion.div
                    className="relative inline-block mb-4 sm:mb-6"
                    variants={avatarVariants}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ 
                        delay: index * 0.3 + 0.2, 
                        duration: 0.8,
                        ease: "easeOut" 
                      }}
                    />
                    <motion.img
                      src={member.avatar}
                      alt={member.name}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto border-4 border-white object-cover z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.3 + 0.4, 
                        duration: 0.6,
                        ease: "easeOut" 
                      }}
                    />
                  </motion.div>

                  <motion.h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
                  >
                    {member.name}
                  </motion.h3>
                  
                  <motion.p
                    className="text-blue-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.6, duration: 0.5 }}
                  >
                    {member.role}
                  </motion.p>
                  
                  <motion.p
                    className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.7, duration: 0.5 }}
                  >
                    {member.description}
                  </motion.p>

                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
                    {member.expertise.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        custom={skillIndex}
                        variants={skillVariants}
                        initial="hidden"
                        animate="visible"
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full"
                        whileHover={{ 
                          scale: 1.1, 
                          y: -2,
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" 
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Social Links */}
                  {member.social && (
                    <motion.div 
                      className="flex justify-center gap-3 mb-4 sm:mb-6 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.3 + 0.8, duration: 0.5 }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      {member.social.github && member.social.github !== "" && (
                        <motion.a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors duration-300 cursor-pointer z-20"
                          custom={0}
                          variants={socialVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ 
                            scale: 1.2, 
                            y: -4,
                            rotate: 5,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.3)" 
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            console.log('GitHub link clicked:', member.social.github);
                            // Ensure the link opens
                            window.open(member.social.github, '_blank', 'noopener,noreferrer');
                          }}
                          style={{ pointerEvents: 'auto' }}
                        >
                          {getSocialIcon("github", "w-5 h-5")}
                        </motion.a>
                      )}
                      {member.social.linkedin &&
                        member.social.linkedin !== "#" && (
                          <motion.a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300 cursor-pointer z-20"
                            custom={1}
                            variants={socialVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ 
                              scale: 1.2, 
                              y: -4,
                              rotate: -5,
                              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)" 
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              console.log('LinkedIn link clicked:', member.social.linkedin);
                              // Ensure the link opens
                              window.open(member.social.linkedin, '_blank', 'noopener,noreferrer');
                            }}
                            style={{ pointerEvents: 'auto' }}
                          >
                            {getSocialIcon("linkedin", "w-5 h-5")}
                          </motion.a>
                        )}
                      {member.social.instagram &&
                        member.social.instagram !== "#" && (
                          <motion.a
                            href={member.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full transition-colors duration-300 cursor-pointer z-20"
                            custom={2}
                            variants={socialVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ 
                              scale: 1.2, 
                              y: -4,
                              rotate: 5,
                              boxShadow: "0 8px 20px rgba(236, 72, 153, 0.4)" 
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              console.log('Instagram link clicked:', member.social.instagram);
                              // Ensure the link opens
                              window.open(member.social.instagram, '_blank', 'noopener,noreferrer');
                            }}
                            style={{ pointerEvents: 'auto' }}
                          >
                            {getSocialIcon("instagram", "w-5 h-5")}
                          </motion.a>
                        )}
                      {member.social.website &&
                        member.social.website !== "#" && (
                          <motion.a
                            href={member.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-colors duration-300 cursor-pointer z-20"
                            custom={3}
                            variants={socialVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ 
                              scale: 1.2, 
                              y: -4,
                              rotate: 5,
                              boxShadow: "0 8px 20px rgba(168, 85, 247, 0.4)" 
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              console.log('Website link clicked:', member.social.website);
                              // Ensure the link opens
                              window.open(member.social.website, '_blank', 'noopener,noreferrer');
                            }}
                            style={{ pointerEvents: 'auto' }}
                          >
                            {getSocialIcon("website", "w-5 h-5")}
                          </motion.a>
                        )}
                    </motion.div>
                  )}

                  <motion.blockquote
                    className="text-gray-500 italic border-l-4 border-blue-500 pl-3 sm:pl-4 text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 + 0.9, duration: 0.5 }}
                  >
                    "{member.quote}"
                  </motion.blockquote>
                </motion.div>
              ))}
            </motion.div>

            {/* Development Process */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Development Process
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {aboutData.aboutDevelopers.developmentProcess.map(
                  (phase, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                          {phase.phase}
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {phase.description}
                        </p>
                      </div>
                      <div className="text-blue-600 font-semibold text-sm sm:text-base self-start sm:self-center">
                        {phase.duration}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Testimonials Section */}
      <AnimatedSection
        className="px-4 mb-12 sm:mb-16"
        variants={fadeInUpVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              What People Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Hear from our community about their experience with the Alumni
              Portal
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {aboutData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-blue-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-blue-600 text-xs sm:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-600 leading-relaxed italic text-sm sm:text-base">
                  "{testimonial.message}"
                </blockquote>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection
        className="px-4 pb-12 sm:pb-16"
        variants={fadeInUpVariants}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={cardVariants}
            className="bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full">
                <EnvelopeIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              {aboutData.contactInfo.title}
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
              {aboutData.contactInfo.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <motion.div
                className="flex items-center justify-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">
                  {aboutData.contactInfo.email}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">
                  {aboutData.contactInfo.phone}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <MapPinIcon className="w-7 h-7 sm:w-10 sm:h-10" />
                <span className="text-sm sm:text-base">{aboutData.contactInfo.address}</span>
              </motion.div>
            </div>

            <motion.button
              className="bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
