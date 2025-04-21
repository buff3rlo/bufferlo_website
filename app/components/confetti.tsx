"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface ConfettiProps {
  active: boolean
}

interface Particle {
  x: number
  y: number
  size: number
  color: string
  rotation: number
  speed: number
  velocity: { x: number; y: number }
  rotationSpeed: number
  character: string
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  // Characters for the confetti (binary, hex, and special characters)
  const characters = [
    "0",
    "1",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "{",
    "}",
    "[",
    "]",
    "<",
    ">",
    "$",
    "#",
    "@",
    "%",
    "&",
    "*",
    "!",
    "?",
    ":",
    ";",
    "+",
    "-",
    "=",
    "/",
    "\\",
    "|",
  ]

  // Subtle color palette for confetti
  const colors = [
    "#ffffff", // White
    "#aaaaaa", // Light gray
    "#6a98d0", // Soft blue
    "#d06a98", // Soft pink
    "#6ad098", // Soft green
    "#d0986a", // Soft orange
    "#986ad0", // Soft purple
    "#d0d06a", // Soft yellow
  ]

  const createParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Only create new particles if we're below the threshold
    if (particlesRef.current.length < 100) {
      const newParticles: Particle[] = []
      const particleCount = 10 // Add fewer particles each time for a continuous stream

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 12 + 8
        newParticles.push({
          x: Math.random() * canvas.width,
          y: -20, // Start just above the viewport
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          speed: Math.random() * 3 + 1,
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: Math.random() * 3 + 1,
          },
          rotationSpeed: (Math.random() - 0.5) * 2,
          character: characters[Math.floor(Math.random() * characters.length)],
        })
      }

      particlesRef.current = [...particlesRef.current, ...newParticles]
    }
  }

  const animate = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Add new particles periodically for continuous effect
    createParticles()

    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.y += particle.velocity.y * particle.speed
      particle.x += particle.velocity.x
      particle.rotation += particle.rotationSpeed

      // Draw the character
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.rotation * Math.PI) / 180)
      ctx.font = `${particle.size}px monospace`
      ctx.fillStyle = particle.color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(particle.character, 0, 0)
      ctx.restore()

      // Remove particles that are off screen
      if (particle.y > canvas.height) {
        particlesRef.current.splice(index, 1)
      }
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (active) {
      // Initial particles
      createParticles()

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate)
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [active])

  return <canvas ref={canvasRef} className="fixed inset-0 z-20 pointer-events-none" />
}

export default Confetti
