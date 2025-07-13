"use client"

import { useEffect, useState } from "react"
import { Code } from "lucide-react"
import { motion } from "framer-motion"

const codingFacts = [
  "Did you know: The first computer programmer was Ada Lovelace, in the mid-1800s.",
  "Did you know: The 'bug' in computer science originated from a moth found in a Harvard Mark II computer.",
  "Did you know: Python was named after the British comedy group Monty Python.",
  "Did you know: The first ever website was launched in 1991 by Tim Berners-Lee.",
  "Did you know: JavaScript was created in just 10 days.",
  "Did you know: The term 'pixel' is a portmanteau of 'picture element'.",
  "Did you know: The first domain name ever registered was symbolics.com.",
  "Did you know: HTML was originally designed to define the structure of documents, not their appearance.",
  "Did you know: The 'Hello, World!' program dates back to 1972.",
  "Did you know: The average programmer writes 10–12 lines of code per day.",
]

export default function LoadingScreen() {
  const [randomFact, setRandomFact] = useState<string | null>(null)

  useEffect(() => {
    const random = codingFacts[Math.floor(Math.random() * codingFacts.length)]
    setRandomFact(random)
  }, [])

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white text-black font-mono px-4">
      {/* Bouncing dots animation */}
      <div className="flex items-center justify-center mb-8 space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 bg-black rounded-full"
            animate={{ y: ["0%", "-60%", "0%"] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* LOADING text */}
      <h1 className="font-pixelify text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 animate-fadeInUp">
        <span className="text-red-600">LOADING</span>
        <span className="text-blue-600">...</span>
      </h1>

      {/* Fact + tagline */}
      <div className="text-center max-w-md">
        <p className="text-xs md:text-sm text-gray-800 mb-3">
          {randomFact || "Loading a cool fact..."}
        </p>
        <p className="text-xs text-gray-600">
          <Code className="inline-block h-3 w-3 mr-1" />
          Preparing the digital playground...
        </p>
      </div>
    </div>
  )
}
