"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Moon, Twitter, Linkedin, Users, Globe, ArrowDown, Smile, Zap, Menu, X } from "lucide-react";

import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom"

import { FaBehance } from "react-icons/fa";

import heroimage from "@/assets/images/raff.png"
import sideimage from "@/assets/images/image-4.jpg"
import cardimage1 from "@/assets/images/image-6.png"
import cardimage2 from "@/assets/images/image-7.png"
import cardimage3 from "@/assets/images/image-8.png"
import cardimage4 from "@/assets/images/image-9.png"


// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
}

const socials = [
  { Icon: FaBehance, url: "https://behance.net/iamrapha3l_" },
  { Icon: Twitter, url: "https://x.com/iamrapha3l_" },
  { Icon: Linkedin, url: "https://www.linkedin.com/in/raphael-ogumba-543b6a234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
];

const navigationItems = [
  { name: "Work", id: "work" },
  { name: "About", id: "about" },
  { name: "What I do", id: "services" },
];



export default function PortfolioLanding() {
  const [isDark, setIsDark] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      await emailjs.send(
        "service_xr1gtwf",
        "template_vn63b2l",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "OO2LEGv4F1JpkPU1S"
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message. Please try again later.");
    }
    setSending(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white text-lg"
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-500`}
      >
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left side - Theme toggle and desktop nav */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Desktop Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:flex space-x-6"
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <button
                      type="button"
                      className="text-sm font-medium hover:text-gray-300 transition-colors relative group bg-transparent border-none outline-none cursor-pointer"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.name}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Center - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="flex items-center"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <img
                  src={heroimage || "/placeholder.svg"}
                  alt="Frank's Profile"
                  width={50}
                  height={50}
                  className="rounded-full sm:w-[60px] sm:h-[60px]"
                />
              </motion.div>
            </motion.div>

            {/* Right side - Social icons, Contact button, and Mobile menu button */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Social Icons and Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden sm:flex items-center space-x-3"
              >
                {socials.map(({ Icon, url }, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </motion.div>
                ))}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-white text-black hover:bg-gray-200 rounded-full px-4 lg:px-6 text-sm transition-all duration-300"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact
                  </Button>
                </motion.div>
              </motion.div>

              {/* Mobile Hamburger Menu Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={toggleMobileMenu}
              />

              {/* Mobile Menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/90 backdrop-blur-md z-50 lg:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Menu</h2>
                    <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 px-6 py-8">
                    <div className="space-y-6">
                      {navigationItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className="block w-full text-left text-lg font-medium text-white hover:text-gray-300 transition-colors py-2"
                          >
                            {item.name}
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mobile Social Icons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center space-x-4 mt-8 pt-8 border-t border-white/10"
                    >
                      {socials.map(({ Icon, url }, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full hover:bg-white/10 transition-colors"
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </a>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Mobile Contact Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8"
                    >
                      <Button
                        className="w-full bg-white text-black hover:bg-gray-200 rounded-full py-3 text-base font-medium transition-all duration-300"
                        onClick={() => scrollToSection("contact")}
                      >
                        Contact Me
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="pt-48 pb-20 px-4 sm:px-6 relative overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-800/20 pointer-events-none"
          />
          <div className="max-w-7xl mx-auto relative">
            <div className="max-w-4xl sm:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl heading-text-1 font-bold leading-tight mb-8"
              >
                Hi, I'm Raphael. UI/UX Designer{" "}
                <motion.span
                  animate={{ rotate: [0, 40, -40, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  className="inline-block"
                >
                  <Smile className="inline w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-2 sm:ml-4" />
                </motion.span>
                . Crafting better digital experiences.{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                  className="inline-block"
                >
                  <Zap className="inline w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-2 sm:ml-4" />
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl paragraph-text text-gray-400 mb-12 max-w-2xl mx-auto sm:mx-0"
              >
                I design innovative solutions that captivate audiences, and every interaction inspires action
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex sm:justify-start"
              >
                <Button
                  className="bg-white text-black hover:bg-gray-200 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    const el = document.getElementById("work")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  View Work
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 90 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute right-20 side-text top-1/2 transform -translate-y-1/2 text-sm text-gray-500 rotate-90 hidden lg:block"
              >
                AVAILABLE
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          id="services"
          className="py-16 sm:py-20 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="max-w-3xl mb-12 sm:mb-16 sm:text-left">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl heading-text font-bold mb-6 sm:mb-8"
              >
                Design solutions that solve real problems
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl paragraph-text text-gray-400">
                High-impact design solutions to help your product look better, work better, and convert better.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid paragraph-text grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {[
                {
                  title: "Web Design",
                  description:
                    "I design high-converting websites that blend visual appeal with seamless functionality, optimized for user experience and business growth.",
                  features: ["Starting at", "$1000"],
                },
                {
                  title: "App Design",
                  description:
                    "I craft intuitive app interfaces that simplify complex workflows and enhance user satisfaction across mobile and desktop experiences.",
                  features: ["Starting at", "$1500"],
                },
                {
                  title: "UX Audit & Redesign",
                  description: "Ideal for businesses with outdated, underperforming, or inconsistent digital products.",
                  features: ["Starting at", "$800"],
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full"
                >
                  <Card className="bg-[#0d0d0d] border-[#555555] p-6 sm:p-8 h-full hover:border-gray-600 transition-all duration-300">
                    <CardContent className="p-0">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="text-xl sm:text-2xl font-bold mb-4 text-white"
                      >
                        {service.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed"
                      >
                        {service.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="space-y-2 mb-6 sm:mb-8"
                      >
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.1 }}
                            className={
                              featureIndex === 1 ? "text-2xl sm:text-3xl font-bold text-white" : "text-sm text-gray-500"
                            }
                          >
                            {feature}
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          id="about"
          className="py-16 sm:py-20 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              {/* Text Content */}
              <motion.div variants={fadeInLeft} className="lg:text-left">
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl heading-text font-bold mb-6 sm:mb-8"
                >
                  Helping happy people to launch faster and grow bigger{" "}
                  <motion.span
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="inline-block"
                  >
                    <ArrowDown className="inline w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-2 sm:ml-4" />
                  </motion.span>
                </motion.h2>
              </motion.div>

              {/* Image Content */}
              <motion.div variants={fadeInRight} className="relative order-first lg:order-last">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <img
                    src={sideimage || "/placeholder.svg"}
                    alt="Frank working at computer"
                    className="rounded-2xl w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                </motion.div>

                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="hidden md:block absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 bg-black/80 backdrop-blur-md rounded-lg p-4 sm:p-6 max-w-[280px] sm:max-w-sm"
                >
                  <p className="text-xs sm:text-sm paragraph-text text-gray-300 leading-relaxed">
                    My mission is to ethically help people achieve their goals and speed up the publication workflow. From
                    idea to execution, I create them assets that erase the struggle between idea and launch.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Portfolio Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          id="work"
          className="py-20 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={staggerContainer} className="grid paragraph-text md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  title: "RentEase",
                  description: "Discover your ideal apartment effortlessly without stress...",
                  image: cardimage1,
                  onClick: () => navigate("/rentease")
                },
                {
                  title: "Epidemic Sounds",
                  description: "Epidemic Sounds provides high-quality music for content creators...",
                  gradient: "from-orange-400 to-yellow-300",
                  image: cardimage2,
                  onClick: () => navigate("/epidemic-sounds"),
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-[#0d0d0d] border-gray-800 overflow-hidden group cursor-pointer hover:border-gray-600 transition-all duration-300"
                    onClick={project.onClick}
                    style={project.title === "RentEase" ? { cursor: "pointer" } : {}}
                  >
                    <div className="relative">
                      {project.image ? (
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} Project`}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
                        >
                          <div className="text-center">
                            <motion.div
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              className="w-32 h-20 bg-white/20 rounded-lg mb-4 mx-auto"
                            />
                            <motion.div
                              animate={{ y: [0, 10, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                              className="w-16 h-16 bg-white/20 rounded-lg mx-auto"
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="absolute bottom-6 left-6 right-6"
                      >
                        <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                        <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Case study</span>
                          <motion.div
                            whileHover={{ rotate: 45, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                              <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Over Wallet",
                  description: "Over Wallet is a digital wallet solution designed to simplify transactions...",
                  image: cardimage3,
                  onClick: () => navigate("/over-wallet"),
                },
                {
                  title: "NFT Marketplace",
                  description: "We redesigned a student productivity app to help Gen Z learn about NFTs...",
                  gradient: "from-gray-800 to-gray-600",
                  image: cardimage4,
                  onClick: () => navigate("/nft-marketplace"),
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-[#0d0d0d] border-gray-800 overflow-hidden group cursor-pointer hover:border-gray-600 transition-all duration-300"
                    onClick={project.onClick}
                    style={project.title === "Over Wallet" ? { cursor: "pointer" } : {}}
                  >

                    <div className="relative">
                      {project.image ? (
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} Project`}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
                        >
                          <div className="flex space-x-4">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              className="w-16 h-16 bg-orange-500 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                              className="w-12 h-12 bg-orange-500 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="absolute bottom-6 left-6 right-6"
                      >
                        <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                        <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Case study</span>
                          <motion.div
                            whileHover={{ rotate: 45, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                              <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Tools Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-5xl heading-text md:text-6xl font-bold mb-8">
              Tools I Use
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl paragraph-text text-gray-400 mb-16 max-w-3xl mx-auto">
              I work with modern design tools to craft, test, and deliver better user experiences — faster.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid paragraph-text md:grid-cols-4 gap-8">
              {[
                {
                  name: "React",
                  description: "Website builder",
                  icon: "R",
                  bg: "bg-white",
                  text: "text-black"
                },
                {
                  name: "Figma",
                  description: "Industry standard for UI/UX design and collaboration",
                  icon: "F",
                  bg: "bg-gradient-to-br from-purple-500 to-pink-500",
                  text: "text-white",
                },
                {
                  name: "Notion",
                  description: "for project documentation and collaboration",
                  icon: "N",
                  bg: "bg-white",
                  text: "text-black",
                },
                {
                  name: "Slack",
                  description: "for project documentation and collaboration",
                  icon: "#",
                  bg: "bg-gradient-to-br from-blue-500 to-purple-500",
                  text: "text-white",
                },
              ].map((tool, index) => (
                <motion.div
                  key={tool.name}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-[#0d0d0d] border-gray-800 p-8 hover:border-gray-600 transition-all duration-300">
                    <CardContent className="p-0 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 ${tool.bg} rounded-lg mx-auto mb-4 flex items-center justify-center`}
                      >
                        <span className={`${tool.text} font-bold`}>{tool.icon}</span>
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2 text-white">{tool.name}</h3>
                      <p className="text-gray-400 text-sm">{tool.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 paragraph-text px-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  price: "$1,000",
                  features: [
                    "Custom design tailored to your brand",
                    "UX-focused layout with conversion in mind",
                    "Fully responsive for all devices",
                    "Built with Framer, optimized for performance",
                  ],
                },
                {
                  price: "$1,500",
                  features: [
                    "User flow mapping and wireframing",
                    "UI design that reflects product personality",
                    "Component-driven, scalable systems",
                    "Prototyped interactions for real feel",
                  ],
                },
                {
                  price: "$800",
                  features: [
                    "UX audit report with key issues and insights",
                    "Redesigned screens (mobile + desktop)",
                    "Updated user flow recommendations",
                    "Developer-ready Figma file with specs",
                  ],
                },
              ].map((pricing, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-[#0d0d0d] border-gray-800 p-8 h-full hover:border-gray-600 transition-all duration-300">
                    <CardContent className="p-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 300 }}
                        className="text-4xl font-bold mb-2 text-white"
                      >
                        {pricing.price}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-6 text-white">What you will get</h3>
                      <ul className="space-y-4 mb-8">
                        {pricing.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 + featureIndex * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-all duration-300"
                          onClick={() => {
                            const el = document.getElementById("contact");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Contact
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="py-16 sm:py-20 px-4 sm:px-6"
          id="contact"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl heading-text font-bold mb-6 sm:mb-8"
            >
              {"Let's Work Together"}
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-lg sm:text-xl paragraph-text text-gray-400 mb-8 sm:mb-12">
              Have a project in mind? {"I'm"} just a message away.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row paragraph-text justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12 mb-12 sm:mb-16"
            >
              {[
                { icon: Users, text: "24/7 Full Time Support" },
                { icon: Globe, text: "Available Worldwide" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  <span className="text-gray-300 text-sm sm:text-base">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-md mx-auto mb-12 sm:mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="sm:w-auto bg-white text-black hover:bg-gray-200 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    const el = document.getElementById("work")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  View Work
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <form className="space-y-4 sm:space-y-6 paragraph-text" onSubmit={handleSubmit}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Input
                    placeholder="Name*"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="bg-[#0d0d0d] border-gray-700 text-white placeholder-gray-400 rounded-lg h-12 sm:h-14 focus:border-white transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    className="bg-[#0d0d0d] border-gray-700 text-white placeholder-gray-400 rounded-lg h-12 sm:h-14 focus:border-white transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Message*"
                    rows={5}
                    className="bg-[#0d0d0d] border-gray-700 text-white placeholder-gray-400 rounded-lg resize-none focus:border-white transition-all duration-300 text-sm sm:text-base min-h-[120px] sm:min-h-[150px]"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-white text-black font-bold hover:bg-gray-200 rounded-full py-5 sm:py-7 text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : sent ? "Sent!" : "Submit Now"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-12 px-6 border-t border-gray-800"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                <img
                  src={heroimage}
                  alt="Frank's Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </motion.div>
              <div className="flex space-x-8">
                {["Work", "About", "What I do"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {item === "Work" ? (
                      <button
                        type="button"
                        className="text-sm font-medium hover:text-gray-300 transition-colors relative group bg-transparent border-none outline-none cursor-pointer"
                        onClick={() => {
                          const el = document.getElementById("work");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item}
                        <motion.div
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                          whileHover={{ width: "100%" }}
                        />
                      </button>
                    ) : item === "About" ? (
                      <button
                        type="button"
                        className="text-sm font-medium hover:text-gray-300 transition-colors relative group bg-transparent border-none outline-none cursor-pointer"
                        onClick={() => {
                          const el = document.getElementById("about");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item}
                        <motion.div
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                          whileHover={{ width: "100%" }}
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-sm font-medium hover:text-gray-300 transition-colors relative group bg-transparent border-none outline-none cursor-pointer"
                        onClick={() => {
                          const el = document.getElementById("services");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item}
                        <motion.div
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                          whileHover={{ width: "100%" }}
                        />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </AnimatePresence>
  )
}
