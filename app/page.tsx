"use client"

import { useState, useEffect } from "react"
import { Menu, X, Github, Instagram, Linkedin, Calendar, MapPin, Users, Code, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Typewriter } from "react-simple-typewriter"
import LoadingScreen from "@/components/loading-screen" // Import the new component

export default function CodersClubWebsite() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [showLine2, setShowLine2] = useState(false)
  const [showLine3, setShowLine3] = useState(false)
  const [showLine4, setShowLine4] = useState(false)
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false)

  // New loading states
  const [isLoading, setIsLoading] = useState(true)
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    // Minimum display time for the loading screen
    const timer = setTimeout(() => {
      setMinLoadTimePassed(true)
    }, 3000) // 3 seconds minimum display

    // Check if all assets are loaded
    const handleLoad = () => {
      setAssetsLoaded(true)
    }

    // If document is already complete (e.g., fast refresh or cached), set assetsLoaded immediately
    if (document.readyState === "complete") {
      setAssetsLoaded(true)
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  useEffect(() => {
    if (minLoadTimePassed && assetsLoaded) {
      setIsLoading(false)
    }
  }, [minLoadTimePassed, assetsLoaded])

  useEffect(() => {
    // Only start terminal animations if not loading
    if (!isLoading) {
      const timers = [
        setTimeout(() => setShowLine2(true), 1000),
        setTimeout(() => setShowLine3(true), 2000),
        setTimeout(() => setShowLine4(true), 3000),
      ]

      return () => timers.forEach(clearTimeout)
    }
  }, [isLoading]) // Depend on isLoading to start effects when loading finishes

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "events", "projects", "team", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={`min-h-screen font-mono ${darkMode ? "dark" : ""} ${isLoading ? "hidden" : ""}`}>
        <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
          {/* Floating Programming Logos */}
          <FloatingLogos />

          {/* Sticky Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b-8 border-black">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-4">
                  <span className="font-pixelify font-black text-2xl tracking-tighter text-white ml-4">
                    CODERS CLUB
                  </span>
                </div>

                {/* Desktop Navigation */}
                <div className="font-pixelify hidden md:flex items-center gap-6">
                  {["hero", "about", "events", "projects", "team", "contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`font-bold text-sm uppercase transition-colors ${
                        activeSection === section ? "text-yellow-500" : "text-white hover:text-yellow-500"
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`h-12 w-12 border-4 border-black flex items-center justify-center transition-all duration-200 ${
                      darkMode
                        ? "bg-orange-400 hover:bg-orange-300 shadow-lg"
                        : "bg-slate-800 hover:bg-slate-700 shadow-lg"
                    }`}
                  >
                    <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`h-10 w-10 border-4 border-black flex items-center justify-center transition-all duration-200 ${
                      darkMode
                        ? "bg-orange-400 hover:bg-orange-300 shadow-lg"
                        : "bg-slate-800 hover:bg-slate-700 shadow-lg"
                    }`}
                  >
                    <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="h-10 w-10 bg-white dark:bg-black text-black dark:text-white border-4 border-black  flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="font-pixelify md:hidden bg-white text-black dark:bg-black dark:text-white border-t-4 border-black dark:border-white">
                  <div className="py-4 space-y-2">
                    {["hero", "about", "events", "projects", "team", "contact"].map((section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className="block w-full text-left px-4 py-2 font-bold text-md uppercase hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"
                      >
                        {section}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Hero Section */}
          <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative z-10">
            <div className="container mx-auto px-4 text-center">
              <div className="space-y-8">
                {/* Club Logo */}

                {/* Animated Heading */}
                <div className="space-y-4 font-pixelify">
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
                    <span className="text-red-600">CODE</span>
                    <span className="text-blue-600">RS</span>
                    <span className="text-yellow-500"> CLUB</span>
                  </h1>
                  <p className="text-lg md:text-xl font-bold uppercase tracking-wide">
                    Where <span className="text-red-600">Passion</span> Meets{" "}
                    <span className="text-blue-600">Programming</span>
                  </p>
                </div>

                {/* Interactive Code Terminal - Made Transparent */}
                <div className="flex justify-center">
                  <div className="bg-black/80 backdrop-blur-sm border-8 border-black shadow-brutal p-8 max-w-2xl w-full">
                    <div className="relative mb-4 h-5">
                      {/* Left-aligned buttons */}
                      <div className="absolute inset-0 flex items-center justify-start gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      </div>

                      {/* Centered label */}
                      <div className="absolute inset-0 flex justify-center items-center">
                        <span className="text-white font-mono text-sm">SCET@CodersClub: ~</span>
                      </div>
                    </div>

                    <div className="text-green-400 font-mono text-left space-y-2">
                      {/* Line 1 */}
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        <span className="text-green-400">$</span>
                        <span>
                          <Typewriter
                            words={["welcome_to_coders_club_Sahrdaya"]}
                            typeSpeed={30}
                            cursor
                            cursorStyle="_"
                            loop={1}
                          />
                        </span>
                      </div>

                      {/* Line 2 */}
                      {showLine2 && (
                        <div className="text-white">
                          <span className="text-blue-400">Initializing</span>{" "}
                          <Typewriter words={["awesome community..."]} typeSpeed={30} cursor cursorStyle="_" loop={1} />
                        </div>
                      )}

                      {/* Line 3 */}
                      {showLine3 && (
                        <div className="text-white">
                          <span className="text-yellow-400">Loading</span>{" "}
                          <Typewriter
                            words={["passionate developers..."]}
                            typeSpeed={30}
                            cursor
                            cursorStyle="_"
                            loop={1}
                          />
                        </div>
                      )}

                      {/* Line 4 */}
                      {showLine4 && (
                        <div className="text-white">
                          <span className="text-green-400">Success!</span>{" "}
                          <Typewriter
                            words={["Ready to code together 🚀"]}
                            typeSpeed={30}
                            cursor
                            cursorStyle="_"
                            loop={1}
                          />
                        </div>
                      )}

                      {/* Final Prompt */}
                      {showLine4 && (
                        <div className="flex items-center gap-2 animate-pulse pt-2">
                          <span className="text-green-400">$</span>
                          <span className="bg-green-400 w-2 h-5 animate-pulse"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Interactive Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4 sm:gap-6">
                  <Button
                    onClick={() => scrollToSection("about")}
                    className="w-full sm:w-auto bg-red-600 text-white border-4 border-black px-6 py-3 sm:px-8 sm:py-4 font-bold text-lg sm:text-xl shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-red-700 hover:scale-105 transition-all duration-200 transform active:scale-95 group"
                  >
                    <span className="font-pixelify group-hover:animate-pulse">JOIN US</span>
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => scrollToSection("events")}
                    className="w-full sm:w-auto bg-yellow-500 text-black border-4 border-black px-6 py-3 sm:px-8 sm:py-4 font-bold text-lg sm:text-xl shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-yellow-400 hover:scale-105 transition-all duration-200 transform active:scale-95 group"
                  >
                    <span className="font-pixelify group-hover:animate-pulse">EVENTS</span>
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 md:py-20 relative z-10">
            <div className="container mx-auto px-4">
              <div className="font-pixelify text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8 border-b-8 border-black pb-4 inline-block">
                  ABOUT US
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="font-pixelify bg-red-600 text-white border-8 border-black p-6 sm:p-8 shadow-brutal">
                  <h3 className="text-lg font-black mb-4 sm:mb-6 uppercase border-b-4 border-white pb-2">
                    OUR MISSION
                  </h3>
                  <p className="text-sm font-mono leading-relaxed">
                    To create a vibrant community of passionate programmers, fostering collaboration, learning, and
                    innovation in the world of technology.
                  </p>
                </div>

                <div className="font-pixelify bg-blue-600 text-white border-8 border-black p-6 sm:p-8 shadow-brutal">
                  <h3 className="text-lg font-black mb-4 sm:mb-6 uppercase border-b-4 border-white pb-2">WHAT WE DO</h3>
                  <ul className="text-sm font-mono space-y-2">
                    <li>• Regular coding sessions</li>
                    <li>• Hackathons & competitions</li>
                    <li>• Tech talks & workshops</li>
                    <li>• Open source projects</li>
                    <li>• Career guidance</li>
                  </ul>
                </div>

                <div className="font-pixelify bg-yellow-500 border-8 border-black p-6 sm:p-8 shadow-brutal sm:col-span-2 lg:col-span-1">
                  <h3 className="text-lg font-black mb-4 sm:mb-6 uppercase border-b-4 border-black pb-2">JOIN US</h3>
                  <p className="text-sm font-mono leading-relaxed mb-6">
                    Whether you're a beginner or expert, all skill levels welcome! Let's build the future together.
                  </p>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdi8jtYdyy8WLw49GmFm8e7j1L9GZcwWZk6P7iEIm7EYDCqfg/viewform?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full sm:w-auto bg-black text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                      BECOME A MEMBER
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section id="events" className="py-16 md:py-20 bg-black/90 backdrop-blur-sm text-white relative z-10">
            <div className="container mx-auto px-4">
              <div className="font-pixelify text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8 border-b-8 border-white pb-4 inline-block">
                  UPCOMING EVENTS
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Event 1 - Robotics & AI Workshop */}
                <div className="bg-red-600 text-white border-8 border-black shadow-brutal flex flex-col">
                  <div className="h-48 bg-black border-b-8 border-black flex items-center justify-center overflow-hidden">
                    <Image
                      src="/iot.jpg"
                      alt="IoT Event"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="font-pixelify p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-4 sm:mb-6 uppercase border-b-4 border-white pb-2">
                      AI Workshop
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-mono text-sm">August 7th, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span className="font-mono text-sm">EC Lab, Bio Block</span>
                    </div>
                    <p className="font-mono text-sm leading-relaxed mb-6 flex-grow">
                      Build a hardware AI assistant using the ESP32 and Gemini API in a hands-on project with the
                      Hardware Club.
                    </p>
                    <Button className="w-full bg-white text-red-600 border-4 border-black px-3 py-2 sm:px-4 sm:py-3 font-bold text-xs sm:text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all mt-auto">
                      <span className="text-center leading-tight">REGISTRATION OPENS SOON!</span>
                    </Button>
                  </div>
                </div>

                {/* Event 2 - Rust Workshop */}
                <div className="bg-blue-600 text-white border-8 border-black shadow-brutal flex flex-col">
                  <div className="h-48 bg-black border-b-8 border-black flex items-center justify-center overflow-hidden">
                    <Image
                      src="/rust.png"
                      alt="Rust Workshop"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="font-pixelify p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-4 sm:mb-6 uppercase border-b-4 border-white pb-2">
                      RUST WORKSHOP
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-mono text-sm">Sep 17, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span className="font-mono text-sm">Computer Center</span>
                    </div>
                    <p className="font-mono text-sm leading-relaxed mb-6 flex-grow">
                      Explore systems programming with Rust, from core concepts to advanced techniques, with an emphasis
                      on safe coding.
                    </p>
                    <Button className="w-full bg-white text-blue-600 border-4 border-black px-3 py-2 sm:px-4 sm:py-3 font-bold text-xs sm:text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all mt-auto">
                      <span className="text-center leading-tight">REGISTRATION OPENS SOON!</span>
                    </Button>
                  </div>
                </div>

                {/* Event 3 - Capture The Flag */}
                <div className="bg-yellow-500 text-black border-8 border-black shadow-brutal sm:col-span-2 lg:col-span-1 flex flex-col">
                  <div className="h-48 bg-black border-b-8 border-black flex items-center justify-center overflow-hidden">
                    <Image
                      src="/ctf.png"
                      alt="Capture The Flag"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="font-pixelify p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-4 sm:mb-6 uppercase border-b-4 border-black pb-2">
                      CAPTURE THE FLAG
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-mono text-sm">Sep 19th, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span className="font-mono text-sm">Seminar Hall, Bio Block</span>
                    </div>
                    <p className="font-mono text-sm leading-relaxed mb-6 flex-grow">
                      Compete in a cybersecurity contest featuring challenges in cryptography, reversing, web
                      exploitation, and more.
                    </p>
                    <Button className="w-full bg-black text-yellow-500 border-4 border-black px-3 py-2 sm:px-4 sm:py-3 font-bold text-xs sm:text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all mt-auto">
                      <span className="text-center leading-tight">REGISTRATION OPENS SOON!</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Projects Section */}
          <section id="projects" className="py-16 md:py-20 relative z-10">
            <div className="container mx-auto px-4">
              <div className="font-pixelify text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8 border-b-8 border-black pb-4 inline-block">
                  OUR FEATURED PROJECTS
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {/* Project 1 - SafeSphere */}
                <div className="bg-white dark:bg-black  border-6 border-black shadow-brutal flex flex-col">
                  <div className="h-768px  border-b-6 border-black flex items-center justify-center overflow-hidden">
                    <img src="/amma.jpg" alt="Coders Club Logo" className="h-768px" />
                  </div>
                  <div className="font-pixelify p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-2 uppercase border-b-2 border-black pb-1">AMMA LANGUAGE</h3>
                    <p className="text-xs font-bold text-blue-600 mb-3 uppercase">BY AARON THOMAS</p>
                    <p className="font-mono text-xs leading-relaxed mb-4 flex-grow">
                      Amma is an educational programming language which can be written using Malayalam, designed
                      primarily as a learning tool for understanding programming.
                    </p>
                    <a
                      href="https://github.com/arxhr007/amma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-black text-white border-2 border-black px-2 py-2 font-bold text-xs shadow-brutal hover:translate-y-1 hover:shadow-none transition-all mt-auto w-full"
                    >
                      <Github className="h-3 w-3" />
                      <span className="text-center leading-tight">VIEW ON GITHUB</span>
                    </a>
                  </div>
                </div>

                <div className="bg-white dark:bg-black border-6 border-black shadow-brutal flex flex-col">
                  <div className="h-768px  border-b-6 border-black flex items-center justify-center overflow-hidden">
                    <img src="/bunk.png" alt="Coders Club Logo" className="h-768px" />
                  </div>
                  <div className="font-pixelify p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-2 uppercase border-b-2 border-black pb-1">
                      ET-LAB CALCULATOR
                    </h3>
                    <p className="text-xs font-bold text-purple-600 mb-3 uppercase">BY AARON THOMAS</p>
                    <p className="font-mono text-xs leading-relaxed mb-4 flex-grow">
                      Log in with your ET-lab credentials to instantly calculate how many classes you can safely bunk or
                      need to attend to maintain the required 75% attendance.
                    </p>
                    <a
                      href="https://github.com/codersclub-scet/ETlab-attendace-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-black text-white border-2 border-black px-2 py-2 font-bold text-xs shadow-brutal hover:translate-y-1 hover:shadow-none transition-all mt-auto w-full"
                    >
                      <Github className="h-3 w-3" />
                      <span className="text-center leading-tight">VIEW ON GITHUB</span>
                    </a>
                  </div>
                </div>

                <div className="bg-white dark:bg-black  border-6 border-black shadow-brutal flex flex-col">
                  <div className="h-768px bg-gradient-to-br from-red-400 to-orange-500 border-b-6 border-black flex items-center justify-center overflow-hidden">
                    <img src="/iedc.png" alt="Coders Club Logo" className="h-768px" />
                  </div>
                  <div className="font-pixelify p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-2 uppercase border-b-2 border-black pb-1">
                      OFFICIAL IEDC WEBSITE
                    </h3>
                    <p className="text-xs font-bold text-red-600 mb-3 uppercase">BY SHAYEN THOMAS</p>
                    <p className="font-mono text-xs leading-relaxed mb-4 flex-grow">
                      offical sahrdaya iedc website made with next js and firebase
                    </p>
                    <a
                      href="https://github.com/codersclub-scet/IEDC_Sahrdaya_website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-black text-white border-2 border-black px-2 py-2 font-bold text-xs shadow-brutal hover:translate-y-1 hover:shadow-none transition-all mt-auto w-full"
                    >
                      <Github className="h-3 w-3" />
                      <span className="text-center leading-tight">VIEW ON GITHUB</span>
                    </a>
                  </div>
                </div>

                {/* Project 4 - CodersHub */}
                <div className="bg-white dark:bg-black border-6 border-black shadow-brutal flex flex-col">
                  <div className="h-768px border-b-6 border-black flex items-center justify-center overflow-hidden">
                    <img src="/wall.png" alt="Coders Club Logo" className="h-768px" />
                  </div>
                  <div className="font-pixelify p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-2 uppercase border-b-2 border-black pb-1">
                      USEFULL WALLPAPER
                    </h3>
                    <p className="text-xs font-bold text-green-600 mb-3 uppercase">BY ABHAY MV</p>
                    <p className="font-mono text-xs leading-relaxed mb-4 flex-grow">
                      This script creates a dynamic desktop background that updates with real-time keyboard input.
                    </p>
                    <a
                      href="https://github.com/codersclub-scet/useful-background-wallpaper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-black text-white border-2 border-black px-2 py-2 font-bold text-xs shadow-brutal hover:translate-y-1 hover:shadow-none transition-all mt-auto w-full"
                    >
                      <Github className="h-3 w-3" />
                      <span className="text-center leading-tight">VIEW ON GITHUB</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* View All Projects Button */}
<div className="text-center mt-12 px-4">
  <a
    href="https://github.com/codersclub-scet"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="flex justify-center">
      <Button className="bg-blue-600 text-white border-4 border-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-bold shadow-brutal flex items-center justify-center gap-2 hover:translate-y-1 hover:shadow-none hover:bg-blue-700 transition-all w-full sm:w-auto">
        <Github className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-xs sm:text-base">VIEW OUR OTHER PROJECTS ON GITHUB</span>
      </Button>
    </div>
  </a>
</div>



              {/* Call to Action for Project Submissions - Expandable */}
              <div className="mt-16 md:mt-20">
                <div className="bg-yellow-500 border-8 border-black p-6 md:p-8 shadow-brutal max-w-5xl mx-auto">
                  <div className="text-center">
                    <h3 className="font-pixelify text-sm md:text-base lg:text-lg font-black mb-4 uppercase">
                      WANNA ADD YOUR PROJECTS?
                    </h3>
                    <p className="font-pixelify text-[11px] md:text-sm lg:text-base leading-snug mb-6">
                      Got an amazing project you want to showcase? Click below to learn more about our submission
                      process!
                    </p>

                    {/* Expandable Button */}
                    <button
                      onClick={() => setProjectDetailsOpen(!projectDetailsOpen)}
                      className="inline-flex items-center gap-2 bg-red-600 text-white border-4 border-black px-6 py-3 font-pixelify text-sm shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-red-700 transition-all duration-200 mb-6"
                    >
                      <span>LEARN MORE</span>
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${projectDetailsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        projectDetailsOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="bg-black text-white p-4 border-4 border-black mb-6 text-left">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="text-center mb-4">
                            <h4 className="font-pixelify text-[10px] font-black mb-2 text-yellow-400">
                              🎓 OPEN TO ALL COLLEGE COMMUNITY MEMBERS!
                            </h4>
                            <p className="font-pixelify text-[10px] leading-snug">
                              Are you working on something cool and want it featured under the official Coders Club
                              GitHub org? Anyone from our college can submit!
                            </p>
                          </div>

                          {/* Description */}
                          <div className="bg-gray-900 p-4 border-2 border-gray-700 rounded">
                            <p className="font-pixelify text-[10px] leading-snug mb-2">
                              Submit your project details below — we'll review it and add it to our GitHub org if it
                              aligns with our goals.
                            </p>
                          </div>

                          {/* How it works */}
                          <div>
                            <h5 className="font-pixelify text-[10px] font-black mb-3 text-green-400 border-b border-green-400 pb-1 inline-block">
                              🚀 HERE'S HOW IT WORKS:
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                {[...Array(3)].map((_, i) => (
                                  <div className="flex items-start gap-2" key={i}>
                                    <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-[8px] flex-shrink-0 mt-1">
                                      {i + 1}
                                    </div>
                                    <p className="font-pixelify text-[10px]">
                                      {
                                        [
                                          "Submit your project through our form",
                                          "We'll review and add it to our GitHub organization",
                                          "🌟 Top projects will be featured on our Coders Club website",
                                        ][i]
                                      }
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="space-y-2">
                                {[...Array(3)].map((_, i) => (
                                  <div className="flex items-start gap-2" key={i}>
                                    <div
                                      className={`rounded-full w-5 h-5 flex items-center justify-center font-bold text-[8px] flex-shrink-0 mt-1 ${i === 2 ? "bg-green-600" : "bg-blue-600"} text-white`}
                                    >
                                      {i === 2 ? "🎫" : i + 4}
                                    </div>
                                    <p
                                      className={`font-pixelify text-[10px] ${i === 2 ? "font-bold text-green-400" : ""}`}
                                    >
                                      {
                                        [
                                          "🏆 You and your teammates will receive full credit",
                                          "📲 We'll contact you via WhatsApp",
                                          "Bonus: Valid submissions get official Coders Club membership!",
                                        ][i]
                                      }
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Benefits Section */}
                          <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 border-2 border-purple-500 rounded">
                            <h5 className="font-pixelify text-[10px] font-black mb-2 text-purple-300">
                              ✨ WHAT YOU GET:
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                              {[
                                "GitHub organization membership",
                                "Website feature opportunity",
                                "Full project credit",
                                "Community collaboration",
                                "Official club membership",
                                "WhatsApp updates",
                              ].map((item, idx) => (
                                <div className="flex items-center gap-2" key={idx}>
                                  <span className="text-green-400">✅</span>
                                  <span className="font-pixelify text-[10px]">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="text-center">
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSdi8jtYdyy8WLw49GmFm8e7j1L9GZcwWZk6P7iEIm7EYDCqfg/viewform?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <button className="bg-green-600 text-white border-4 border-black px-4 py-2 font-pixelify text-[10px] shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-green-700 transition-all duration-200 group">
                            <span className="group-hover:animate-pulse">🚀 SUBMIT YOUR PROJECT</span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="py-16 md:py-20 bg-black/90 backdrop-blur-sm text-white relative z-10">
            <div className="container mx-auto px-4">
              <div className="font-pixelify text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8 border-b-8 border-white pb-4 inline-block">
                  OUR TEAM
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-white/95 backdrop-blur-sm text-black border-8 border-white p-6 sm:p-8 shadow-brutal-white">
                  <div className="font-pixelify text-center">
                    <div className="h-28 w-28 sm:h-32 sm:w-32 bg-red-600 border-8 border-black mx-auto mb-6 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/aaron.jpg"
                        alt="Aaron Thomas"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-black mb-2 uppercase">AARON THOMAS</h3>
                    <p className="text-sm font-bold text-red-600 mb-4 uppercase">CLUB LEAD</p>
                    <p className="text-sm sm:text-md font-mono leading-relaxed mb-6">
                      Full-stack developer and cybersecurity enthusiast with a focus on malware analysis and reverse
                      engineering.
                    </p>
                    <div className="flex justify-center gap-4">
                      <a
                        href="https://github.com/arxhr007"
                        className="h-10 w-10 bg-black border-4 border-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                      >
                        <Github className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/aaron-thomas-parakkal"
                        className="h-10 w-10 bg-blue-600 border-4 border-black flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="https://www.instagram.com/_arxhr007_"
                        className="h-10 w-10 bg-fuchsia-500 border-4 border-black flex items-center justify-center hover:bg-fuchsia-600 transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm text-black border-8 border-white p-6 sm:p-8 shadow-brutal-white">
                  <div className="font-pixelify text-center">
                    <div className="h-28 w-28 sm:h-32 sm:w-32 bg-blue-600 border-8 border-black mx-auto mb-6 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/alexo.jpg"
                        alt="Alexo Mathew"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-black mb-2 uppercase">ALEXO MATHEW</h3>
                    <p className="text-sm font-bold text-blue-600 mb-4 uppercase">CO-LEAD</p>
                    <p className="text-sm sm:text-md font-mono leading-relaxed mb-6">
                      Embedded systems developer with a focus on IoT and circuit design. Built SafeSphere, an
                      award-winning air quality monitor, and Bixa, an AI voice assistant.
                    </p>

                    <div className="flex justify-center gap-4">
                      <a
                        href="https://github.com/alexo-007"
                        className="h-10 w-10 bg-black border-4 border-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                      >
                        <Github className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/alexo-mathew-86393b33a"
                        className="h-10 w-10 bg-blue-600 border-4 border-black flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="https://www.instagram.com/al_exohh"
                        className="h-10 w-10 bg-fuchsia-500 border-4 border-black flex items-center justify-center hover:bg-fuchsia-600 transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section - Made Transparent */}
          <section
            id="contact"
            className="py-12 sm:py-16 lg:py-20 bg-black/90 backdrop-blur-sm text-white relative z-10"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="font-pixelify text-center mb-12 sm:mb-16">
                <h2 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase mb-6 sm:mb-8 border-b-4 sm:border-b-8 border-white pb-2 sm:pb-4 inline-block">
                  GET IN TOUCH
                </h2>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                  {/* Connect With Us Card */}
                  <div className="font-pixelify bg-white/95 backdrop-blur-sm text-black border-4 sm:border-8 border-white p-4 sm:p-6 lg:p-8 shadow-brutal-white">
                    <h3 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-black pb-2">
                      CONNECT WITH US
                    </h3>
                    <p className="text-xs sm:text-sm font-mono mb-6 sm:mb-8 leading-relaxed">
                      Join our community and stay updated with the latest events, projects, and opportunities.
                    </p>

                    <div className="space-y-4 sm:space-y-6">
                      {/* GitHub */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-black border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0">
                          <Github className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm sm:text-base">GitHub</p>
                          <a
                            href="https://github.com/codersclub-scet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs sm:text-sm text-gray-600 hover:text-black underline break-all"
                          >
                            @codersclub-scet
                          </a>
                        </div>
                      </div>

                      {/* Instagram */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-fuchsia-500 border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0">
                          <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm sm:text-base">Instagram</p>
                          <a
                            href="https://instagram.com/codersclub_iedcsahrdaya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs sm:text-sm text-gray-600 hover:text-fuchsia-700 underline break-all"
                          >
                            @codersclub_iedcsahrdaya
                          </a>
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-600 border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0">
                          <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm sm:text-base">LinkedIn</p>
                          <a
                            href="https://www.linkedin.com/in/iedc-sahrdaya-788970175/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs sm:text-sm text-gray-600 hover:text-blue-700 underline break-all"
                          >
                            @iedc-sahrdaya-788970175
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Join The Club Card */}
                  <div className="font-pixelify bg-red-600/95 backdrop-blur-sm text-white border-4 sm:border-8 border-white p-4 sm:p-6 lg:p-8 shadow-brutal-white">
                    <h3 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
                      JOIN THE CLUB
                    </h3>
                    <p className="text-xs sm:text-sm font-mono mb-6 sm:mb-8 leading-relaxed">
                      Ready to level up your coding skills? Fill out our membership form and become part of our amazing
                      community!
                    </p>

                    <div className="space-y-3 sm:space-y-4">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdi8jtYdyy8WLw49GmFm8e7j1L9GZcwWZk6P7iEIm7EYDCqfg/viewform?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full bg-white text-red-600 border-2 sm:border-4 border-black px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base lg:text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                          MEMBERSHIP FORM
                        </Button>
                      </a>
                      <Button
                        onClick={() => alert("Discord server will be coming soon 😅")}
                        className="w-full bg-yellow-500 text-black border-2 sm:border-4 border-black px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base lg:text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        DISCORD SERVER
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Footer */}
          <footer className="bg-white dark:bg-black border-t-8 border-black py-12 relative z-10 text-black dark:text-white">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-red-600 border-4 border-black rotate-12 flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-pixelify font-black text-2xl tracking-tighter">CODERS CLUB</span>
                  </div>
                  <p className="font-pixelify font-mono text-sm">Building the future, one line of code at a time.</p>
                </div>

                <div className="font-pixelify">
                  <h4 className="text-lg font-black mb-4 uppercase border-b-4 border-black pb-2 inline-block">
                    QUICK LINKS
                  </h4>
                  <ul className="space-y-2 font-mono">
                    <li>
                      <button onClick={() => scrollToSection("about")} className="hover:text-red-600 transition-colors">
                        About Us
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection("events")}
                        className="hover:text-blue-600 transition-colors"
                      >
                        Events
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection("projects")}
                        className="hover:text-yellow-600 transition-colors"
                      >
                        Projects
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection("team")}
                        className="hover:text-yellow-600 transition-colors"
                      >
                        Our Team
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection("contact")}
                        className="hover:text-red-600 transition-colors"
                      >
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="font-pixelify">
                  <h4 className="text-lg font-black mb-4 uppercase border-b-4 border-black pb-2 inline-block">
                    RESOURCES
                  </h4>
                  <ul className="space-y-2 font-mono">
                    <li>
                      <a href="#" className="hover:text-red-600 transition-colors">
                        Code of Conduct
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-blue-600 transition-colors">
                        Learning Resources
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-yellow-600 transition-colors">
                        Project Gallery
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-red-600 transition-colors">
                        Alumni Network
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="font-pixelify border-t-4 border-black mt-8 pt-8 text-center space-y-2">
                <p className="font-mono text-sm">© 2025 Sahrdaya Coders Club. All rights reserved.</p>
                <p className="font-mono text-sm flex justify-center items-center gap-1 flex-wrap">
                  Made with
                  <img
                    src="https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png"
                    alt="Pixel Heart"
                    className="h-4 w-4 inline-block mx-1"
                  />
                  and lots of
                  <img
                    src="https://img.icons8.com/?size=100&id=nqNswcSf636a&format=png&color=000000"
                    alt="Pixel Coffee"
                    className="h-5 w-5 inline-block mx-1"
                  />
                  by
                  <a
                    href="https://www.linkedin.com/in/aaron-thomas-parakkal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-500 ml-1"
                  >
                    Aaron Thomas
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

// Enhanced Floating Programming Logos Component with More Opacity
function FloatingLogos() {
  const [currentLogos, setCurrentLogos] = useState<
    Array<{
      name: string
      src: string
      size: string
      id: string
      animation: string
      left: number
      top: number
      animationDelay: number
      animationDuration: number
    }>
  >([])

  const allLogos = [
    { name: "Rust", src: "/logos/rust.png", size: "h-12 w-12" },
    { name: "Go", src: "/logos/go.png", size: "h-10 w-16" },
    { name: "Python", src: "/logos/python.png", size: "h-12 w-12" },
    { name: "JavaScript", src: "/logos/javascript.png", size: "h-12 w-12" },
    { name: "React", src: "/logos/react.png", size: "h-12 w-12" },
    { name: "Docker", src: "/logos/docker.png", size: "h-12 w-10" },
    { name: "Linux", src: "/logos/linux.png", size: "h-12 w-10" },
    { name: "Git", src: "/logos/git.png", size: "h-12 w-12" },
    { name: "Node.js", src: "/logos/nodejs.png", size: "h-12 w-12" },
    { name: "TypeScript", src: "/logos/typescript.png", size: "h-12 w-12" },
    { name: "Vue", src: "/logos/vue.png", size: "h-12 w-12" },
    { name: "Angular", src: "/logos/angular.png", size: "h-12 w-12" },
    { name: "Svelte", src: "/logos/svelte.png", size: "h-12 w-12" },
    { name: "c", src: "/logos/c.png", size: "h-12 w-12" },
    { name: "Tailwind", src: "/logos/tailwind.png", size: "h-12 w-12" },
    { name: "Java", src: "/logos/java.png", size: "h-12 w-12" },
    { name: "PostgreSQL", src: "/logos/postgresql.png", size: "h-12 w-12" },
    { name: "Redis", src: "/logos/redis.png", size: "h-12 w-12" },
    { name: "Kubernetes", src: "/logos/kubernetes.png", size: "h-12 w-12" },
    { name: "AWS", src: "/logos/aws.png", size: "h-12 w-12" },
  ]

  const animations = ["animate-random-flow", "animate-random-pop", "animate-chaotic-spiral"]

  useEffect(() => {
    const spawnLogo = () => {
      const randomLogo = allLogos[Math.floor(Math.random() * allLogos.length)]
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
      const id = `${randomLogo.name}-${Date.now()}-${Math.random()}`

      const newLogo = {
        ...randomLogo,
        id,
        animation: randomAnimation,
        left: Math.random() * 90,
        top: Math.random() * 80 + 10,
        animationDelay: Math.random() * 5,
        animationDuration: 15 + Math.random() * 15, // 15-30 seconds
      }

      setCurrentLogos((prev) => [...prev, newLogo])

      // Remove logo after animation completes
      setTimeout(
        () => {
          setCurrentLogos((prev) => prev.filter((logo) => logo.id !== id))
        },
        (newLogo.animationDuration + newLogo.animationDelay) * 1000,
      )
    }

    // Initial spawn
    for (let i = 0; i < 8; i++) {
      setTimeout(spawnLogo, i * 2000)
    }

    // Continuous spawning
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        // 70% chance to spawn
        spawnLogo()
      }
    }, 3000) // Every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {currentLogos.map((logo) => (
        <div
          key={logo.id}
          className={`absolute ${logo.animation}`}
          style={{
            left: `${logo.left}%`,
            top: `${logo.top}%`,
            animationDelay: `${logo.animationDelay}s`,
            animationDuration: `${logo.animationDuration}s`,
          }}
        >
          <Image
            src={logo.src || "/placeholder.svg"}
            alt={logo.name}
            width={48}
            height={48}
            className={`${logo.size} object-contain filter drop-shadow-lg opacity-80`}
          />
        </div>
      ))}
    </div>
  )
}
