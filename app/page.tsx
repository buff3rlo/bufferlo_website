"use client"

import { useState } from "react"
import Confetti from "./components/confetti"

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <main className="flex min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="grid-background"></div>
      </div>

      {/* Continuous confetti effect */}
      <Confetti active={true} />

      {/* Main content - truly centered */}
      <div className="z-10 flex flex-col items-center justify-center w-full h-full absolute inset-0 m-auto">
        <h1
          className="bufferlo-text text-6xl sm:text-8xl mb-8 text-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          bufferlo
        </h1>
        <p className="text-gray-400 text-center max-w-md mb-8 px-4">
          Thailand Student CTF Team
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">7</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">CTFs Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">8</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Team Members</div>
          </div>
        </div>

        {/* CTF Button */}
        <button className="px-8 py-3 border border-white/20 bg-white/5 hover:bg-white/10 transition-all rounded-sm text-sm tracking-wider">
          CAPTURE THE FLAG
        </button>
      </div>
    </main>
  )
}
