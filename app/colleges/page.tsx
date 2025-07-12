"use client"

import type React from "react"

import { useState } from "react"
import { Search, Star, Calendar, BookOpen, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const allColleges = [
  {
    id: 1,
    name: "Harvard University",
    image: "https://i.ibb.co/9yKKpQs/harvard.jpg",
    rating: 4.9,
    admissionDate: "2024-03-15",
    researchCount: 1250,
    location: "Cambridge, MA",
    description: "World-renowned institution with excellence in research and education.",
  },
  {
    id: 2,
    name: "Stanford University",
    image: "https://i.ibb.co/QXvTMzp/stanford.jpg",
    rating: 4.8,
    admissionDate: "2024-04-01",
    researchCount: 1100,
    location: "Stanford, CA",
    description: "Leading university in technology and innovation.",
  },
  {
    id: 3,
    name: "MIT",
    image: "https://i.ibb.co/7XzQzKp/mit.jpg",
    rating: 4.9,
    admissionDate: "2024-02-28",
    researchCount: 980,
    location: "Cambridge, MA",
    description: "Premier institution for science and technology.",
  },
  {
    id: 4,
    name: "Yale University",
    image: "https://i.ibb.co/k8YzQzK/yale.jpg",
    rating: 4.7,
    admissionDate: "2024-03-20",
    researchCount: 850,
    location: "New Haven, CT",
    description: "Historic university with strong liberal arts programs.",
  },
  {
    id: 5,
    name: "Princeton University",
    image: "https://i.ibb.co/2YzQzKp/princeton.jpg",
    rating: 4.8,
    admissionDate: "2024-04-10",
    researchCount: 720,
    location: "Princeton, NJ",
    description: "Elite institution known for undergraduate education.",
  },
  {
    id: 6,
    name: "Columbia University",
    image: "https://i.ibb.co/3YzQzKp/columbia.jpg",
    rating: 4.6,
    admissionDate: "2024-03-25",
    researchCount: 950,
    location: "New York, NY",
    description: "Ivy League university in the heart of Manhattan.",
  },
]

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredColleges, setFilteredColleges] = useState(allColleges)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = allColleges.filter(
      (college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredColleges(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">All Colleges</h1>
            <p className="text-xl text-blue-100">Explore our comprehensive list of partner institutions</p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
          >
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search colleges by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Colleges Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredColleges.length} of {allColleges.length} colleges
              </p>
            </div>

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
                  <Card className="h-full hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={college.image || "/placeholder.svg"}
                        alt={college.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        crossOrigin="anonymous"
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
                      <CardDescription className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {college.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{college.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Admission: {new Date(college.admissionDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {college.researchCount} Research Papers
                        </div>
                      </div>

                      <Link href={`/colleges/${college.id}`}>
                        <Button className="w-full group-hover:bg-blue-600 transition-colors">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-gray-500 text-lg">No colleges found matching your search.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setFilteredColleges(allColleges)
                  }}
                  className="mt-4"
                >
                  Show All Colleges
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
