"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Star, Calendar, BookOpen, Trophy, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

// Mock data
const colleges = [
  {
    id: 1,
    name: "Harvard University",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    admissionDate: "2024-03-15",
    events: ["Annual Science Fair", "Cultural Festival", "Sports Meet"],
    research: "Advanced AI Research, Medical Innovations",
    sports: ["Basketball", "Soccer", "Tennis", "Swimming"],
    location: "Cambridge, MA",
  },
  {
    id: 2,
    name: "Stanford University",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    admissionDate: "2024-04-01",
    events: ["Tech Innovation Summit", "Entrepreneurship Week"],
    research: "Computer Science, Engineering Excellence",
    sports: ["Football", "Baseball", "Track & Field"],
    location: "Stanford, CA",
  },
  {
    id: 3,
    name: "MIT",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    admissionDate: "2024-02-28",
    events: ["Robotics Competition", "Hackathon 2024"],
    research: "Robotics, Quantum Computing",
    sports: ["Rowing", "Sailing", "Cross Country"],
    location: "Cambridge, MA",
  },
]

const galleryImages = [
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
]

const researchPapers = [
  {
    title: "Artificial Intelligence in Modern Education",
    author: "Dr. Sarah Johnson",
    college: "Harvard University",
    link: "#",
  },
  {
    title: "Sustainable Energy Solutions for Campus",
    author: "Prof. Michael Chen",
    college: "Stanford University",
    link: "#",
  },
  {
    title: "Quantum Computing Applications",
    author: "Dr. Emily Rodriguez",
    college: "MIT",
    link: "#",
  },
]

const reviews = [
  {
    id: 1,
    name: "John Smith",
    college: "Harvard University",
    rating: 5,
    comment: "Excellent facilities and world-class education. The research opportunities are outstanding!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Emma Davis",
    college: "Stanford University",
    rating: 5,
    comment: "Amazing campus life and innovative programs. The entrepreneurship support is incredible.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Alex Johnson",
    college: "MIT",
    rating: 4,
    comment: "Challenging academics with great support system. Perfect for tech enthusiasts!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredColleges, setFilteredColleges] = useState(colleges)
  const { toast } = useToast()

  useEffect(() => {
    if (searchTerm) {
      const filtered = colleges.filter((college) => college.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredColleges(filtered)
    } else {
      setFilteredColleges(colleges)
    }
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredColleges.length === 0) {
      toast({
        title: "No Results",
        description: "No colleges found matching your search.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Search Results",
        description: `Found ${filteredColleges.length} college(s) matching "${searchTerm}"`,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Find Your Dream College
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover world-class education opportunities and book your future today
            </p>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="College Campus"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Featured Colleges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredColleges.map((college, index) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={college.image || "/placeholder.svg"}
                        alt={college.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          {college.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {college.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{college.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Admission: {new Date(college.admissionDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Research: {college.research}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Trophy className="h-4 w-4 mr-2" />
                        Sports: {college.sports.slice(0, 2).join(", ")}
                      </div>
                      <Link href={`/colleges/${college.id}`}>
                        <Button className="w-full group-hover:bg-blue-600 transition-colors">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Campus Life Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover hover:brightness-110 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Papers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Latest Research</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchPapers.map((paper, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{paper.title}</CardTitle>
                      <CardDescription>
                        by {paper.author} • {paper.college}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read Paper
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Student Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{review.name}</CardTitle>
                          <CardDescription>{review.college}</CardDescription>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
