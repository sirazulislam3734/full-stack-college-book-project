"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Star, Calendar, MapPin, Users, Trophy, BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

const collegeDetails = {
  1: {
    id: 1,
    name: "Harvard University",
    images: [
      "https://i.ibb.co/9yKKpQs/harvard.jpg",
      "https://i.ibb.co/QXvTMzp/stanford.jpg",
      "https://i.ibb.co/7XzQzKp/mit.jpg",
    ],
    rating: 4.9,
    location: "Cambridge, MA",
    admissionDate: "2024-03-15",
    description:
      "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, Harvard is the oldest institution of higher education in the United States and among the most prestigious in the world.",
    admissionProcess: [
      "Submit online application through Common Application",
      "Provide official transcripts from all schools attended",
      "Submit standardized test scores (SAT or ACT)",
      "Write personal essays and supplemental essays",
      "Obtain letters of recommendation",
      "Participate in alumni interview (if available)",
      "Submit application fee or fee waiver",
    ],
    events: [
      {
        name: "Harvard Science Fair",
        date: "2024-04-15",
        description: "Annual showcase of student research projects",
      },
      {
        name: "Cultural Festival",
        date: "2024-05-20",
        description: "Celebration of diversity and international cultures",
      },
      {
        name: "Commencement Ceremony",
        date: "2024-06-10",
        description: "Graduation ceremony for all degree programs",
      },
    ],
    research: [
      {
        title: "Medical Research",
        description: "Groundbreaking research in cancer treatment and genetic therapy",
      },
      {
        title: "AI and Machine Learning",
        description: "Advanced artificial intelligence and computational research",
      },
      {
        title: "Climate Science",
        description: "Environmental research and sustainability initiatives",
      },
    ],
    sports: [
      {
        category: "Team Sports",
        activities: ["Basketball", "Football", "Soccer", "Baseball", "Hockey"],
      },
      {
        category: "Individual Sports",
        activities: ["Tennis", "Swimming", "Track & Field", "Golf", "Wrestling"],
      },
      {
        category: "Water Sports",
        activities: ["Rowing", "Sailing", "Water Polo"],
      },
    ],
  },
  2: {
    id: 2,
    name: "Stanford University",
    images: [
      "https://i.ibb.co/QXvTMzp/stanford.jpg",
      "https://i.ibb.co/9yKKpQs/harvard.jpg",
      "https://i.ibb.co/7XzQzKp/mit.jpg",
    ],
    rating: 4.8,
    location: "Stanford, CA",
    admissionDate: "2024-04-01",
    description:
      "Stanford University is a private research university in Stanford, California. Known for its academic strength, wealth, and proximity to Silicon Valley, Stanford is one of the world's leading universities.",
    admissionProcess: [
      "Submit online application through Common Application",
      "Provide official transcripts from all schools attended",
      "Submit standardized test scores (SAT or ACT)",
      "Write personal essays and supplemental essays",
      "Obtain letters of recommendation",
      "Participate in alumni interview (if available)",
      "Submit application fee or fee waiver",
    ],
    events: [
      {
        name: "Tech Innovation Summit",
        date: "2024-04-20",
        description: "Annual technology and innovation conference",
      },
      {
        name: "Entrepreneurship Week",
        date: "2024-05-15",
        description: "Week-long celebration of startup culture",
      },
      {
        name: "Spring Festival",
        date: "2024-06-05",
        description: "Campus-wide celebration with music and food",
      },
    ],
    research: [
      {
        title: "Computer Science",
        description: "Cutting-edge research in algorithms and software engineering",
      },
      {
        title: "Engineering Excellence",
        description: "Innovation in mechanical and electrical engineering",
      },
      {
        title: "Biomedical Research",
        description: "Advanced medical technology and biotechnology research",
      },
    ],
    sports: [
      {
        category: "Team Sports",
        activities: ["Football", "Basketball", "Baseball", "Soccer", "Volleyball"],
      },
      {
        category: "Individual Sports",
        activities: ["Tennis", "Swimming", "Track & Field", "Golf", "Gymnastics"],
      },
      {
        category: "Water Sports",
        activities: ["Rowing", "Sailing", "Water Polo"],
      },
    ],
  },
  3: {
    id: 3,
    name: "MIT",
    images: [
      "https://i.ibb.co/7XzQzKp/mit.jpg",
      "https://i.ibb.co/9yKKpQs/harvard.jpg",
      "https://i.ibb.co/QXvTMzp/stanford.jpg",
    ],
    rating: 4.9,
    location: "Cambridge, MA",
    admissionDate: "2024-02-28",
    description:
      "The Massachusetts Institute of Technology (MIT) is a private research university in Cambridge, Massachusetts. MIT has played a key role in the development of modern technology and science.",
    admissionProcess: [
      "Submit online application through MIT Application",
      "Provide official transcripts from all schools attended",
      "Submit standardized test scores (SAT or ACT)",
      "Write personal essays and supplemental essays",
      "Obtain letters of recommendation",
      "Participate in alumni interview",
      "Submit application fee or fee waiver",
    ],
    events: [
      {
        name: "Robotics Competition",
        date: "2024-03-10",
        description: "Annual robotics competition and showcase",
      },
      {
        name: "Hackathon 2024",
        date: "2024-04-25",
        description: "48-hour coding competition and innovation challenge",
      },
      {
        name: "Science Expo",
        date: "2024-05-30",
        description: "Exhibition of student research and projects",
      },
    ],
    research: [
      {
        title: "Robotics",
        description: "Advanced robotics and automation research",
      },
      {
        title: "Quantum Computing",
        description: "Pioneering research in quantum technology",
      },
      {
        title: "Artificial Intelligence",
        description: "Machine learning and AI algorithm development",
      },
    ],
    sports: [
      {
        category: "Team Sports",
        activities: ["Basketball", "Soccer", "Baseball", "Hockey", "Lacrosse"],
      },
      {
        category: "Individual Sports",
        activities: ["Tennis", "Swimming", "Track & Field", "Fencing", "Wrestling"],
      },
      {
        category: "Water Sports",
        activities: ["Rowing", "Sailing", "Cross Country"],
      },
    ],
  },
}

