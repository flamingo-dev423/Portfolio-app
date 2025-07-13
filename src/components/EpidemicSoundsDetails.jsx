"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Twitter, Linkedin, ArrowLeft, Menu, X } from "lucide-react"
import { FaBehance } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import heroimage from "@/assets/images/raff.png"
import cardimage1 from "@/assets/images/image-6.png"
import workspace from "@/assets/images/workspace.png"
import cardimage2 from "@/assets/images/image-7.png"
import cardimage3 from "@/assets/images/image-8.png"


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
  {
    Icon: Linkedin,
    url: "https://www.linkedin.com/in/raphael-ogumba-543b6a234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
]

const navigationItems = [
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "What I do", href: "/#services" },
]

export default function EpidemicSoundsDetails() {
  const [isDark, setIsDark] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Add this line
  const [isLoading, setIsLoading] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])


  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
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
                  <Link
                    href={item.href}
                    className="text-sm font-medium hover:text-gray-300 transition-colors relative group"
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
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
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
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
                <Link href="/#contact">
                  <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 lg:px-6 text-sm transition-all duration-300">
                    Contact
                  </Button>
                </Link>
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
                        <Link
                          href={item.href}
                          onClick={toggleMobileMenu}
                          className="block w-full text-left text-lg font-medium text-white hover:text-gray-300 transition-colors py-2"
                        >
                          {item.name}
                        </Link>
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
                    <Link href="/#contact">
                      <Button
                        className="w-full bg-white text-black hover:bg-gray-200 rounded-full py-3 text-base font-medium transition-all duration-300"
                        onClick={toggleMobileMenu}
                      >
                        Contact Me
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Main Content */}
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 heading-text-1">Epidemic Sounds</h1>
            <p className="text-xl paragraph-text md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
              Epidemic Sound is a web-based platform that provides royalty-free music for creators, filmmakers, and businesses.
              They approached us with a clear objective—to enhance the browsing and discovery experience for users who often felt overwhelmed by the sheer
              volume of content available. Many users found it difficult to locate the perfect track quickly, which led to frustration and drop-offs.
            </p>
            <div className="mt-8">
              <span className="text-sm font-medium text-gray-500">Live link</span>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="mb-16 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
              <img
                src={cardimage2} alt="RentEase App Interface" className="object-cover" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-16">
              {/* Overview Section */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8 heading-text-1">Overview</h2>
                <p className="text-lg paragraph-text text-gray-400 leading-relaxed">
                  Epidemic Sound is a web platform that offers royalty-free music tailored for content creators, filmmakers, and brands.
                  They tasked us with designing a brand-new digital experience that would make discovering and licensing music feel effortless, inspiring, and aligned with the needs of a fast-growing creative community.
                  The goal was to create a platform from the ground up that not only showcases Epidemic Sound’s vast music library but also makes it easy for users—particularly creators aged 22–35—to search, preview, and license tracks with confidence.
                  We focused on crafting a clean, intuitive interface that supports creative workflows and reduces friction in the music discovery process.
                </p>
              </motion.section>

              {/* Research & Discovery */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold heading-text-1 mb-8">Research & Discovery</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold heading-text-1 mb-3 text-gray-300">Kickoff Goal:</h3>
                    <p className="text-lg text-gray-400 paragraph-text leading-relaxed">
                      Understand the needs and behaviors of modern content creators to design a seamless,
                      inspiring web experience for discovering and licensing music—while ensuring it scales with a diverse and growing user base.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Methods Used */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative h-[300px] rounded-2xl overflow-hidden mb-8">
                  <img
                    src={workspace}
                    alt="Research workspace"
                    className="object-cover" />
                </div>
                <h3 className="text-2xl font-semibold mb-6 heading-text-1 text-gray-300">Methods Used:</h3>
                <ul className="space-y-4 text-lg paragraph-text text-gray-400">
                  <li>
                    • Contextual inquiry (observed how creators searched for music while editing videos or working in their usual creative environments)
                  </li>
                  <li>
                    • Semi-structured user interviews (8 participants, aged 22–35, including YouTubers, podcasters, and social media managers)
                  </li>
                  <li>
                    • Analysis of user behavior data (explored search patterns, track previews, and licensing funnels from sample analytics)
                  </li>
                  <li>
                    • Competitive benchmarking (studied platforms like Artlist and Soundstripe to identify usability gaps and best practices)
                  </li>

                </ul>

                <h3 className="text-2xl font-semibold heading-text-1 mb-6 mt-12 text-gray-300">Key Findings:</h3>
                <ul className="space-y-4 text-lg paragraph-text text-gray-400">
                  <li>
                    • <strong>Too much choice, too little guidance:</strong> Creators often felt lost browsing the music library, citing a lack of clear direction when trying to find tracks that fit their content.
                  </li>
                  <li>
                    • <strong>Previewing felt clunky:</strong> Users found it difficult to quickly listen through multiple tracks while working, which interrupted their creative momentum.
                  </li>
                  <li>
                    • <strong>Confusing content structure:</strong> The way music was categorized—by genre, mood, and use-case—left users unsure of where to begin or how to explore effectively.
                  </li>
                  <li>
                    • <strong>Licensing wasn’t clear enough:</strong> New users were unsure what kind of license they were getting and whether it covered platforms they use, like YouTube or TikTok.
                  </li>
                  <li>
                    • <strong>Poor organization tools:</strong> Users wanted an easy way to save, tag, and revisit tracks later, but the system didn’t support this level of flexibility in their workflow.
                  </li>

                </ul>
              </motion.section>

              {/* Problem & Solution */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative h-[200px] rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-gray-800 to-gray-600"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-4xl font-bold heading-text-1 mb-8">Problem</h2>
                    <p className="text-lg text-gray-400 paragraph-text leading-relaxed">
                      Many creators visiting the platform struggled to find the right track without feeling overwhelmed. The lack of smart filtering, unclear licensing information, and a disjointed browsing experience often led to frustration and drop-offs.
                      First-time users, in particular, found it difficult to navigate the music library or understand how to confidently license a track for their content.
                      Epidemic Sound needed a streamlined interface that supported creativity without compromising control or clarity.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-4xl heading-text-1 font-bold mb-8">Solution</h2>
                    <p className="text-lg text-gray-400 paragraph-text leading-relaxed mb-6">
                      We started by engaging with creators through user interviews and contextual observations to understand their end-to-end workflow. Based on our findings, we designed the platform to feel intuitive, supportive, and creator-first:
                    </p>
                    <ul className="space-y-3 paragraph-text text-gray-400">
                      <li>• Curated search experience with guided filters based on content type (e.g., vlog, commercial, podcast)</li>
                      <li>• Seamless in-page track preview and queuing system for quick listening without breaking flow</li>
                      <li>• Clear, upfront licensing labels and usage summaries for major platforms like YouTube and Instagram</li>
                      <li>• Personalized collections and "Save for Later" options to help users organize tracks by project or mood</li>
                      <li>• Simplified navigation structure combining genre, mood, and use-case into one discoverable hierarchy</li>
                    </ul>

                  </div>
                </div>
              </motion.section>

              {/* Phone Mockup */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="relative md:h-[600px] md:w-[600px]">
                  <img
                    src={cardimage2}
                    alt="RentEase Mobile App Mockup"
                    className="object-contain"
                  />
                </div>
              </motion.section>

              {/* UX Approach */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold heading-text-1 mb-8">UX Approach</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 heading-text-1 text-gray-300">Problem Framing:</h3>
                    <p className="text-lg text-gray-400 paragraph-text leading-relaxed">
                      The core challenge wasn’t visual design—it was creative momentum. Content creators didn’t just need a beautiful interface;
                      they needed a system that respected their time, supported their flow, and removed friction from the discovery process.
                      Our UX strategy prioritized clarity, intuitive structure, and micro-interactions that built confidence—from finding the right track to licensing it without second-guessing.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 heading-text-1 text-gray-300">Personas Created:</h3>
                    <ul className="space-y-2 paragraph-text text-gray-400">
                      <li>
                        • <em>Alex Rivera, 28,</em> a YouTube content creator focused on travel vlogs. Needs fast access to royalty-free music that matches varied moods.
                      </li>
                      <li>
                        • <em>Jasmine Lee, 24,</em> a podcast producer who requires clear licensing info and an easy way to organize favorite tracks for multiple projects.
                      </li>

                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Ideation & Wireframing */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl heading-text-1 font-bold mb-8">Ideation & Wireframing</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 heading-text-1 text-gray-300">Design Goals:</h3>
                    <ol className="space-y-2 text-gray-400 paragraph-text list-decimal list-inside">
                      <li>Simplify music discovery by highlighting key filters tailored to creators’ needs</li>
                      <li>Enhance usability with intuitive navigation and seamless track previewing</li>
                      <li>Foster user confidence through clear licensing info and real-time interaction feedback</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 heading-text-1 text-gray-300">Key UX Changes:</h3>
                    <ul className="space-y-3 paragraph-text text-gray-400">
                      <li>
                        <strong>Unified Discovery:</strong> Combined browsing and searching into a single, streamlined homepage to simplify exploration.
                      </li>
                      <li>
                        <strong>Enhanced Filtering:</strong> Introduced context-aware filters designed specifically for creators’ content types and moods.
                      </li>
                      <li>
                        <strong>Instant Preview:</strong> Enabled seamless in-app track playback with queueing for uninterrupted listening sessions.
                      </li>
                      <li>
                        <strong>Organizational Tools:</strong> Implemented "Save for Later" and personalized playlists to help users manage their favorite tracks.
                      </li>
                      <li>
                        <strong>Clear Licensing Info:</strong> Displayed easy-to-understand license summaries and platform compatibility badges upfront.
                      </li>

                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 heading-text-1 text-gray-300">Tools Used:</h3>
                    <ul className="space-y-2 paragraph-text text-gray-400">
                      <li>• Wireframes and low-fidelity mockups in Figma</li>
                      <li>• Interactive prototypes tested with Maze</li>
                      <li>• Accessibility tested with Stark Plugin</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Testing & Iteration */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl heading-text-1 font-bold mb-8">Testing & Iteration</h2>
                <p className="text-lg text-gray-400 paragraph-text leading-relaxed mb-8">
                  We conducted two rounds of usability testing with 6 young professionals in round one, and 5 in round
                  two. Key observations and fixes:
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 mb-2">
                      <strong>Issue:</strong> Several users tried to restart their music search by repeatedly refreshing the page, losing their saved tracks.
                    </p>
                    <p className="text-gray-400">
                      <strong>→ Fix:</strong> Introduced persistent "Save for Later" functionality with clear visual cues, allowing users to retain and access favorites across sessions.
                    </p>

                  </div>

                  <div>
                    <p className="text-gray-400 mb-2">
                      <strong>Issue:</strong> Users hesitated at the application screen, unsure if it was final
                    </p>
                    <p className="text-gray-400">
                      <strong>→ Fix:</strong> Included a step label: <em>Step 3 of 3: Review & Submit</em>.
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6 text-gray-300">Post-test metrics:</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      • Task success rate improved from <strong>42% → 89%</strong>
                    </li>
                    <li>
                      • Time to complete search dropped by <strong>38%</strong>
                    </li>
                    <li>
                      • Satisfaction score averaged <strong>4.7/5</strong> from previously frustrated users
                    </li>
                  </ul>
                </div>
              </motion.section>

              {/* Outcome */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl heading-text-1 font-bold mb-8">Outcome</h2>
                <ul className="space-y-3 text-lg paragraph-text text-gray-400">
                  <li>
                    • Track discovery success rate among creators aged 22-35 increased by <strong>40%</strong>
                  </li>
                  <li>
                    • Support requests related to licensing and navigation dropped by <strong>55%</strong>
                  </li>
                  <li>
                    • Epidemic Sound received positive feedback from content creator communities and social platforms
                  </li>
                  <li>
                    • The client plans to roll out personalized playlist features and enhanced search filters based on user insights
                  </li>
                </ul>

              </motion.section>

              {/* More Projects */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pt-16 pb-10"
              >
                <h2 className="text-6xl font-bold heading-text-1 text-center mb-16">More Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Link to="/rentease">
                    <div className="rounded-2xl overflow-hidden bg-white transition-colors duration-300 cursor-pointer">
                      <img
                        src={cardimage1}
                        alt="Project Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </Link>
                  <Link to="/over-wallet">
                    <div className="rounded-2xl overflow-hidden bg-white transition-colors duration-300 cursor-pointer">
                      <img
                        src={cardimage3}
                        alt="Project Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </Link>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Industry</h3>
                  <p className="text-lg heading-text-1 font-medium">Music Licensing / Creative Tech</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Duration</h3>
                  <p className="text-lg paragraph-text font-medium">4 months</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Year</h3>
                  <p className="text-lg paragraph-text font-medium">2024</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Role</h3>
                  <p className="text-lg paragraph-text font-medium">UX Researcher & Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}