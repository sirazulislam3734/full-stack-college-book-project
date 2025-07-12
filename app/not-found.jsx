"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* 404 Illustration */}
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="404 Not Found"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              The page you're looking for seems to have wandered off to explore other colleges. Let's get you back on
              track!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Button>
            </Link>

            <Link href="/colleges">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <Search className="h-5 w-5 mr-2" />
                Browse Colleges
              </Button>
            </Link>

            <Button variant="ghost" size="lg" onClick={() => window.history.back()} className="w-full sm:w-auto">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 bg-white/50 rounded-lg backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Did you know?</h3>
            <p className="text-gray-600">
              The first college in America was Harvard University, founded in 1636. That's over 380 years of higher
              education excellence!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
