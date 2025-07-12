"use client"

import  React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Upload, User, Mail, Phone, MapPin, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

const colleges = [
  {
    id: 1,
    name: "Harvard University",
    image: "https://i.ibb.co/9yKKpQs/harvard.jpg",
  },
  {
    id: 2,
    name: "Stanford University",
    image: "https://i.ibb.co/QXvTMzp/stanford.jpg",
  },
  {
    id: 3,
    name: "MIT",
    image: "https://i.ibb.co/7XzQzKp/mit.jpg",
  },
  {
    id: 4,
    name: "Yale University",
    image: "https://i.ibb.co/k8YzQzK/yale.jpg",
  },
  {
    id: 5,
    name: "Princeton University",
    image: "https://i.ibb.co/2YzQzKp/princeton.jpg",
  },
  {
    id: 6,
    name: "Columbia University",
    image: "https://i.ibb.co/3YzQzKp/columbia.jpg",
  },
]

export default function AdmissionPage() {
  const [selectedCollege, setSelectedCollege] = useState("")
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    candidateEmail: "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
    image: null ,
  })
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const collegeIdParam = searchParams.get("college")

  useEffect(() => {
    // Redirect if unauthenticated
    if (status === "unauthenticated") {
      toast({
        title: "Login Required",
        description: "Please login to access the admission form.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Pre-select college (only if not already selected)
    if (collegeIdParam && collegeIdParam !== selectedCollege) {
      setSelectedCollege(collegeIdParam)
    }

    // Pre-fill user data (only if it has changed)
    if (session?.user) {
      setFormData((prev) => {
        const name = session.user.name || ""
        const email = session.user.email || ""
        if (prev.candidateName === name && prev.candidateEmail === email) {
          return prev
        }
        return { ...prev, candidateName: name, candidateEmail: email }
      })
    }
  }, [session, status, collegeIdParam, selectedCollege, toast, router])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedCollege) {
      toast({
        title: "College Required",
        description: "Please select a college to apply to.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store application data in localStorage (in real app, this would be sent to backend)
      const applicationData = {
        ...formData,
        collegeId: selectedCollege,
        collegeName: colleges.find((c) => c.id.toString() === selectedCollege)?.name,
        userId: session?.user?.email,
        applicationDate: new Date().toISOString(),
        status: "pending",
      }

      const existingApplications = JSON.parse(localStorage.getItem("applications") || "[]")
      existingApplications.push(applicationData)
      localStorage.setItem("applications", JSON.stringify(existingApplications))

      toast({
        title: "Application Submitted!",
        description: "Your college application has been submitted successfully.",
      })

      router.push("/my-college")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const selectedCollegeData = colleges.find((c) => c.id.toString() === selectedCollege)

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">College Admission</h1>
            <p className="text-gray-600">Apply to your dream college today</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* College Image Section */}
            <div className="space-y-6">
              {selectedCollegeData && (
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={selectedCollegeData.image || "/placeholder.svg"}
                      alt={selectedCollegeData.name}
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold">{selectedCollegeData.name}</h3>
                        <p className="text-blue-200">Your selected college</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Admission Process Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Admission Process</CardTitle>
                  <CardDescription>What happens after you submit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Application Review</p>
                      <p className="text-sm text-gray-600">Your application will be reviewed within 2-3 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Interview Process</p>
                      <p className="text-sm text-gray-600">Selected candidates will be called for an interview</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Final Decision</p>
                      <p className="text-sm text-gray-600">You'll receive the admission decision via email</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle>Admission Application Form</CardTitle>
                <CardDescription>Fill out all required information to complete your application</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* College Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="college">Select College *</Label>
                    <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((college) => (
                          <SelectItem key={college.id} value={college.id.toString()}>
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Candidate Name */}
                  <div className="space-y-2">
                    <Label htmlFor="candidateName">Candidate Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="candidateName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.candidateName}
                        onChange={(e) => handleInputChange("candidateName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject/Major *</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Enter your preferred subject/major"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="candidateEmail">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="candidateEmail"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.candidateEmail}
                        onChange={(e) => handleInputChange("candidateEmail", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="candidatePhone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="candidatePhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.candidatePhone}
                        onChange={(e) => handleInputChange("candidatePhone", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                      <Textarea
                        id="address"
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="pl-10 min-h-[80px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Profile Image</Label>
                    <div className="relative">
                      <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="pl-10" />
                    </div>
                    <p className="text-sm text-gray-500">Upload a recent passport-size photograph</p>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
