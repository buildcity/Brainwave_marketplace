"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Wallet, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"

const ShiftingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-800 opacity-10 select-none"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 20 + Math.random() * 10, repeat: Infinity }}
        >
          {Math.floor(Math.random() * 2)}
        </motion.div>
      ))}
    </div>
  )
}

const BuildCityLogo = () => (
  <div className="relative inline-block">
    <div className="absolute inset-0 border-4 border-white"></div>
    <span className="text-xl sm:text-2xl font-bold px-2 sm:px-4 py-1 sm:py-2 inline-block">BuildCity</span>
  </div>
)

export default function Component() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ShiftingBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        <header className="z-10 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <BuildCityLogo />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="outline" 
              className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700 relative overflow-hidden group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Brain className="mr-2 h-4 w-4" />
                Connect Neurosity
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
            <Button 
              variant="outline" 
              className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700 relative overflow-hidden group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center z-10">
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to the Future of Brain Data</h2>
              <p className="text-lg sm:text-xl text-gray-400">Connect your Neurosity device and wallet to get started</p>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <Zap className="mr-2 h-6 w-6" />
              Enter Brainwave Marketplace
            </Button>
          </div>
        </main>

        <footer className="z-10 py-4 text-center text-gray-500">
          © 2024 BuildCity Brain Wave Data Market
        </footer>
      </div>
    </div>
  )
}