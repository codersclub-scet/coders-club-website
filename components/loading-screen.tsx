"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Code } from "lucide-react"

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
  "Did you know: The average programmer writes 10-12 lines of code per day.",
]

export default function LoadingScreen() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % codingFacts.length)
    }, 5000) // Change fact every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white text-black font-mono">
      <div className="relative w-48 h-48 mb-8">
        {/* Central rotating square */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-red-600 border-8 border-black animate-spin origin-center"></div>
        </div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full border-8 border-black animate-pulse"></div>
        </div>
        {/* Small yellow square in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-yellow-500 border-4 border-black animate-pulse"></div>
        </div>

      </div>

      <h1 className="font-pixelify text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 animate-fadeInUp">
        <span className="text-red-600">LOADING</span>
        <span className="text-blue-600">...</span>
      </h1>

      <div className="text-center max-w-md px-4">
        <p className="text-sm md:text-base text-gray-800 mb-4">{codingFacts[currentFactIndex]}</p>
        <p className="text-xs text-gray-600">
          <Code className="inline-block h-3 w-3 mr-1" />
          Preparing the digital playground...
        </p>
      </div>
    </div>
  )
}
