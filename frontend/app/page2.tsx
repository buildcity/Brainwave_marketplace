"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Wallet, Battery, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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
    <span className="text-base sm:text-xl md:text-2xl font-bold px-2 sm:px-4 py-1 sm:py-2 inline-block">BuildCity</span>
  </div>
)

const BatteryIndicator = ({ percentage = 75 }) => (
  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#444"
        strokeWidth="3"
      />
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeDasharray={`${percentage}, 100`}
      />
      <text x="18" y="20.35" className="text-xs fill-current" textAnchor="middle">
        {percentage}%
      </text>
    </svg>
  </div>
)

const MarketplaceItem = ({ title, description, price }) => (
  <Card className="bg-gray-800 text-white">
    <CardHeader>
      <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-400 text-sm sm:text-base">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-base sm:text-lg font-bold">{price} BRAIN</span>
        <Button variant="secondary" size="sm">
          Contribute
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default function Component() {
  const [isClient, setIsClient] = useState(false)
  const [deviceName, setDeviceName] = useState("Not Connected")
  const [batteryLevel, setBatteryLevel] = useState(0)

  useEffect(() => {
    setIsClient(true)
    // Simulating device connection
    setTimeout(() => {
      setDeviceName("Neurosity Crown")
      setBatteryLevel(75)
    }, 2000)
  }, [])

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ShiftingBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        <header className="z-10 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <BuildCityLogo />
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
        </header>

        <main className="flex-grow flex flex-col lg:flex-row z-10 mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/4">
            <Card className="bg-gray-800 text-white h-full">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Neurosity Device</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Connect Neurosity Device
                </Button>
                <div>
                  <p className="text-sm text-gray-400">Device Name:</p>
                  <p className="font-semibold">{deviceName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Battery:</p>
                  <BatteryIndicator percentage={batteryLevel} />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-3/4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Brainwave Marketplace</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MarketplaceItem 
                title="Focus Study" 
                description="Contribute your brainwave data during focused work sessions." 
                price="10"
              />
              <MarketplaceItem 
                title="Sleep Patterns" 
                description="Share your sleep data to help improve sleep research." 
                price="15"
              />
              <MarketplaceItem 
                title="Meditation Insights" 
                description="Provide brainwave data during meditation for mindfulness studies." 
                price="12"
              />
              <MarketplaceItem 
                title="Cognitive Games" 
                description="Play brain games and contribute your cognitive performance data." 
                price="8"
              />
              <MarketplaceItem 
                title="Stress Management" 
                description="Help researchers understand stress patterns and management techniques." 
                price="20"
              />
              <MarketplaceItem 
                title="Creative Flow" 
                description="Share brainwave data during creative activities for creativity research." 
                price="18"
              />
            </div>
          </div>
        </main>

        <footer className="z-10 py-4 text-center text-gray-500">
          © 2024 BuildCity Brain Wave Data Market
        </footer>
      </div>
    </div>
  )
}