export default function CollegeDetailPage() {
  const params = useParams()
  const collegeId = Number.parseInt(params.id)
  const college = collegeDetails[collegeId]
  const [selectedImage, setSelectedImage] = useState(0)
  const { user } = useAuth()
  const { toast } = useToast()

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">College Not Found</h1>
          <Link href="/colleges">
            <Button>Back to Colleges</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleApplyNow = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to apply for admission.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Application Started",
      description: "Redirecting to admission form...",
    })
    // Redirect to admission page with college pre-selected
    window.location.href = `/admission?college=${college.id}`
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/colleges">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Colleges
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={college.images[selectedImage] || "/placeholder.svg"}
                  alt={college.name}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {college.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${college.name} ${index + 1}`}
                      width={200}
                      height={120}
                      className="w-full h-24 object-cover hover:scale-105 transition-transform"
                      crossOrigin="anonymous"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* College Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{college.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-4 w-4 mr-1" />
                    {college.rating}
                  </Badge>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {college.location}
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{college.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold">Admission Date</p>
                        <p className="text-sm text-gray-600">{new Date(college.admissionDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold">Students</p>
                        <p className="text-sm text-gray-600">22,000+</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={handleApplyNow} size="lg" className="w-full">
                Apply Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="admission" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="admission">Admission</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
              </TabsList>

              <TabsContent value="admission" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admission Process</CardTitle>
                    <CardDescription>Follow these steps to apply for admission</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {college.admissionProcess.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {college.events.map((event, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="research" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {college.research.map((research, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                          {research.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{research.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sports" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {college.sports.map((sport, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                          {sport.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {sport.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="text-gray-600">
                              • {activity}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
