"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Calendar, MapPin, BookOpen, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function MyCollegePage() {
  const [applications, setApplications] = useState([])
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to view your college applications.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Load user's applications from localStorage
    const storedApplications = JSON.parse(localStorage.getItem("applications") || "[]")
    const userApplications = storedApplications.filter((app) => app.userId === user.id)
    setApplications(userApplications)
  }, [user, router, toast])

  const handleReviewSubmit = async (collegeId, collegeName) => {
    if (!reviewText.trim() || rating === 0) {
      toast({
        title: "Incomplete Review",
        description: "Please provide both rating and review text.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReview = {
        id: Date.now().toString(),
        name: user?.name || "Anonymous",
        college: collegeName,
        rating,
        comment: reviewText,
        avatar: user?.avatar || "/placeholder.svg?height=40&width=40",
        date: new Date().toISOString(),
      }

      // Store review in localStorage (in real app, this would be sent to backend)
      const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
      existingReviews.push(newReview)
      localStorage.setItem("reviews", JSON.stringify(existingReviews))

      toast({
        title: "Review Submitted!",
        description: "Your review has been added successfully.",
      })

      setReviewText("")
      setRating(0)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your review.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">My College Applications</h1>
            <p className="text-gray-600">Track your applications and add reviews</p>
          </div>

          {applications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-4">You haven't submitted any college applications yet.</p>
                <Button onClick={() => router.push("/admission")}>Apply Now</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {applications.map((application, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{application.collegeName}</CardTitle>
                          <CardDescription className="text-lg">Application for {application.subject}</CardDescription>
                        </div>
                        <Badge
                          variant={application.status === "approved" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {application.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Application Details */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg">Application Details</h4>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              Applied: {new Date(application.applicationDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm">
                              <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                              Subject: {application.subject}
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              Address: {application.address}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg">Contact Information</h4>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <strong>Email:</strong> {application.candidateEmail}
                            </p>
                            <p className="text-sm">
                              <strong>Phone:</strong> {application.candidatePhone}
                            </p>
                            <p className="text-sm">
                              <strong>DOB:</strong> {new Date(application.dateOfBirth).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* College Image */}
                      <div className="flex justify-center">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt={application.collegeName}
                          width={400}
                          height={200}
                          className="rounded-lg shadow-md"
                        />
                      </div>

                      {/* Review Section */}
                      <div className="border-t pt-6">
                        <h4 className="font-semibold text-lg mb-4 flex items-center">
                          <MessageSquare className="h-5 w-5 mr-2" />
                          Add a Review
                        </h4>

                        <div className="space-y-4">
                          {/* Rating */}
                          <div>
                            <Label className="text-sm font-medium">Rating</Label>
                            <div className="flex space-x-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  className={`h-8 w-8 ${
                                    star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  } hover:text-yellow-400 transition-colors`}
                                >
                                  <Star className="h-6 w-6" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Review Text */}
                          <div>
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea
                              id="review"
                              placeholder="Share your experience with this college..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              className="mt-1 min-h-[100px]"
                            />
                          </div>

                          <Button
                            onClick={() => handleReviewSubmit(application.collegeId, application.collegeName)}
                            disabled={loading || !reviewText.trim() || rating === 0}
                            className="w-full md:w-auto"
                          >
                            {loading ? "Submitting..." : "Submit Review"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
